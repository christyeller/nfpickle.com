'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  badge?: string
  badgeIcon?: LucideIcon
  badgeColor?: 'lime' | 'coral' | 'teal' | 'purple'
  highlightWord?: string
  highlightColor?: 'lime' | 'coral' | 'teal' | 'purple' | 'gradient'
}

const badgeColors = {
  lime: 'bg-lime/10 text-lime-700',
  coral: 'bg-coral/10 text-coral',
  teal: 'bg-teal/10 text-teal',
  purple: 'bg-purple/10 text-purple',
}

const highlightColors = {
  lime: 'text-lime-600',
  coral: 'text-coral',
  teal: 'text-teal',
  purple: 'text-purple',
  gradient: 'gradient-text',
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  badge,
  badgeIcon: BadgeIcon,
  badgeColor = 'lime',
  highlightWord,
  highlightColor = 'gradient',
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion()

  // Highlight specific word in title if provided
  const renderTitle = () => {
    if (!highlightWord) {
      return title
    }

    const parts = title.split(highlightWord)
    if (parts.length === 1) {
      return title
    }

    return (
      <>
        {parts[0]}
        <span className={highlightColors[highlightColor]}>{highlightWord}</span>
        {parts.slice(1).join(highlightWord)}
      </>
    )
  }

  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''}`}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {badge && (
        <motion.span
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${badgeColors[badgeColor]}`}
        >
          {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
          {badge}
        </motion.span>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-dark">
        {renderTitle()}
      </h2>

      {subtitle && (
        <motion.p
          className={`mt-4 text-lg text-gray-600 ${centered ? 'max-w-2xl mx-auto' : ''}`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
