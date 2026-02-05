'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Users,
  Calendar,
  Target,
  Award,
  MapPin,
  Heart,
  Zap,
  Trophy,
  Star,
  LucideIcon,
} from 'lucide-react'
import { MotionTiltCard } from './TiltCard'
import { staggerItem } from '@/lib/animations'
import {
  pickleballIconMap,
  type PickleballIconName,
} from './PickleballIcons'

const lucideIconMap: Record<string, LucideIcon> = {
  Users,
  Calendar,
  Target,
  Award,
  MapPin,
  Heart,
  Zap,
  Trophy,
  Star,
}

// Combined icon map - check pickleball icons first, then lucide
const getIcon = (iconName: string) => {
  if (iconName in pickleballIconMap) {
    return pickleballIconMap[iconName as PickleballIconName]
  }
  return lucideIconMap[iconName] || Users
}

const colorVariants = {
  lime: {
    gradient: 'from-lime to-teal',
    glow: 'group-hover:shadow-glow-lime',
    iconBg: 'bg-lime',
    iconText: 'text-court-dark',
    hoverText: 'group-hover:text-lime',
  },
  coral: {
    gradient: 'from-coral to-sunset',
    glow: 'group-hover:shadow-glow-coral',
    iconBg: 'bg-coral',
    iconText: 'text-white',
    hoverText: 'group-hover:text-coral',
  },
  teal: {
    gradient: 'from-teal to-lime',
    glow: 'group-hover:shadow-glow-teal',
    iconBg: 'bg-teal',
    iconText: 'text-white',
    hoverText: 'group-hover:text-teal',
  },
  purple: {
    gradient: 'from-purple to-coral',
    glow: 'group-hover:shadow-glow-purple',
    iconBg: 'bg-purple',
    iconText: 'text-white',
    hoverText: 'group-hover:text-purple',
  },
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  index?: number
  color?: keyof typeof colorVariants
  href?: string
  imageSrc?: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  index = 0,
  color = 'lime',
  href,
  imageSrc,
}: FeatureCardProps) {
  const Icon = getIcon(icon)
  const prefersReducedMotion = useReducedMotion()
  const colors = colorVariants[color]

  const CardWrapper = prefersReducedMotion ? motion.div : MotionTiltCard

  return (
    <motion.div
      variants={staggerItem}
      className="h-full"
    >
      <CardWrapper
        className={`group relative h-full p-8 rounded-2xl bg-white border border-gray-100
          transition-all duration-500 ${colors.glow} text-center`}
        maxTilt={8}
        scale={1.02}
      >
        {/* Background fill on hover */}
        <div
          className="absolute -inset-4 rounded-3xl bg-[#207348]
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Icon or Image container */}
        <motion.div
          className="relative z-10 mb-6 flex justify-center"
          whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: imageSrc ? 0 : 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {imageSrc ? (
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
              <Image
                src={imageSrc}
                alt={title}
                width={100}
                height={100}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <>
              <div
                className={`w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center
                  shadow-lg transition-shadow duration-300 group-hover:shadow-xl`}
              >
                <Icon className={`w-8 h-8 ${colors.iconText}`} />
              </div>
              {/* Glow effect */}
              <div
                className={`absolute inset-0 w-16 h-16 rounded-2xl ${colors.iconBg}
                  opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500`}
              />
            </>
          )}
        </motion.div>

        {/* Content */}
        <h3
          className="relative z-10 text-xl font-display font-bold mb-3 text-charcoal-dark
            group-hover:text-white transition-colors duration-300"
        >
          {title}
        </h3>
        <p className="relative z-10 text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-300">{description}</p>

        {/* Arrow indicator */}
        {href && (
          <motion.div
            className={`relative z-10 mt-6 flex items-center gap-2 font-medium ${
              color === 'lime' ? 'text-lime-700' :
              color === 'coral' ? 'text-coral' :
              color === 'teal' ? 'text-teal' :
              'text-purple'
            }`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span>Learn more</span>
            <motion.span
              animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        )}

      </CardWrapper>
    </motion.div>
  )
}

// Compact version for grids
interface FeatureCardCompactProps {
  icon: string
  title: string
  description: string
  color?: keyof typeof colorVariants
}

export function FeatureCardCompact({
  icon,
  title,
  description,
  color = 'lime',
}: FeatureCardCompactProps) {
  const Icon = getIcon(icon)
  const prefersReducedMotion = useReducedMotion()
  const colors = colorVariants[color]

  return (
    <motion.div
      className={`group flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm
        border border-gray-100 hover:border-${color}/30 transition-all duration-300
        hover:bg-white ${colors.glow}`}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className={`w-6 h-6 ${colors.iconText}`} />
      </div>
      <div>
        <h4 className={`font-display font-semibold ${colors.hoverText} transition-colors`}>
          {title}
        </h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </motion.div>
  )
}
