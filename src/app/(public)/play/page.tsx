'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Clock, Star, Zap, ArrowRight, Info } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

const courts = [
  {
    name: 'Crawford',
    locations: [
      { name: 'Crawford Town Hall', url: 'https://townofcrawford.colorado.gov/', type: 'outdoor', courts: 1 },
      { name: 'Crawford Montessori School', url: 'https://nfmc.deltaschools.com/en-US', type: 'indoor', courts: 1 },
    ],
    schedule: 'Currently playing indoors: Wednesdays at 4pm and Saturdays at 9am.',
    color: 'lime' as const,
  },
  {
    name: 'Paonia',
    locations: [
      { name: 'Apple Valley Park', url: 'https://townofpaonia.colorado.gov/departments/parks-recreation', type: 'outdoor', courts: 3 },
    ],
    schedule: 'Play happens on Tuesdays, Thursdays and Saturdays. Start times are anywhere from 11am - 1pm and vary according to weather.',
    color: 'teal' as const,
  },
  {
    name: 'Delta',
    locations: [
      { name: 'Bill Heddles Recreation Center', url: 'https://www.cityofdelta.net/parksrecgolf/page/recreation-center', type: 'both', courts: null },
    ],
    schedule: 'Outdoor tennis courts are lined for pickleball. Indoor rec pickleball is offered on the basketball court at scheduled times listed on their website.',
    color: 'coral' as const,
  },
  {
    name: 'Cedaredge',
    locations: [
      { name: 'Grand Mesa Pickleball Club', url: 'https://www.grandmesapickleball.org/', type: 'outdoor', courts: null },
    ],
    schedule: 'Play is limited to members only. They have their own organization and are also raising money to build more courts.',
    color: 'purple' as const,
  },
]

const schedule = [
  { day: 'Monday', time: '9:00 AM - 12:00 PM', location: 'Paonia Town Park', level: 'All Levels' },
  { day: 'Wednesday', time: '9:00 AM - 12:00 PM', location: 'Paonia Town Park', level: 'All Levels' },
  { day: 'Friday', time: '9:00 AM - 12:00 PM', location: 'Paonia Town Park', level: 'All Levels' },
  { day: 'Saturday', time: '10:00 AM - 1:00 PM', location: 'Paonia Town Park', level: 'All Levels' },
]

const skillLevels = [
  {
    level: 'Beginner',
    rating: '2.0 - 2.5',
    description: 'New to pickleball or still learning the basics. Can sustain a short rally with players of similar ability.',
    color: 'lime' as const,
  },
  {
    level: 'Intermediate',
    rating: '3.0 - 3.5',
    description: 'Understands court positioning and basic strategy. Can execute common shots with moderate consistency.',
    color: 'teal' as const,
  },
  {
    level: 'Advanced',
    rating: '4.0+',
    description: 'Strong shot variety, excellent court coverage, and strategic play. Competitive tournament-level player.',
    color: 'purple' as const,
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
                <Zap className="w-4 h-4" />
                Find Your Game
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Play{' '}
                <span className="text-lime">Pickleball</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Courts, schedules, and everything you need to get playing
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
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-bold text-lime mb-1">
                <MapPin className="w-8 h-8 md:w-12 md:h-12 mx-auto" />
              </div>
              <div className="text-sm md:text-base font-medium text-white">
                Our Courts
              </div>
              <div className="text-xs md:text-sm text-white/60">
                Multiple locations
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-bold text-lime mb-1">
                <Clock className="w-8 h-8 md:w-12 md:h-12 mx-auto" />
              </div>
              <div className="text-sm md:text-base font-medium text-white">
                Court Locations
              </div>
              <div className="text-xs md:text-sm text-white/60">
                Open play schedules
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-bold text-lime mb-1">
                <Star className="w-8 h-8 md:w-12 md:h-12 mx-auto" />
              </div>
              <div className="text-sm md:text-base font-medium text-white">
                Find a Court
              </div>
              <div className="text-xs md:text-sm text-white/60">
                Near you in the North Fork Valley
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Court Locations */}
      <section className="section bg-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Court Locations"
            subtitle="Find a court near you in the North Fork Valley"
            badge="Our Courts"
            badgeIcon={MapPin}
            badgeColor="lime"
            highlightWord="Locations"
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

                      <div className="mt-3 space-y-2">
                        {court.locations.map((location) => (
                          <div key={location.name} className="flex flex-wrap items-center gap-2">
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
                        ))}
                      </div>

                      <p className="mt-4 text-sm text-gray-600">
                        {court.schedule}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Open Play Schedule */}
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Open Play Schedule"
            subtitle="Join us for free open play sessions"
            badge="Weekly Sessions"
            badgeIcon={Clock}
            badgeColor="teal"
            highlightWord="Schedule"
            highlightColor="teal"
          />

          <ScrollReveal className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-elevation-2 overflow-hidden">
              <div className="bg-gradient-to-r from-court to-court-dark text-white px-6 py-4">
                <div className="grid grid-cols-4 gap-4 font-medium">
                  <span>Day</span>
                  <span>Time</span>
                  <span className="hidden md:block">Location</span>
                  <span className="hidden md:block">Level</span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {schedule.map((session, index) => (
                  <motion.div
                    key={index}
                    className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium text-charcoal-dark">{session.day}</span>
                    <span className="text-gray-600">{session.time}</span>
                    <span className="hidden md:block text-gray-600">{session.location}</span>
                    <span className="hidden md:block">
                      <span className="px-2 py-1 bg-lime/10 text-lime-700 text-sm rounded-full">
                        {session.level}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-center text-gray-500 mt-6">
              Schedule subject to change. Check our{' '}
              <Link href="/events" className="text-court hover:text-court-dark font-medium">
                events page
              </Link>{' '}
              for the latest updates.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Skill Levels */}
      <section className="section bg-cream relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Skill Levels"
            subtitle="Find your level and play with others at similar skill"
            badge="All Levels Welcome"
            badgeIcon={Star}
            badgeColor="coral"
            highlightWord="Levels"
            highlightColor="coral"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {skillLevels.map((level) => {
              const colors = colorMap[level.color]
              return (
                <motion.div
                  key={level.level}
                  variants={staggerItem}
                  className={`relative p-6 rounded-2xl bg-white border ${colors.border}
                    shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 text-center`}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                >
                  <div className={`w-16 h-16 rounded-2xl ${colors.icon} mx-auto mb-4
                    flex items-center justify-center shadow-lg`}>
                    <Star size={28} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-charcoal-dark mb-2">
                    {level.level}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${colors.badge}`}>
                    {level.rating}
                  </span>
                  <p className="text-gray-600">{level.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Basic Rules */}
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-30" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Basic Rules"
            subtitle="Quick overview of pickleball rules"
            badge="Getting Started"
            badgeIcon={Info}
            badgeColor="purple"
            highlightWord="Rules"
            highlightColor="purple"
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
                className="bg-white rounded-2xl p-6 shadow-elevation-1 hover:shadow-elevation-2
                  transition-all duration-300 border border-gray-100"
                whileHover={prefersReducedMotion ? {} : { x: 4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple font-bold text-sm">{index + 1}</span>
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
      <section className="section bg-gradient-to-br from-court via-court-dark to-purple text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-background opacity-30" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-lime/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to <span className="text-lime">Play?</span>
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
              New to pickleball? No problem! We welcome beginners at all our open play sessions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-court-dark
                font-bold text-lg rounded-xl hover:shadow-glow-lime transition-shadow"
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
