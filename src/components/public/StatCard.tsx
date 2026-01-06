'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Users, MapPin, Calendar, Heart, Zap, Trophy, Star, LucideIcon } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'
import { staggerItem } from '@/lib/animations'

const iconMap: Record<string, LucideIcon> = {
  Users,
  MapPin,
  Calendar,
  Heart,
  Zap,
  Trophy,
  Star,
}

const colorVariants = {
  lime: {
    gradient: 'from-lime to-teal',
    icon: 'bg-lime text-court-dark',
    glow: 'group-hover:shadow-glow-lime',
  },
  coral: {
    gradient: 'from-coral to-sunset',
    icon: 'bg-coral text-white',
    glow: 'group-hover:shadow-glow-coral',
  },
  teal: {
    gradient: 'from-teal to-court',
    icon: 'bg-teal text-white',
    glow: 'group-hover:shadow-glow-teal',
  },
  purple: {
    gradient: 'from-purple to-coral',
    icon: 'bg-purple text-white',
    glow: 'group-hover:shadow-glow-purple',
  },
}

interface StatCardProps {
  value: number
  suffix?: string
  label: string
  icon: string
  color?: keyof typeof colorVariants
}

export default function StatCard({
  value,
  suffix = '',
  label,
  icon,
  color = 'lime',
}: StatCardProps) {
  const Icon = iconMap[icon] || Users
  const prefersReducedMotion = useReducedMotion()
  const colors = colorVariants[color]

  return (
    <motion.div
      variants={staggerItem}
      className="group h-full"
    >
      <motion.div
        className={`relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8
          border border-white/50 shadow-elevation-2 overflow-hidden
          transition-all duration-500 ${colors.glow}`}
        whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}
            opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl
          group-hover:bg-white/20 transition-colors" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center
              mb-4 shadow-lg group-hover:bg-white/20 group-hover:text-white transition-colors`}
            whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Icon className="w-7 h-7" />
          </motion.div>

          {/* Value */}
          <p className="text-4xl md:text-5xl font-display font-bold text-charcoal-dark
            group-hover:text-white transition-colors">
            <AnimatedCounter end={value} suffix={suffix} />
          </p>

          {/* Label */}
          <p className="text-sm md:text-base text-gray-600 group-hover:text-white/80
            transition-colors mt-2 font-medium">
            {label}
          </p>
        </div>

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}
            transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        />
      </motion.div>
    </motion.div>
  )
}

// Compact variant for smaller displays
export function StatCardCompact({
  value,
  suffix = '',
  label,
  icon,
  color = 'lime',
}: StatCardProps) {
  const Icon = iconMap[icon] || Users
  const colors = colorVariants[color]

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50">
      <div className={`w-12 h-12 rounded-lg ${colors.icon} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-charcoal-dark">
          <AnimatedCounter end={value} suffix={suffix} />
        </p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  )
}
