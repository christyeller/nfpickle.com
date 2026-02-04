'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Heart, Users, Sparkles } from 'lucide-react'
import {
  heroContent,
  heroBadge,
  heroTitle,
  heroSubtitle,
  heroCTA,
} from '@/lib/animations'
import { MagneticButton } from './MagneticButton'
import { CountUp } from './CountUp'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://media.nfpickle.com/site-assets/istockphoto-1411720682-640_adpp_is.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <motion.div
        className="container-custom relative z-10 text-center text-white px-4"
        variants={heroContent}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={heroBadge}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 mb-8"
        >
          <motion.span
            className="w-2 h-2 bg-lime rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-white">North Fork Valley&apos;s Premier Pickleball Community</span>
          <Sparkles className="w-4 h-4 text-white" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={heroTitle}
          className="font-display font-black mb-6 leading-[0.9]"
        >
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-lime drop-shadow-lg">
            North Fork <span className="text-white">Pickleball Club</span>
          </span>
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          className="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white font-semibold mb-8 drop-shadow-lg leading-tight"
        >
          Bringing dedicated pickleball courts<br className="hidden sm:block" />
          to Hotchkiss, Colorado
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroCTA}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <MagneticButton as="div" strength={0.3}>
            <Link
              href="/donate"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-lime text-court-dark font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-lime hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              <span>Donate Now</span>
            </Link>
          </MagneticButton>
          <MagneticButton as="div" strength={0.3}>
            <Link
              href="/play"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-black/30 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105"
            >
              <span>Court Locations</span>
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stat Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { count: 228, label: 'Delta' },
              { count: 107, label: 'Cedaredge' },
              { count: 66, label: 'Paonia' },
              { count: 48, label: 'Crawford' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10"
              >
                <div className="text-center">
                  <CountUp end={stat.count} duration={2} className="text-3xl font-bold font-display text-white drop-shadow-md" />
                  <p className="text-xs text-white/70 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-white mt-3 uppercase tracking-wider">
            Registered Players by Town
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
