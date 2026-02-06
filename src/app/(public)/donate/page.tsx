'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, CreditCard, CheckCircle, DollarSign } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { donationSchema, type DonationFormData } from '@/lib/validations'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const presetAmounts = [10, 25, 50, 100]

export default function DonatePage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative pt-28 pb-[300px] overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/IMG_4965.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/10 border-white/30 text-white mb-6"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Help Us Build Courts!</span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Support Our{' '}
              <span className="text-orange">Club</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-white max-w-2xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Help grow pickleball in the North Fork Valley and get courts built in Hotchkiss! Your donations help us build courts, host events, and keep pickleball accessible to everyone.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
              fill="#FCF9F0"
            />
          </svg>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="pt-12 pb-24 bg-cream relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Make a Donation"
            subtitle="Every contribution helps our community thrive"
            badge="Donate Now"
            badgeIcon={Heart}
            badgeColor="orange"
            highlightWord="Donation"
            highlightColor="orange"
          />

          <DonationFormWrapper />
        </div>
      </section>
    </>
  )
}

function DonationFormWrapper() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [donationData, setDonationData] = useState<DonationFormData | null>(null)

  if (clientSecret && donationData) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm
          donationData={donationData}
          onBack={() => {
            setClientSecret(null)
            setDonationData(null)
          }}
        />
      </Elements>
    )
  }

  return (
    <DonationDetailsForm
      onSubmit={(data, secret) => {
        setDonationData(data)
        setClientSecret(secret)
      }}
    />
  )
}

interface DonationDetailsFormProps {
  onSubmit: (data: DonationFormData, clientSecret: string) => void
}

function DonationDetailsForm({ onSubmit }: DonationDetailsFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState<'one-time' | 'recurring'>('one-time')
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('monthly')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationType: 'one-time',
      amount: 0,
    },
  })

  const finalAmount = selectedAmount || parseFloat(customAmount) || 0

  // Keep react-hook-form in sync with our state
  const updateAmount = (amount: number) => {
    setValue('amount', amount, { shouldValidate: true })
  }

  const updateDonationType = (type: 'one-time' | 'recurring') => {
    setDonationType(type)
    setValue('donationType', type, { shouldValidate: true })
  }

  const onSubmitForm = async (data: DonationFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          frequency: donationType === 'recurring' ? frequency : undefined,
        }),
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || 'Failed to create donation')
      }

      const result = await res.json()
      onSubmit(data, result.clientSecret)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process donation')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollReveal>
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange via-teal to-lime rounded-3xl blur-sm opacity-20" />
          <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-elevation-2">
            {error && (
              <motion.div
                className="bg-orange/10 text-orange p-4 rounded-xl text-sm mb-6 border border-orange/20"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
              {/* Donation Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-charcoal-dark mb-3">
                  Donation Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => updateDonationType('one-time')}
                    className={`p-4 rounded-xl border-2 font-medium transition-all
                      ${donationType === 'one-time'
                        ? 'border-orange bg-orange/10 text-orange'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => updateDonationType('recurring')}
                    className={`p-4 rounded-xl border-2 font-medium transition-all
                      ${donationType === 'recurring'
                        ? 'border-teal bg-teal/10 text-teal'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    Recurring
                  </button>
                </div>
              </div>

              {/* Frequency Selection (for recurring) */}
              {donationType === 'recurring' && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-sm font-medium text-charcoal-dark mb-3">
                    Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`p-3 rounded-xl border-2 font-medium transition-all
                        ${frequency === 'monthly'
                          ? 'border-teal bg-teal/10 text-teal'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('yearly')}
                      className={`p-3 rounded-xl border-2 font-medium transition-all
                        ${frequency === 'yearly'
                          ? 'border-teal bg-teal/10 text-teal'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      Yearly
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Preset Amounts */}
              <div>
                <label className="block text-sm font-medium text-charcoal-dark mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt)
                        setCustomAmount('')
                        updateAmount(amt)
                      }}
                      className={`p-4 rounded-xl border-2 font-bold transition-all
                        ${selectedAmount === amt
                          ? 'border-lime bg-lime/10 text-lime-700'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-medium text-charcoal-dark mb-2">
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                      updateAmount(parseFloat(e.target.value) || 0)
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                      focus:border-lime focus:ring-2 focus:ring-lime/20 focus:bg-white
                      transition-all outline-none"
                    placeholder="Enter amount"
                  />
                </div>
                {errors.amount && (
                  <p className="text-orange text-sm mt-1">{errors.amount.message}</p>
                )}
              </div>

              {/* Donor Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-display font-bold text-charcoal-dark mb-4">
                  Your Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('donorName')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                        focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                        transition-all outline-none"
                      placeholder="John Doe"
                    />
                    {errors.donorName && (
                      <p className="text-orange text-sm mt-1">{errors.donorName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('donorEmail')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                        focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                        transition-all outline-none"
                      placeholder="john@example.com"
                    />
                    {errors.donorEmail && (
                      <p className="text-orange text-sm mt-1">{errors.donorEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      {...register('donorPhone')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                        focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                        transition-all outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Message/Note (Optional)
                    </label>
                    <textarea
                      {...register('donorMessage')}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                        focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                        transition-all outline-none resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Address (Optional)
                    </label>
                    <input
                      {...register('donorAddress')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                        focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                        transition-all outline-none"
                      placeholder="123 Main St, City, State ZIP"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || finalAmount < 1}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4
                  bg-gradient-to-r from-orange to-teal text-white font-bold text-lg rounded-xl
                  hover:shadow-glow-orange transition-shadow disabled:opacity-50"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <CreditCard size={20} />
                    Continue to Payment - ${finalAmount.toFixed(2)}
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              Secure payment processing powered by Stripe. Your payment information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

interface StripePaymentFormProps {
  donationData: DonationFormData
  onBack: () => void
}

function StripePaymentForm({ donationData, onBack }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError('')

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate?success=true`,
      },
      redirect: 'if_required',
    })

    if (submitError) {
      setError(submitError.message || 'Payment failed')
      setIsProcessing(false)
    } else {
      setIsComplete(true)
    }
  }

  if (isComplete) {
    return (
      <ScrollReveal>
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white rounded-3xl p-10 text-center shadow-elevation-2"
            initial={prefersReducedMotion ? {} : { scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div
              className="w-24 h-24 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-6"
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              <CheckCircle size={48} className="text-lime-600" />
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-charcoal-dark mb-3">
              Thank You for Your Donation!
            </h2>
            <p className="text-gray-600 mb-2">
              Your generous support means the world to us.
            </p>
            <p className="text-gray-600 mb-8">
              A receipt has been sent to {donationData.donorEmail}.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                bg-gradient-to-r from-orange to-teal text-white font-medium
                hover:shadow-glow-orange transition-shadow"
            >
              Return Home
            </button>
          </motion.div>
        </div>
      </ScrollReveal>
    )
  }

  return (
    <ScrollReveal>
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange via-teal to-lime rounded-3xl blur-sm opacity-20" />
          <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-elevation-2">
            <button
              onClick={onBack}
              className="text-sm text-gray-600 hover:text-gray-800 mb-6"
            >
              ← Back to donation details
            </button>

            <h2 className="text-2xl font-display font-bold text-charcoal-dark mb-6">
              Complete Your Donation
            </h2>

            {error && (
              <motion.div
                className="bg-orange/10 text-orange p-4 rounded-xl text-sm mb-6 border border-orange/20"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <PaymentElement />

              <motion.button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4
                  bg-gradient-to-r from-orange to-teal text-white font-bold text-lg rounded-xl
                  hover:shadow-glow-orange transition-shadow disabled:opacity-50"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {isProcessing ? 'Processing...' : `Donate $${donationData.amount.toFixed(2)}`}
              </motion.button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              Secure payment processing powered by Stripe.
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
