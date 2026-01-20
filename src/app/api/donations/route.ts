import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { donationSchema } from '@/lib/validations'
import {
  stripe,
  createPaymentIntent,
  createOrGetCustomer,
  getOrCreatePrice,
  createSubscription
} from '@/lib/stripe'
import { randomUUID } from 'crypto'

/**
 * GET /api/donations
 * Admin-only: Fetch all donations
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ donations })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/donations
 * Public: Create donation and initiate Stripe payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = donationSchema.parse(body)

    // Validate frequency for recurring donations
    if (validatedData.donationType === 'recurring' && !validatedData.frequency) {
      return NextResponse.json(
        { error: 'Frequency is required for recurring donations' },
        { status: 400 }
      )
    }

    let clientSecret: string
    let stripePaymentIntentId: string | null = null
    let stripeSubscriptionId: string | null = null
    let stripeCustomerId: string | null = null

    if (validatedData.donationType === 'one-time') {
      // Create Payment Intent for one-time donation
      const paymentIntent = await createPaymentIntent(
        validatedData.amount,
        {
          donorName: validatedData.donorName,
          donorEmail: validatedData.donorEmail,
          donationType: 'one-time',
        }
      )

      clientSecret = paymentIntent.client_secret!
      stripePaymentIntentId = paymentIntent.id
    } else {
      // Create Subscription for recurring donation
      const customer = await createOrGetCustomer(
        validatedData.donorEmail,
        validatedData.donorName,
        { donationType: 'recurring' }
      )

      const priceId = await getOrCreatePrice(
        validatedData.amount,
        validatedData.frequency!
      )

      const subscription = await createSubscription(
        customer.id,
        priceId,
        {
          donorName: validatedData.donorName,
          donorEmail: validatedData.donorEmail,
          frequency: validatedData.frequency!,
        }
      )

      stripeCustomerId = customer.id
      stripeSubscriptionId = subscription.id

      // Extract client secret from subscription's latest invoice
      const latestInvoice = subscription.latest_invoice as any
      clientSecret = latestInvoice.payment_intent.client_secret
      stripePaymentIntentId = latestInvoice.payment_intent.id
    }

    // Create donation record in database
    const donation = await prisma.donation.create({
      data: {
        id: randomUUID(),
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
        donorPhone: validatedData.donorPhone || null,
        donorMessage: validatedData.donorMessage || null,
        donorAddress: validatedData.donorAddress || null,
        amount: validatedData.amount,
        donationType: validatedData.donationType,
        frequency: validatedData.frequency || null,
        stripePaymentIntentId,
        stripeSubscriptionId,
        stripeCustomerId,
        status: 'pending',
        paymentStatus: 'incomplete',
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      {
        donation,
        clientSecret,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating donation:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/donations?id=xxx
 * Admin-only: Delete a donation
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    // Optionally cancel Stripe subscription if active
    const donation = await prisma.donation.findUnique({ where: { id } })

    if (donation?.stripeSubscriptionId && donation.status !== 'cancelled') {
      try {
        await stripe.subscriptions.cancel(donation.stripeSubscriptionId)
      } catch (error) {
        console.error('Error cancelling Stripe subscription:', error)
      }
    }

    await prisma.donation.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting donation:', error)
    return NextResponse.json(
      { error: 'Failed to delete donation' },
      { status: 500 }
    )
  }
}
