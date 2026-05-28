'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'

interface EmailOptInFormProps {
  variant?: 'strip' | 'footer'
}

export default function EmailOptInForm({ variant = 'strip' }: EmailOptInFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to subscribe')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === 'footer') {
    return (
      <div>
        <h4 className="font-display font-semibold text-lg mb-3 flex items-center gap-2 text-white">
          <span className="w-8 h-0.5 bg-white rounded-full" />
          Join Our List!
        </h4>
        <p className="text-white/80 text-sm mb-4 leading-relaxed">
          We will keep you updated about local pickleball events, clinics, fundraisers and more.
        </p>

        {isSubmitted ? (
          <div className="flex items-center gap-2 text-lime">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">You&apos;re on the list!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-orange text-white font-semibold text-sm rounded-lg hover:bg-orange/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Join'}
              </button>
            </div>
            {error && <p className="text-red-300 text-xs">{error}</p>}
          </form>
        )}
      </div>
    )
  }

  // Strip variant for homepage
  return (
    <section className="bg-[#F38D09] relative overflow-hidden">
      <div className="absolute inset-0 dots-pattern opacity-10" />
      <div className="container-custom relative z-10 py-8 md:py-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Join Our List!
            </h2>
            <p className="text-white text-lg mb-6">
              We will keep you updated about local pickleball events, clinics, fundraisers and more.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 text-lime"
              >
                <CheckCircle size={24} />
                <span className="text-lg font-semibold">You&apos;re on the list! Thank you!</span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/80 border border-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-white focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/80 border border-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-white focus:bg-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/80 border border-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-white focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-white text-gray-600 font-bold text-lg rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? 'Joining...' : 'Join'}
                </button>
              </form>
            )}
            {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
