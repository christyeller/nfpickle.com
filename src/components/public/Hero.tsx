'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Zap, Trophy, Users, Sparkles } from 'lucide-react'
import {
  heroContent,
  heroBadge,
  heroTitle,
  heroSubtitle,
  heroCTA,
  staggerContainer,
  staggerItem
} from '@/lib/animations'
import { MagneticButton } from './MagneticButton'
import { PickleballPong } from './PickleballPong'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Pickleball Pong Game Background */}
      <PickleballPong className="absolute inset-0" />

      {/* Content */}
      <motion.div
        className="container-custom relative z-10 text-center text-white px-4"
        style={{ marginTop: '50px' }}
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
          <span className="text-sm font-medium text-lime">Open Play Every Week</span>
          <Sparkles className="w-4 h-4 text-lime" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={heroTitle}
          className="font-display font-black mb-6 leading-[0.9]"
        >
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg">
            Pickleball is for
          </span>
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-lime drop-shadow-lg">
            Everyone
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroSubtitle}
          className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Join the North Fork Valley&apos;s fastest-growing sports community.
          <span className="block sm:inline text-lime font-semibold"> Paonia • Hotchkiss • Crawford</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroCTA}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <MagneticButton as="div" strength={0.3}>
            <Link
              href="/membership"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-lime text-court-dark font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-lime hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              <span>Join the Club</span>
            </Link>
          </MagneticButton>
          <MagneticButton as="div" strength={0.3}>
            <Link
              href="/events"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-black/30 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105"
            >
              <span>View Events</span>
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

        {/* Quick stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {[
            { icon: Users, label: 'Active Members', value: '50+', color: 'lime' },
            { icon: Trophy, label: 'Weekly Sessions', value: '10+', color: 'teal' },
            { icon: Zap, label: 'All Skill Levels', value: 'Welcome', color: 'coral' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="flex items-center gap-3 group"
            >
              <motion.div
                className={`p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 ${
                  stat.color === 'lime' ? 'group-hover:bg-lime/20' :
                  stat.color === 'teal' ? 'group-hover:bg-teal/20' :
                  'group-hover:bg-coral/20'
                } transition-colors`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'lime' ? 'text-lime' :
                  stat.color === 'teal' ? 'text-teal' :
                  'text-coral'
                }`} />
              </motion.div>
              <div className="text-left">
                <p className="text-2xl font-bold font-display drop-shadow-md">{stat.value}</p>
                <p className="text-xs text-white/70 uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
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
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
