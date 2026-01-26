'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface PageHeroProps {
  title: string
  subtitle?: string
  badge?: string
  badgeIcon?: LucideIcon
  accentColor?: 'lime' | 'coral' | 'teal' | 'purple'
}

const accentColors = {
  lime: {
    orb1: 'bg-lime/20',
    orb2: 'bg-teal/20',
    badge: 'bg-lime/20 border-lime/30 text-lime',
    highlight: 'text-lime',
  },
  coral: {
    orb1: 'bg-coral/20',
    orb2: 'bg-sunset/20',
    badge: 'bg-coral/20 border-coral/30 text-coral',
    highlight: 'text-coral',
  },
  teal: {
    orb1: 'bg-teal/20',
    orb2: 'bg-lime/20',
    badge: 'bg-teal/20 border-teal/30 text-teal',
    highlight: 'text-teal',
  },
  purple: {
    orb1: 'bg-purple/20',
    orb2: 'bg-coral/20',
    badge: 'bg-purple/20 border-purple/30 text-purple',
    highlight: 'text-purple',
  },
}

export default function PageHero({
  title,
  subtitle,
  badge,
  badgeIcon: BadgeIcon,
  accentColor = 'lime',
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const colors = accentColors[accentColor]

  return (
    <section className="relative pb-20 bg-charcoal-dark overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: '#3893A4' }} />

      {/* Mesh overlay */}
      <div className="absolute inset-0 mesh-background opacity-30" />

      {/* Animated orbs */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute top-20 left-1/4 w-64 h-64 ${colors.orb1} rounded-full blur-3xl`}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={`absolute bottom-10 right-1/4 w-80 h-80 ${colors.orb2} rounded-full blur-3xl`}
          animate={prefersReducedMotion ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${colors.badge}`}
            >
              {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
              <span className="text-sm font-medium">{badge}</span>
            </motion.div>
          )}

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="text-xl text-white/80 max-w-2xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}
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
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
