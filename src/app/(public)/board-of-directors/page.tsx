'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

const boardMembers = [
  {
    name: 'Board Member 1',
    role: 'President',
    bio: 'Board member bio coming soon.',
  },
  {
    name: 'Board Member 2',
    role: 'Vice President',
    bio: 'Board member bio coming soon.',
  },
  {
    name: 'Board Member 3',
    role: 'Secretary',
    bio: 'Board member bio coming soon.',
  },
  {
    name: 'Board Member 4',
    role: 'Treasurer',
    bio: 'Board member bio coming soon.',
  },
]

export default function BoardOfDirectorsPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Board Section */}
      <section className="section bg-cream relative overflow-hidden pt-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Board of Directors"
            subtitle="Meet the people leading our club"
            badge="Leadership"
            badgeIcon={Users}
            badgeColor="purple"
            highlightWord="Directors"
            highlightColor="purple"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {boardMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                className="text-center"
              >
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal to-purple flex items-center justify-center">
                    <Users size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-charcoal-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-court via-court-dark to-purple text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-background opacity-30" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-lime/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Want to Get <span className="text-lime">Involved?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              We&apos;re always looking for passionate community members to help grow pickleball in the North Fork Valley.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-court-dark
                  font-bold text-lg rounded-xl hover:shadow-glow-lime transition-shadow"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
