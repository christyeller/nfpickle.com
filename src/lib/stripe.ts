import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

/**
 * Create a Payment Intent for one-time donations
 */
export async function createPaymentIntent(
  amount: number,
  metadata: Record<string, string>
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  })
}

/**
 * Create a Subscription for recurring donations
 */
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata: Record<string, string>
): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata,
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })
}

/**
 * Create or retrieve a Stripe Customer
 */
export async function createOrGetCustomer(
  email: string,
  name: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Customer> {
  // Check if customer exists
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0]
  }

  // Create new customer
  return await stripe.customers.create({
    email,
    name,
    metadata,
  })
}

/**
 * Create a recurring price (call once per frequency/amount combo)
 */
export async function getOrCreatePrice(
  amount: number,
  frequency: 'monthly' | 'yearly'
): Promise<string> {
  const interval = frequency === 'monthly' ? 'month' : 'year'
  const amountInCents = Math.round(amount * 100)

  // In production, you'd cache these price IDs
  // For now, we'll create them on-demand
  const price = await stripe.prices.create({
    unit_amount: amountInCents,
    currency: 'usd',
    recurring: { interval },
    product_data: {
      name: `${frequency === 'monthly' ? 'Monthly' : 'Yearly'} Donation - $${amount}`,
    },
  })

  return price.id
}
