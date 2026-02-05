'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/public/ScrollReveal'

export default function HistoryPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Custom Creative Hero */}
      <section
        className="relative pt-28 pb-40 overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/crawford-court.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/10 border-white/30 text-white mb-6"
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
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
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
      <section className="section bg-cream relative overflow-hidden -mt-px">
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
                      className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-[#F38D09] text-white flex items-center justify-center font-display font-bold text-xs md:text-lg shadow-lg ring-4 ring-[#F38D09]/20"
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

      {/* CTA Section */}
      <section
        className="section text-white relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/gallery-2.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

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
                href="/play"
                className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-court-dark
                  font-bold text-lg rounded-xl hover:shadow-glow-lime transition-shadow"
              >
                Find Open Play
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
