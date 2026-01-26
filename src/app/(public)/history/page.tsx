'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, Target, Heart, MapPin, Zap, ArrowRight, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import SectionHeader from '@/components/public/SectionHeader'
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

export default function HistoryPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Custom Creative Hero */}
      <section className="relative pt-28 pb-40 bg-charcoal-dark overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0"
          animate={prefersReducedMotion ? {} : {
            background: [
              'linear-gradient(135deg, #2A7F9A 0%, #0E4A60 35%, #0E4A60 65%, #1A5F7A 100%)',
              'linear-gradient(135deg, #1A5F7A 0%, #0E4A60 35%, #0E4A60 65%, #2A7F9A 100%)',
              'linear-gradient(135deg, #207349 0%, #0E4A60 30%, #0E4A60 70%, #1A5F7A 100%)',
              'linear-gradient(135deg, #1A5F7A 0%, #0E4A60 35%, #0E4A60 65%, #207349 100%)',
              'linear-gradient(135deg, #2A7F9A 0%, #0E4A60 35%, #0E4A60 65%, #1A5F7A 100%)',
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(135deg, #2A7F9A 0%, #0E4A60 35%, #0E4A60 65%, #1A5F7A 100%)' }}
        />

        {/* Mesh overlay */}
        <div className="absolute inset-0 mesh-background opacity-20" />

        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Playful badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-lime/20 border-lime/30 text-lime mb-6"
            >
              <Calendar size={16} />
              <span className="text-sm font-medium">Timeline</span>
            </motion.div>

            {/* Main title with animated words */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Our{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-lime">History</span>
                <motion.span
                  className="absolute -inset-1 bg-lime/20 rounded-lg -z-0"
                  initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-white/70 max-w-xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              How pickleball came to the North Fork Valley
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

      {/* Timeline Section */}
      <section className="section bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">

            {/* Vertical Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal via-lime to-coral transform md:-translate-x-1/2" />

              {/* 2013 */}
              <ScrollReveal delay={0.1}>
                <div className="relative flex flex-col md:flex-row md:items-center mb-12">
                  <div className="md:w-1/2 md:pr-12 md:text-right pl-20 md:pl-0">
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        The North Fork Pool, Park, and Recreation District (NFPPRD) completely replaced the Apple Valley tennis courts in 2013.
                      </p>
                    </motion.div>
                  </div>
                  {/* Year marker */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-teal text-white flex items-center justify-center font-display font-bold text-xs md:text-lg shadow-lg ring-4 ring-teal/20"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      2013
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block" />
                </div>
              </ScrollReveal>

              {/* 2015 */}
              <ScrollReveal delay={0.2}>
                <div className="relative flex flex-col md:flex-row md:items-center mb-12">
                  <div className="md:w-1/2 md:pr-12 hidden md:block" />
                  {/* Year marker */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-lime text-court-dark flex items-center justify-center font-display font-bold text-xs md:text-lg shadow-lg ring-4 ring-lime/20"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      2015
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 pl-20">
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        The NFPPRD added pickleball lines along with portable nets and equipment. Pickleball quickly took off in Paonia, becoming an instant favorite among residents. The sport&apos;s popularity is clearly reflected in the annual Paonia Picklefest Tournament, which has grown into a major regional event attracting players from Grand Junction, Carbondale/Basalt, and Glenwood Springs.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 2023 - Crawford Town Hall */}
              <ScrollReveal delay={0.3}>
                <div className="relative flex flex-col md:flex-row md:items-center mb-12">
                  <div className="md:w-1/2 md:pr-12 md:text-right pl-20 md:pl-0">
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        In early 2023, a group from Crawford asked permission from the Crawford Town Council to add pickleball lines to the existing outdoor basketball court at Crawford Town Hall. Approval was granted, and NFPPRD again supplied a portable net, paddles, and balls.
                      </p>
                    </motion.div>
                  </div>
                  {/* Year marker */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-coral text-white flex items-center justify-center font-display font-bold text-xs md:text-lg shadow-lg ring-4 ring-coral/20"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      2023
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block" />
                </div>
              </ScrollReveal>

              {/* 2023 - Montessori School */}
              <ScrollReveal delay={0.4}>
                <div className="relative flex flex-col md:flex-row md:items-center mb-12">
                  <div className="md:w-1/2 md:pr-12 hidden md:block" />
                  {/* Year marker */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-purple text-white flex items-center justify-center font-display font-bold text-xs md:text-lg shadow-lg ring-4 ring-purple/20"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      2023
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 pl-20">
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        Later in 2023, the local Montessori School generously allowed the Crawford Pickleball Club (CPC) to use its indoor basketball court for winter pickleball play, with NFPPRD providing the necessary equipment.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 2026 */}
              <ScrollReveal delay={0.5}>
                <div className="relative flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right pl-20 md:pl-0">
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        Despite these efforts, pickleball&apos;s rapid growth has quickly outpaced available facilities in Crawford. Players are now forced to travel 30-45-60 minutes or more each way to access venues with multiple courts suitable for competitive recreational play.
                      </p>
                    </motion.div>
                  </div>
                  {/* Year marker */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-[#E49B0B] text-white flex items-center justify-center font-display font-bold text-xs md:text-lg shadow-lg ring-4 ring-[#E49B0B]/20"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      2026
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block" />
                </div>
              </ScrollReveal>
            </div>
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
      <section className="section bg-cream relative overflow-hidden">
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
                  <div className="relative rounded-2xl aspect-video border border-gray-200 overflow-hidden">
                    <iframe
                      src="https://maps.google.com/maps?q=Paonia+Town+Park,+214+Grand+Ave,+Paonia,+CO+81428&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Paonia Town Park Location"
                      className="absolute inset-0"
                    />
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
