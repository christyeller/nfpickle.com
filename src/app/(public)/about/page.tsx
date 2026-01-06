'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, Target, Heart, MapPin, Zap, ArrowRight } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
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
      <PageHero
        title="About Us"
        subtitle="The story of pickleball in the North Fork Valley"
        badge="Our Story"
        badgeIcon={Heart}
        accentColor="teal"
      />

      {/* Story Section */}
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Our Story"
              subtitle="How pickleball came to the North Fork Valley"
              badge="The Beginning"
              badgeIcon={Zap}
              badgeColor="teal"
              highlightWord="Story"
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
                    North Fork Pickleball Club was founded by a group of enthusiastic players who
                    discovered the joy of pickleball and wanted to share it with their community.
                    What started as a few informal games at the local park has grown into a thriving
                    community of players across Paonia, Hotchkiss, and Crawford.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p>
                    Our mission is simple: make pickleball accessible to everyone in the North Fork
                    Valley. Whether you&apos;re picking up a paddle for the first time or you&apos;re a
                    seasoned tournament player, you&apos;ll find a welcoming community here.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p>
                    We organize regular open play sessions, host tournaments and clinics, and work
                    with local officials to improve and expand court facilities. As the sport continues
                    to grow nationally, we&apos;re proud to be part of bringing pickleball to our
                    beautiful corner of Colorado.
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

      {/* Location Section */}
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Our Location"
            subtitle="Playing in the beautiful North Fork Valley"
            badge="Find Us"
            badgeIcon={MapPin}
            badgeColor="purple"
            highlightWord="Location"
            highlightColor="purple"
          />

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 gap-8 items-center"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div
                  className="flex items-start gap-4 mb-6 p-4 rounded-2xl bg-purple/5 border border-purple/20"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <div className="p-3 rounded-xl bg-purple text-white shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-charcoal-dark">
                      Paonia Town Park
                    </h3>
                    <p className="text-gray-600">214 Grand Ave, Paonia, CO 81428</p>
                  </div>
                </motion.div>

                <div className="space-y-4 text-gray-600">
                  <ScrollReveal delay={0.1}>
                    <p>
                      Our primary courts are located at Paonia Town Park, featuring 4 dedicated
                      pickleball courts with lights for evening play. The park offers parking,
                      restrooms, and shaded areas for spectators.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p>
                      Additional courts are available at Hotchkiss Town Park, and we&apos;re
                      working to expand facilities throughout the valley.
                    </p>
                  </ScrollReveal>
                </div>
              </div>

              <ScrollReveal>
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple via-teal to-lime rounded-3xl blur-lg opacity-30" />
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-video
                    flex items-center justify-center border border-gray-200 overflow-hidden">
                    <div className="text-center text-gray-400">
                      <motion.div
                        animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin size={48} className="mx-auto mb-2" />
                      </motion.div>
                      <p className="font-medium">Interactive map coming soon</p>
                    </div>
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          </div>
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
