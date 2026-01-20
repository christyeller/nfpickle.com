'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, Target, Heart, ArrowRight, MapPin, GraduationCap, TrendingUp, Handshake } from 'lucide-react'
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

const stats = [
  { number: '#1', label: 'Fastest Growing Sport', sublabel: 'in the United States' },
  { number: '0', label: 'Courts in Hotchkiss', sublabel: 'currently available' },
  { number: '100%', label: 'Our Commitment', sublabel: 'to the community' },
]

const challenges = [
  {
    icon: MapPin,
    title: 'No Local Facilities',
    description: 'Hotchkiss is currently the only municipality in Delta County without access to racket and/or paddle sport facilities.',
  },
  {
    icon: GraduationCap,
    title: 'Student Athletes Affected',
    description: 'This absence creates a significant hardship for the local high school, whose tennis team must travel out of town for daily practices and is unable to host CHSAA tournament play.',
  },
  {
    icon: TrendingUp,
    title: 'Growing Opportunities',
    description: 'Pickleball popularity is rapidly growing in high schools across the country, moving from casual gym classes to becoming an official varsity sport to potential college recruitment.',
  },
]

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-court via-court-dark to-purple text-white relative overflow-hidden pt-32">
        <div className="absolute inset-0 mesh-background opacity-20" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-lime/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-lime text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                About North Fork Pickleball Club
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Bringing Pickleball to the{' '}
                <span className="text-lime">North Fork Valley</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Pickleball is the fastest-growing sport in the United States, enjoyed by people of all ages—from young children to active seniors. Fun, easy to learn, and highly social, pickleball promotes physical health, wellness, and strong community connections.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats Bar */}
          <motion.div
            className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-display font-bold text-lime mb-1">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-medium text-white">
                  {stat.label}
                </div>
                <div className="text-xs md:text-sm text-white/60">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Section - Overlapping */}
      <section className="relative z-20 -mt-16 mb-0">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { src: '/attachments/crawford-court.jpg', alt: 'Crawford pickleball court opening' },
              { src: '/attachments/gallery-2.jpg', alt: 'Club members at community event' },
              { src: '/attachments/kim-bev.jpg', alt: 'Kim and Bev at the courts' },
              { src: '/attachments/play.jpg', alt: 'Pickleball game in action' },
            ].map((image, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-elevation-2 hover:shadow-elevation-3 transition-shadow duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="section bg-cream relative overflow-hidden pt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="The Challenge"
            subtitle="Why our community needs pickleball facilities"
            badge="The Gap"
            badgeIcon={Target}
            badgeColor="coral"
            highlightWord="Challenge"
            highlightColor="coral"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {challenges.map((challenge, index) => (
              <ScrollReveal key={challenge.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-shadow h-full"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-coral/10 text-coral mb-5">
                    <challenge.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-charcoal-dark mb-3">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {challenge.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <h3 className="text-xl md:text-2xl font-display font-bold text-charcoal-dark leading-relaxed text-center max-w-4xl mx-auto">
              Providing access to pickleball facilities would allow our high school students to participate in a sport that is swiftly gaining recognition at both the varsity and collegiate levels.
            </h3>
          </ScrollReveal>
        </div>
      </section>

      {/* Community Access Section */}
      <section className="section bg-coral text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-16 items-center">
              {/* Left icon area - Pickleball paddle and ball */}
              <ScrollReveal>
                <motion.div
                  className="flex flex-col items-center text-center"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 ring-4 ring-white/30">
                    {/* Diagonal pickleball paddle */}
                    <svg className="w-14 h-14 md:w-20 md:h-20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g transform="rotate(45 32 32)">
                        {/* Paddle face - squared off */}
                        <rect x="18" y="6" width="28" height="32" rx="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
                        {/* Paddle handle */}
                        <rect x="28" y="36" width="8" height="18" rx="2" fill="currentColor" />
                      </g>
                    </svg>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white/80">All Ages</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-white/80">All Abilities</span>
                </motion.div>
              </ScrollReveal>

              {/* Right content */}
              <ScrollReveal delay={0.1}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-white/50 rounded-full" />
                    <span className="text-white/80 font-bold text-sm uppercase tracking-wider">Our Belief</span>
                  </div>
                  <p className="text-2xl md:text-4xl font-display font-bold leading-snug mb-8">
                    Residents of all ages in our community deserve convenient, local access to pickleball and tennis—without the burden of traveling long distances.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      <MapPin className="w-4 h-4" /> Local Access
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      <Heart className="w-4 h-4" /> Community First
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      <Users className="w-4 h-4" /> For Everyone
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="section bg-white relative overflow-hidden">

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left side - Mission content */}
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-medium mb-6">
                  <Handshake className="w-4 h-4" />
                  Our Mission
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-dark mb-6">
                  Closing the Gap for{' '}
                  <span className="text-teal">Our Community</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The North Fork Pickleball Club (NFPC) is dedicated to closing this gap by pursuing a sustainable solution that will deliver long-overdue access to both sports for Hotchkiss and the surrounding North Fork communities.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Now is the time to act. By investing in dedicated pickleball and tennis facilities in Hotchkiss, we have an opportunity to meet a rapidly growing demand, promote lifelong health and wellness, and strengthen community connections across the North Fork Valley. We invite community leaders, residents, and potential partners to join us in making this vision a reality—ensuring equitable access to pickleball and tennis for current and future generations.
                </p>
              </ScrollReveal>
            </div>

            {/* Right side - Visual card */}
            <ScrollReveal delay={0.2}>
              <div className="bg-cream rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-teal to-court p-8 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Now is the Time to Act
                  </h3>
                  <p className="text-white/80">
                    We invite community leaders, residents, and potential partners to join us
                  </p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {[
                      'Meet a rapidly growing demand',
                      'Promote lifelong health and wellness',
                      'Strengthen community connections across the North Fork Valley',
                      'Ensure equitable access for current and future generations',
                    ].map((item, index) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-3"
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lime/20 text-court flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-20 bg-cream relative overflow-hidden">

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
      <section className="section bg-coral text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Join Our <span className="text-white/90">Community</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you&apos;re new to pickleball or an experienced player, we&apos;d love
              to have you join us on the courts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-coral
                  font-bold text-lg rounded-xl hover:bg-white/90 transition-colors"
              >
                Become a Member
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white
                  font-bold text-lg rounded-xl hover:bg-white/10 transition-colors"
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
