'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Target, Users, Award, ArrowRight, Sparkles } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

const impactAreas = [
  {
    icon: Target,
    title: 'Court Improvements',
    description: 'Help us maintain and improve court surfaces, nets, and lines.',
    color: 'lime' as const,
  },
  {
    icon: Users,
    title: 'Youth Programs',
    description: 'Support introductory clinics and equipment for young players.',
    color: 'coral' as const,
  },
  {
    icon: Award,
    title: 'Tournaments',
    description: 'Fund prizes and supplies for community tournaments.',
    color: 'purple' as const,
  },
]

const colorMap = {
  lime: {
    bg: 'bg-lime/10',
    icon: 'bg-lime text-court-dark',
    ring: 'ring-lime/20',
  },
  coral: {
    bg: 'bg-coral/10',
    icon: 'bg-coral text-white',
    ring: 'ring-coral/20',
  },
  purple: {
    bg: 'bg-purple/10',
    icon: 'bg-purple text-white',
    ring: 'ring-purple/20',
  },
}

export default function DonatePage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <PageHero
        title="Support Our Club"
        subtitle="Help grow pickleball in the North Fork Valley"
        badge="Give Back"
        badgeIcon={Heart}
        accentColor="coral"
      />

      {/* Why Donate */}
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center" animateOnMount>
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-coral to-sunset
                rounded-3xl mb-8 shadow-lg ring-8 ring-coral/10"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Heart size={48} className="text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-dark mb-6">
              Why Your Support <span className="text-coral">Matters</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              North Fork Pickleball Club is a volunteer-run organization dedicated to
              growing the sport in our community. Your donations help us maintain courts,
              provide equipment, host events, and keep pickleball accessible to everyone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-30" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Where Your Donation Goes"
            subtitle="Every contribution makes a difference"
            badge="Your Impact"
            badgeIcon={Sparkles}
            badgeColor="coral"
            highlightWord="Donation"
            highlightColor="coral"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {impactAreas.map((area) => {
              const colors = colorMap[area.color]
              return (
                <motion.div
                  key={area.title}
                  variants={staggerItem}
                  className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-elevation-1
                    hover:shadow-elevation-2 transition-all text-center"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${colors.icon}
                      shadow-lg mb-6 ring-8 ${colors.ring}`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <area.icon size={36} />
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-charcoal-dark mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600">{area.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How to Donate */}
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="How to Donate"
              subtitle="Thank you for your generosity"
              badge="Support Us"
              badgeIcon={Heart}
              badgeColor="teal"
              highlightWord="Donate"
              highlightColor="teal"
            />

            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-coral via-teal to-lime rounded-3xl blur-sm opacity-20" />
                <div className="relative bg-white rounded-3xl p-10 shadow-elevation-2 border border-gray-100">
                  <p className="text-gray-600 mb-8 text-center">
                    We&apos;re currently setting up online donation capabilities. In the meantime,
                    you can support the club by:
                  </p>

                  <div className="space-y-4 mb-10">
                    {[
                      { num: 1, text: 'Contact us', detail: 'to arrange a check or cash donation', color: 'coral' },
                      { num: 2, text: 'Become a member', detail: '- membership dues directly support club activities', color: 'teal' },
                      { num: 3, text: 'Volunteer', detail: 'your time at events and open play sessions', color: 'lime' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.num}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={prefersReducedMotion ? {} : { x: 4 }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0
                          ${item.color === 'coral' ? 'bg-coral' : item.color === 'teal' ? 'bg-teal' : 'bg-lime text-court-dark'}`}>
                          {item.num}
                        </div>
                        <p className="text-gray-600 pt-2">
                          <strong className="text-charcoal-dark">{item.text}</strong> {item.detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral to-teal
                        text-white font-bold rounded-xl hover:shadow-glow-coral transition-shadow"
                    >
                      Contact Us
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/membership"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-court
                        text-court font-bold rounded-xl hover:bg-court hover:text-white transition-colors"
                    >
                      Become a Member
                    </Link>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center mt-8">
                North Fork Pickleball Club is a community organization.
                Donations may not be tax-deductible. Please consult with a tax professional.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
