'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Clock, Star, Zap, ArrowRight, Info, Mail, Smartphone, ClipboardList, Navigation } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { PickleballPong } from '@/components/public/PickleballPong'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface Court {
  name: string
  locations: { name: string; url: string; type: string; courts: number | null; address?: string }[]
  schedule?: string
  admission?: string
  color: 'lime' | 'teal' | 'purple' | 'coral'
}

const courts: Court[] = [
  {
    name: 'Crawford',
    locations: [
      { name: 'Crawford Town Hall', url: 'https://townofcrawford.colorado.gov/', type: 'outdoor', courts: null, address: '425 Highway 92, Crawford' },
      { name: 'North Fork Montessori @ Crawford', url: 'https://nfmc.deltaschools.com/en-US', type: 'indoor', courts: null, address: '51 Fir Avenue, Crawford' },
    ],
    admission: 'FREE',
    color: 'lime' as const,
  },
  {
    name: 'Paonia',
    locations: [
      { name: 'Apple Valley Park', url: 'https://townofpaonia.colorado.gov/departments/parks-recreation', type: 'outdoor', courts: 3, address: '45 Pan American Avenue, Paonia' },
    ],
    admission: 'FREE',
    color: 'teal' as const,
  },
  {
    name: 'Delta',
    locations: [
      { name: 'Bill Heddles Recreation Center', url: 'https://www.cityofdelta.net/parksrecgolf/page/recreation-center', type: 'both', courts: null, address: '360 Main Street, Delta' },
    ],
    admission: 'Outdoor — FREE | Indoor — $8 general admission',
    color: 'teal' as const,
  },
  {
    name: 'Cedaredge',
    locations: [
      { name: 'Grand Mesa Pickleball Club', url: 'https://www.grandmesapickleball.org/', type: 'indoor', courts: null, address: '360 SW 8th Avenue, Cedaredge' },
    ],
    admission: '$70/year membership',
    color: 'coral' as const,
  },
]

const rules = [
  {
    title: 'Scoring',
    description: 'Games are played to 11 points (win by 2). Only the serving team can score points.',
  },
  {
    title: 'The Two-Bounce Rule',
    description: 'The ball must bounce once on each side before volleys are allowed. After these two bounces, players can volley or play off the bounce.',
  },
  {
    title: 'The Kitchen (Non-Volley Zone)',
    description: 'The 7-foot zone on each side of the net is the "kitchen." You cannot volley (hit the ball in the air) while standing in this zone.',
  },
  {
    title: 'Serving',
    description: 'Serves must be underhand, made below waist level, and diagonal to the opponent\'s court. The ball must clear the net and land in the correct service court.',
  },
]

const teamReachCodes = [
  { location: 'Crawford', code: 'RMPicklers', color: 'lime' as const },
  { location: 'Paonia', code: 'AVPBall', color: 'teal' as const },
  { location: 'Delta', code: 'PBDelta', color: 'teal' as const },
  { location: 'Cedaredge', code: 'GMP2024', color: 'coral' as const },
  { location: 'Montrose', code: 'Montrose', color: 'lime' as const },
]

const colorMap = {
  lime: {
    bg: 'bg-lime/10',
    border: 'border-lime/30',
    icon: 'bg-lime text-court-dark',
    badge: 'bg-lime/10 text-lime-700',
  },
  teal: {
    bg: 'bg-teal/10',
    border: 'border-teal/30',
    icon: 'bg-teal text-white',
    badge: 'bg-teal/10 text-teal',
  },
  purple: {
    bg: 'bg-purple/10',
    border: 'border-purple/30',
    icon: 'bg-purple text-white',
    badge: 'bg-purple/10 text-purple',
  },
  coral: {
    bg: 'bg-coral/10',
    border: 'border-coral/30',
    icon: 'bg-coral text-white',
    badge: 'bg-coral/10 text-coral',
  },
}

export default function PlayPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Hero Section */}
      <section className="section pt-32 lg:min-h-screen lg:flex lg:items-center lg:justify-center text-white relative overflow-hidden">
        {/* Mobile/Tablet: Static background image */}
        <div
          className="absolute inset-0 lg:hidden bg-cover bg-center"
          style={{ backgroundImage: 'url(https://media.nfpickle.com/site-assets/lesli-whitecotton-UHZ_w1bOIvY-unsplash.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Desktop: Interactive Pong game */}
        <div className="absolute inset-0 hidden lg:block" style={{ top: '-50px' }}>
          <PickleballPong className="w-full h-full" />
        </div>

        <div className="container-custom relative z-10 lg:mt-[50px]">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              {/* Desktop: Game instructions */}
              <span className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-6">
                <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                Use your mouse to control the orange paddle and play a pickleball game now!
              </span>
              {/* Mobile/Tablet: Simple badge */}
              <span className="inline-flex lg:hidden items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-6">
                <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                Find courts and schedules in the North Fork Valley
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 drop-shadow-lg">
                Play{' '}
                <span className="text-lime">Pickleball</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                Courts, schedules, and everything you need to get playing
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8">
                <Link
                  href="#open-play"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#F38D09] text-white font-bold text-lg rounded-xl hover:bg-[#F38D09]/90 transition-colors"
                >
                  <Smartphone className="w-5 h-5" />
                  Download the TeamReach App for Current Play Schedules
                </Link>
              </div>
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
            <motion.div variants={staggerItem}>
              <Link href="#court-locations" className="text-center group block">
                <div className="text-3xl md:text-5xl font-display font-bold text-lime mb-1">
                  <MapPin className="w-8 h-8 md:w-12 md:h-12 mx-auto group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-sm md:text-base font-medium text-white group-hover:text-lime transition-colors">
                  Our Courts
                </div>
                <div className="text-xs md:text-sm text-white/60">
                  Multiple locations
                </div>
              </Link>
            </motion.div>
            <Link href="#basic-rules" className="text-center group">
              <motion.div variants={staggerItem}>
                <div className="text-3xl md:text-5xl font-display font-bold text-lime mb-1">
                  <ClipboardList className="w-8 h-8 md:w-12 md:h-12 mx-auto group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-sm md:text-base font-medium text-white group-hover:text-lime transition-colors">
                  Basic Rules
                </div>
                <div className="text-xs md:text-sm text-white/60">
                  Learn the game
                </div>
              </motion.div>
            </Link>
            <Link href="/contact" className="text-center group">
              <motion.div variants={staggerItem}>
                <div className="text-3xl md:text-5xl font-display font-bold text-lime mb-1">
                  <Mail className="w-8 h-8 md:w-12 md:h-12 mx-auto group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-sm md:text-base font-medium text-white group-hover:text-lime transition-colors">
                  Contact Us
                </div>
                <div className="text-xs md:text-sm text-white/60">
                  Get in touch
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom wave - mobile/tablet only */}
        <div className="absolute bottom-0 left-0 right-0 lg:hidden">
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

      {/* Court Locations */}
      <section id="court-locations" className="section bg-cream relative overflow-hidden pt-[40px]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Court Locations"
            subtitle="Find a court near you in the North Fork Valley and/or Greater Delta County"
            badge="Our Courts"
            badgeIcon={MapPin}
            badgeColor="lime"
            highlightWord="Locations"
            highlightColor="coral"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {courts.map((court) => {
              const colors = colorMap[court.color]
              return (
                <motion.div
                  key={court.name}
                  variants={staggerItem}
                  className={`group relative p-6 rounded-2xl bg-white border ${colors.border}
                    shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 overflow-hidden`}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDF9F0] rounded-bl-full" />

                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 rounded-xl ${colors.icon} shadow-lg flex-shrink-0`}>
                      <MapPin size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-charcoal-dark">
                        {court.name}
                      </h3>

                      {court.admission && (
                        <p className="mt-2 text-sm font-semibold text-charcoal-dark">
                          Admission: {court.admission}
                        </p>
                      )}

                      <div className="mt-3 space-y-2">
                        {court.locations.map((location) => (
                          <div key={location.name}>
                            <div className="flex flex-wrap items-center gap-2">
                              <a
                                href={location.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-court hover:text-court-dark font-medium underline underline-offset-2"
                              >
                                {location.name}
                              </a>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                                {location.type === 'both' ? 'Indoor & Outdoor' : location.type}
                              </span>
                              {location.courts && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                                  {location.courts} {location.courts === 1 ? 'court' : 'courts'}
                                </span>
                              )}
                            </div>
                            {location.address && (
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address + ', CO')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-court transition-colors group/dir"
                              >
                                <Navigation size={13} className="text-court group-hover/dir:text-court-dark flex-shrink-0" />
                                <span className="underline underline-offset-2 decoration-gray-300 group-hover/dir:decoration-court">
                                  {location.address}
                                </span>
                              </a>
                            )}
                          </div>
                        ))}
                      </div>

                      {court.schedule && (
                        <p className="mt-4 text-sm text-gray-600">
                          {court.schedule}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* TeamReach App Section */}
      <section
        id="open-play"
        className="section relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/paoniacourts.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
              <Smartphone className="w-4 h-4" />
              Stay Connected
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Find Open <span className="text-[#F38D09]">Play</span>
            </h2>
            <p className="text-xl text-white font-bold max-w-3xl mx-auto">
              Download the TeamReach app below and enter your group code to see when and where people are playing in our region
            </p>
          </div>

          {/* App Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="https://apps.apple.com/us/app/teamreach-team-management/id1101253705"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 bg-coral text-white font-semibold rounded-xl hover:bg-coral/90 transition-colors"
            >
              <div className="text-center">
                <div className="text-xs text-white/80">Download on the</div>
                <div className="text-lg leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.teamreach.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 bg-coral text-white font-semibold rounded-xl hover:bg-coral/90 transition-colors"
            >
              <div className="text-center">
                <div className="text-xs text-white/80">Get it on</div>
                <div className="text-lg leading-tight">Google Play</div>
              </div>
            </a>
          </motion.div>

          {/* Group Codes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-display font-semibold text-white text-center mb-6">
              Enter your group code to join:
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
            >
              {teamReachCodes.map((item) => {
                const colors = colorMap[item.color]
                return (
                  <motion.div
                    key={item.location}
                    variants={staggerItem}
                    className={`p-4 rounded-xl bg-gray-50 border ${colors.border} text-center hover:shadow-elevation-1 transition-shadow`}
                  >
                    <div className="text-sm text-gray-600 mb-1">{item.location}</div>
                    <div className={`font-mono font-bold text-lg ${colors.badge.split(' ')[1]}`}>
                      {item.code}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Basic Rules */}
      <section id="basic-rules" className="section bg-lime relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-10" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Basic Rules"
            subtitle="Quick overview of pickleball rules"
            badge="Getting Started"
            badgeIcon={Info}
            badgeColor="lime"
            highlightWord="Rules"
            highlightColor="lime"
            darkMode
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {rules.map((rule, index) => (
              <motion.div
                key={rule.title}
                variants={staggerItem}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-elevation-2 hover:shadow-elevation-3
                  transition-all duration-300 border border-white/50"
                whileHover={prefersReducedMotion ? {} : { x: 4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-court-dark font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-charcoal-dark mb-2">
                      {rule.title}
                    </h3>
                    <p className="text-gray-600">{rule.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-dark mb-4">
              Ready to <span className="text-lime">Play?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              New to pickleball? No problem! We welcome beginners at all our open play sessions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-white
                font-bold text-lg rounded-xl hover:bg-teal/90 transition-colors"
            >
              Have Questions? Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
