'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useReducedMotion } from 'framer-motion'
import { memberSchema, type MemberFormData } from '@/lib/validations'
import { Check, CheckCircle, Star, Zap, Award, Crown } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

const tiers = [
  {
    id: 'free',
    name: 'Community',
    price: 'Free',
    description: 'Stay connected with the club',
    features: [
      'Newsletter updates',
      'Event notifications',
      'Open play information',
      'Community access',
    ],
    popular: false,
    color: 'lime' as const,
    icon: Zap,
  },
  {
    id: 'annual',
    name: 'Annual Member',
    price: '$25',
    period: '/year',
    description: 'Full member benefits',
    features: [
      'All Community benefits',
      'Voting rights',
      'Member discounts on clinics',
      'Priority event registration',
      'Member directory access',
    ],
    popular: true,
    color: 'teal' as const,
    icon: Award,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$200',
    description: 'Never pay again',
    features: [
      'All Annual benefits',
      'One-time payment',
      'Founding member status',
      'Special recognition',
      'Lifetime access',
    ],
    popular: false,
    color: 'purple' as const,
    icon: Crown,
  },
]

const colorMap = {
  lime: {
    bg: 'bg-lime/10',
    border: 'border-lime/30',
    selectedBorder: 'ring-2 ring-lime',
    icon: 'bg-lime text-court-dark',
    check: 'text-lime-600',
    button: 'bg-lime text-court-dark hover:shadow-glow-lime',
    buttonOutline: 'border-2 border-court text-court hover:bg-court hover:text-white',
  },
  teal: {
    bg: 'bg-teal/10',
    border: 'border-teal/30',
    selectedBorder: 'ring-2 ring-teal',
    icon: 'bg-teal text-white',
    check: 'text-teal',
    button: 'bg-teal text-white hover:shadow-glow-teal',
    buttonOutline: 'border-2 border-teal text-teal hover:bg-teal hover:text-white',
  },
  purple: {
    bg: 'bg-purple/10',
    border: 'border-purple/30',
    selectedBorder: 'ring-2 ring-purple',
    icon: 'bg-purple text-white',
    check: 'text-purple',
    button: 'bg-purple text-white hover:shadow-glow-purple',
    buttonOutline: 'border-2 border-purple text-purple hover:bg-purple hover:text-white',
  },
}

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  })

  const onSubmit = async (data: MemberFormData) => {
    if (!selectedTier) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          membershipTier: selectedTier,
        }),
      })

      if (res.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        const result = await res.json()
        setError(result.error || 'Failed to submit. Please try again.')
      }
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        title="Membership"
        subtitle="Join the North Fork Pickleball community"
        badge="Join Us"
        badgeIcon={Award}
        accentColor="lime"
      />

      {/* Pricing Tiers */}
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-lime/5 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Choose Your Membership"
            subtitle="Select the option that's right for you"
            badge="Membership Tiers"
            badgeIcon={Star}
            badgeColor="lime"
            highlightWord="Membership"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {tiers.map((tier) => {
              const colors = colorMap[tier.color]
              const isSelected = selectedTier === tier.id
              const TierIcon = tier.icon

              return (
                <motion.div
                  key={tier.id}
                  variants={staggerItem}
                  className={`relative cursor-pointer transition-all duration-300
                    ${tier.popular ? 'z-10' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.popular && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-lime via-teal to-purple rounded-[28px] blur-sm opacity-70" />
                  )}

                  <motion.div
                    className={`relative h-full p-8 rounded-3xl bg-white border transition-all
                      ${isSelected ? colors.selectedBorder : 'border-gray-200'}
                      ${tier.popular ? 'shadow-elevation-3' : 'shadow-elevation-1 hover:shadow-elevation-2'}`}
                    whileHover={prefersReducedMotion ? {} : { y: tier.popular ? -8 : -4 }}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1.5 bg-lime text-court-dark text-sm font-bold rounded-full shadow-lg
                          flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <motion.div
                      className={`w-14 h-14 rounded-2xl ${colors.icon} flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={prefersReducedMotion ? {} : { rotate: 5, scale: 1.1 }}
                    >
                      <TierIcon size={28} />
                    </motion.div>

                    <h3 className="text-2xl font-display font-bold text-charcoal-dark mb-2">
                      {tier.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-display font-bold">{tier.price}</span>
                      {tier.period && (
                        <span className="text-gray-500">{tier.period}</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-6">{tier.description}</p>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-3"
                          initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className={`w-5 h-5 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className={`w-3 h-3 ${colors.check}`} />
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-4 rounded-xl font-bold transition-all
                        ${isSelected ? colors.button : colors.buttonOutline}`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto">
            {isSubmitted ? (
              <ScrollReveal>
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
                    Welcome to the Club!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for joining North Fork Pickleball. We&apos;ll be in touch soon with
                    more information about upcoming events and open play sessions.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setSelectedTier(null)
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-court
                      text-court font-medium hover:bg-court hover:text-white transition-colors"
                  >
                    Register Another Member
                  </button>
                </motion.div>
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-lime via-teal to-purple rounded-[28px] blur-sm opacity-20" />
                  <div className="relative bg-white rounded-3xl p-10 shadow-elevation-2">
                    <h2 className="text-2xl font-display font-bold text-charcoal-dark mb-6">
                      {selectedTier
                        ? `Join as ${tiers.find((t) => t.id === selectedTier)?.name}`
                        : 'Select a membership above'}
                    </h2>

                    {selectedTier ? (
                      <>
                        {error && (
                          <motion.div
                            className="bg-coral/10 text-coral p-4 rounded-xl text-sm mb-6 border border-coral/20"
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {error}
                          </motion.div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                                First Name *
                              </label>
                              <input
                                {...register('firstName')}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                                  focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                                  transition-all outline-none"
                              />
                              {errors.firstName && (
                                <p className="text-coral text-sm mt-1">{errors.firstName.message}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                                Last Name *
                              </label>
                              <input
                                {...register('lastName')}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                                  focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                                  transition-all outline-none"
                              />
                              {errors.lastName && (
                                <p className="text-coral text-sm mt-1">{errors.lastName.message}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-charcoal-dark mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              {...register('email')}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                                focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                                transition-all outline-none"
                            />
                            {errors.email && (
                              <p className="text-coral text-sm mt-1">{errors.email.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-charcoal-dark mb-2">
                              Phone
                            </label>
                            <input
                              type="tel"
                              {...register('phone')}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                                focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                                transition-all outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-charcoal-dark mb-2">
                              Skill Level
                            </label>
                            <select
                              {...register('skillLevel')}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                                focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                                transition-all outline-none"
                            >
                              <option value="">Select your level (optional)</option>
                              <option value="beginner">Beginner (2.0-2.5)</option>
                              <option value="intermediate">Intermediate (3.0-3.5)</option>
                              <option value="advanced">Advanced (4.0+)</option>
                            </select>
                          </div>

                          {selectedTier !== 'free' && (
                            <motion.div
                              className="bg-sunset/10 p-4 rounded-xl border border-sunset/20"
                              initial={prefersReducedMotion ? {} : { opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <p className="text-sm text-sunset-dark">
                                <strong>Note:</strong> Payment processing will be handled separately.
                                We&apos;ll contact you with payment instructions after you submit this form.
                              </p>
                            </motion.div>
                          )}

                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4
                              bg-gradient-to-r from-lime to-teal text-court-dark font-bold text-lg rounded-xl
                              hover:shadow-glow-lime transition-shadow disabled:opacity-50"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                          >
                            {isSubmitting ? 'Submitting...' : 'Join Now'}
                          </motion.button>
                        </form>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <motion.div
                          className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4"
                          animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Award size={32} className="text-gray-400" />
                        </motion.div>
                        <p className="text-gray-500">
                          Please select a membership tier above to continue.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
