'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useReducedMotion } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { MapPin, Mail, Send, CheckCircle, MessageCircle, Clock } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have questions? We'd love to hear from you."
        badge="Get in Touch"
        badgeIcon={MessageCircle}
        accentColor="coral"
      />

      {/* Contact Form & Info */}
      <section className="section bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto"
          >
            {/* Contact Info */}
            <motion.div variants={staggerItem}>
              <h2 className="text-2xl font-display font-bold text-charcoal-dark mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you have questions about open play, membership, or just want to learn
                more about pickleball in the North Fork Valley, we&apos;re here to help.
              </p>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-2xl bg-teal/5 border border-teal/20"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <div className="p-3 rounded-xl bg-teal text-white shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-charcoal-dark">Location</h3>
                    <p className="text-gray-600">
                      Paonia Town Park<br />
                      214 Grand Ave<br />
                      Paonia, CO 81428
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 rounded-2xl bg-coral/5 border border-coral/20"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <div className="p-3 rounded-xl bg-coral text-white shadow-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-charcoal-dark">Email</h3>
                    <a
                      href="mailto:info@northforkpickleball.com"
                      className="text-coral hover:text-coral/80 transition-colors"
                    >
                      info@northforkpickleball.com
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-lime/5 border border-lime/20"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Clock size={20} className="text-lime-700 mt-0.5" />
                  <h3 className="font-display font-semibold text-charcoal-dark">Open Play</h3>
                </div>
                <p className="text-gray-600">
                  The best way to get involved is to show up at one of our open play sessions!
                  Check our schedule and come play - no RSVP needed.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={staggerItem}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-coral via-teal to-lime rounded-3xl blur-sm opacity-30" />
                <div className="relative bg-white rounded-2xl p-8 shadow-elevation-2 border border-gray-100">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-6"
                        initial={prefersReducedMotion ? {} : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                      >
                        <CheckCircle size={40} className="text-lime-600" />
                      </motion.div>
                      <h3 className="text-xl font-display font-bold text-charcoal-dark mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for reaching out. We&apos;ll get back to you soon.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-court
                          text-court font-medium hover:bg-court hover:text-white transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-display font-bold text-charcoal-dark mb-6">
                        Send a Message
                      </h2>

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
                        <div>
                          <label className="block text-sm font-medium text-charcoal-dark mb-2">
                            Name *
                          </label>
                          <input
                            {...register('name')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                              focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                              transition-all outline-none"
                            placeholder="Your name"
                          />
                          {errors.name && (
                            <p className="text-coral text-sm mt-1">{errors.name.message}</p>
                          )}
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
                            placeholder="your@email.com"
                          />
                          {errors.email && (
                            <p className="text-coral text-sm mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-charcoal-dark mb-2">
                            Subject
                          </label>
                          <input
                            {...register('subject')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                              focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                              transition-all outline-none"
                            placeholder="What's this about?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-charcoal-dark mb-2">
                            Message *
                          </label>
                          <textarea
                            {...register('message')}
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                              focus:border-teal focus:ring-2 focus:ring-teal/20 focus:bg-white
                              transition-all outline-none resize-none"
                            placeholder="Your message..."
                          />
                          {errors.message && (
                            <p className="text-coral text-sm mt-1">{errors.message.message}</p>
                          )}
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4
                            bg-gradient-to-r from-coral to-teal text-white font-bold text-lg rounded-xl
                            hover:shadow-glow-coral transition-shadow disabled:opacity-50"
                          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            'Sending...'
                          ) : (
                            <>
                              <Send size={20} />
                              Send Message
                            </>
                          )}
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
