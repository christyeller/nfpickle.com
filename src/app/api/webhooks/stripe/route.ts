import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

// Email configuration
const ADMIN_EMAILS = (process.env.CONTACT_EMAIL || 'northforkpickleball@gmail.com')
  .split(',')
  .map(email => email.trim())
  .filter(email => email.length > 0)

// Escape HTML entities for safe display in emails
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char])
}

// Send email notification using Resend
async function sendDonationEmails(donation: {
  donorName: string
  donorEmail: string
  amount: number
  donationType: string
  frequency?: string | null
  donorMessage?: string | null
  receiptUrl?: string | null
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping email notifications')
    return
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'North Fork Pickleball <onboarding@resend.dev>'

    // Amount is stored in dollars, not cents
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(donation.amount)

    const donationTypeText = donation.donationType === 'recurring'
      ? `Recurring (${donation.frequency})`
      : 'One-time'

    // Send admin notification
    await resend.emails.send({
      from: fromEmail,
      to: ADMIN_EMAILS,
      subject: `New Donation: ${formattedAmount} from ${donation.donorName}`,
      html: `
        <h2>New Donation Received!</h2>
        <p><strong>Donor:</strong> ${escapeHtml(donation.donorName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(donation.donorEmail)}</p>
        <p><strong>Amount:</strong> ${formattedAmount}</p>
        <p><strong>Type:</strong> ${donationTypeText}</p>
        ${donation.donorMessage ? `<p><strong>Message:</strong> ${escapeHtml(donation.donorMessage)}</p>` : ''}
        ${donation.receiptUrl ? `<p><a href="${donation.receiptUrl}">View Stripe Receipt</a></p>` : ''}
        <hr>
        <p><small>View all donations in the <a href="https://nfpickle.com/admin/donations">admin dashboard</a>.</small></p>
      `,
    })

    // Send donor thank-you email
    await resend.emails.send({
      from: fromEmail,
      to: donation.donorEmail,
      subject: 'Thank You for Your Donation to North Fork Pickleball!',
      html: `
        <p style="text-align: center; margin-bottom: 24px;">
          <img src="https://media.nfpickle.com/site-assets/newlogo-tp.png"
               alt="North Fork Pickleball Club"
               width="200"
               style="width: 200px; max-width: 100%; height: auto; display: inline-block;">
        </p>
        <h2>Thank You, ${escapeHtml(donation.donorName)}!</h2>
        <p>Your generous donation of <strong>${formattedAmount}</strong> has been received by the North Fork Pickleball Club and is greatly appreciated. Your support means so much to us and to our current and future community of pickleball and tennis players!</p>
        <p>In partnership with Delta County, the North Fork Pool, Park and Recreation District, and with the potential for future collaboration with the Delta County School District, we are creating an exciting new recreational complex at the Delta County Fairgrounds consisting of 8 dedicated pickleball courts and 4 dedicated tennis courts. Your support will help bring this project to fruition for players from Crawford, Hotchkiss, Paonia, and throughout the North Fork Valley, as well as for the students on the North Fork High School Tennis Team.</p>
        <p>Together, we will create opportunities for healthy living, strengthen community connections, and provide recreation for all ages&mdash;giving residents a quality place to play close to home. The North Fork Pickleball and Tennis Complex will be a lasting recreational asset that will benefit the North Fork Valley for generations to come.</p>
        <p>Thank you again for your generosity and for helping us make this vision a reality!</p>
        ${donation.donationType === 'recurring' ? `<p>This is a <strong>${donation.frequency}</strong> recurring donation. You can manage your subscription at any time.</p>` : ''}
        ${donation.receiptUrl ? `<p><a href="${donation.receiptUrl}">View your receipt</a></p>` : ''}
        <p>With gratitude,<br><strong>NORTH FORK PICKLEBALL CLUB</strong></p>
        <p>
          <small>
            PO Box 215, Crawford, CO 81415<br>
            <a href="https://nfpickle.com">www.nfpickle.com</a><br>
            970.261.5864
          </small>
        </p>
        <hr>
        <p style="font-size: 14px; color: #666; margin-top: 20px;">
          The North Fork Pickleball Club is a 501(c)(3) tax-exempt organization with public charity status.
          All contributions are fully tax-deductible.<br>
          <strong>EIN: 39-3292058</strong>
        </p>
      `,
    })

    console.log('Donation emails sent successfully')
  } catch (error) {
    console.error('Failed to send donation emails:', error)
  }
}

/**
 * POST /api/webhooks/stripe
 * Stripe webhook handler for payment events
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      // One-time payment succeeded
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentIntentSucceeded(paymentIntent)
        break
      }

      // One-time payment failed
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentIntentFailed(paymentIntent)
        break
      }

      // Subscription payment succeeded
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      // Subscription payment failed
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      // Subscription cancelled
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Accessing receipt_url via any cast since charges/latest_charge typing varies by version
  const receiptUrl = (paymentIntent as any).latest_charge?.receipt_url ||
                    (paymentIntent as any).charges?.data?.[0]?.receipt_url ||
                    null;

  // Update donation status
  await prisma.donation.updateMany({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: {
      status: 'completed',
      paymentStatus: 'succeeded',
      lastPaymentDate: new Date(),
      receiptUrl,
    },
  })

  // Fetch donation details for email
  const donation = await prisma.donation.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id },
  })

  if (donation) {
    await sendDonationEmails({
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      amount: donation.amount,
      donationType: donation.donationType,
      frequency: donation.frequency,
      donorMessage: donation.donorMessage,
      receiptUrl,
    })
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  await prisma.donation.updateMany({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: {
      status: 'failed',
      paymentStatus: 'failed',
    },
  })
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription as string
  if (!subscriptionId) return

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const receiptUrl = invoice.hosted_invoice_url || null

  await prisma.donation.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'completed',
      paymentStatus: 'succeeded',
      lastPaymentDate: new Date(invoice.status_transitions.paid_at! * 1000),
      nextPaymentDate: (subscription as any).current_period_end
        ? new Date((subscription as any).current_period_end * 1000)
        : null,
      receiptUrl,
    },
  })

  // Fetch donation details for email (only send on first payment to avoid spam)
  const donation = await prisma.donation.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  })

  // Check if this is the first payment (billing_reason = 'subscription_create')
  const isFirstPayment = (invoice as any).billing_reason === 'subscription_create'

  if (donation && isFirstPayment) {
    await sendDonationEmails({
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      amount: donation.amount,
      donationType: donation.donationType,
      frequency: donation.frequency,
      donorMessage: donation.donorMessage,
      receiptUrl,
    })
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription as string
  if (!subscriptionId) return

  await prisma.donation.updateMany({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      paymentStatus: 'failed',
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.donation.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'cancelled',
    },
  })
}
