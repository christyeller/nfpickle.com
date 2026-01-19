'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, Target, Heart, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'Building connections through the shared love of pickleball.',
    color: 'lime' as const,
  },
  {
    icon: Heart,
    title: 'Inclusivity',
    description: 'Welcoming players of all ages, abilities, and backgrounds.',
    color: 'coral' as const,
  },
  {
    icon: Target,
    title: 'Growth',
    description: 'Helping every player improve their game and enjoy the sport.',
    color: 'teal' as const,
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
  teal: {
    bg: 'bg-teal/10',
    icon: 'bg-teal text-white',
    ring: 'ring-teal/20',
  },
}

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Mission Section */}
      <section className="section bg-cream relative overflow-hidden pt-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="About Us"
              subtitle="The North Fork Pickleball Club"
              badge="Who We Are"
              badgeIcon={Heart}
              badgeColor="teal"
              highlightWord="Us"
              highlightColor="teal"
            />

            <motion.div
              className="prose prose-lg max-w-none"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <ScrollReveal delay={0.1}>
                  <p>
                    The North Fork Pickleball Club (NFPC) exists to provide a fun, healthy,
                    recreational activity for our rural North Fork Community while promoting
                    exercise, development of skills and camaraderie through the enjoyment of pickleball.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p>
                    Whether you&apos;re picking up a paddle for the first time or you&apos;re a
                    seasoned tournament player, you&apos;ll find a welcoming community here.
                    We organize regular open play sessions, host tournaments and clinics, and work
                    with local officials to improve and expand court facilities.
                  </p>
                </ScrollReveal>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-30" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Our Values"
            subtitle="What guides everything we do"
            badge="What We Believe"
            badgeIcon={Heart}
            badgeColor="coral"
            highlightWord="Values"
            highlightColor="coral"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {values.map((value) => {
              const colors = colorMap[value.color]
              return (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="text-center"
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${colors.icon}
                      shadow-lg mb-6 ring-8 ${colors.ring}`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <value.icon size={36} />
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-charcoal-dark mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
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
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-coral/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Join Our <span className="text-lime">Community</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you&apos;re new to pickleball or an experienced player, we&apos;d love
              to have you join us on the courts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-court-dark
                  font-bold text-lg rounded-xl hover:shadow-glow-lime transition-shadow"
              >
                Become a Member
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 glass-dark text-white
                  font-bold text-lg rounded-xl hover:bg-white/20 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
