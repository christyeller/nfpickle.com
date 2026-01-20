'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface GlowingCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
  borderRadius?: string
}

export function GlowingCard({
  children,
  className = '',
  glowColor = 'rgba(228, 155, 11, 0.3)',
  glowSize = 200,
  borderRadius = '1rem'
}: GlowingCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const glowStyle = isHovered && !prefersReducedMotion
    ? {
        background: `radial-gradient(${glowSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent)`
      }
    : {}

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          ...glowStyle,
          opacity: isHovered ? 1 : 0
        }}
      />
      {children}
    </motion.div>
  )
}

// Animated border gradient card
interface GradientBorderCardProps {
  children: ReactNode
  className?: string
  borderWidth?: number
  colors?: string[]
  animated?: boolean
}

export function GradientBorderCard({
  children,
  className = '',
  borderWidth = 2,
  colors = ['#E49B0B', '#275A6D', '#207349', '#5A7A8C', '#E49B0B'],
  animated = true
}: GradientBorderCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`relative p-[${borderWidth}px] rounded-2xl overflow-hidden ${className}`}
      style={{ padding: borderWidth }}
    >
      {/* Gradient border */}
      <div
        className={`absolute inset-0 rounded-2xl ${animated && !prefersReducedMotion ? 'animate-border-flow' : ''}`}
        style={{
          background: `linear-gradient(90deg, ${colors.join(', ')})`,
          backgroundSize: animated ? '300% 100%' : '100% 100%'
        }}
      />
      {/* Content container */}
      <div className="relative bg-charcoal rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}

// Spotlight card - glow follows cursor
interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = '228, 155, 11',
  spotlightSize = 400
}: SpotlightCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight overlay */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: isHovered
              ? `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, 0.15), transparent)`
              : 'none',
            opacity: isHovered ? 1 : 0
          }}
        />
      )}
      {children}
    </div>
  )
}

// Pulsing glow card
interface PulsingGlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function PulsingGlowCard({
  children,
  className = '',
  glowColor = 'lime'
}: PulsingGlowCardProps) {
  const prefersReducedMotion = useReducedMotion()

  const glowColors: Record<string, string> = {
    lime: 'shadow-glow-lime',
    coral: 'shadow-glow-coral',
    teal: 'shadow-glow-teal',
    purple: 'shadow-glow-purple'
  }

  return (
    <motion.div
      className={`${className} ${!prefersReducedMotion ? glowColors[glowColor] || glowColors.lime : ''}`}
      animate={prefersReducedMotion ? {} : {
        boxShadow: [
          `0 0 20px rgba(228, 155, 11, 0.3)`,
          `0 0 40px rgba(228, 155, 11, 0.5)`,
          `0 0 20px rgba(228, 155, 11, 0.3)`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// Hover reveal card with overlay
interface HoverRevealCardProps {
  children: ReactNode
  overlay: ReactNode
  className?: string
}

export function HoverRevealCard({
  children,
  overlay,
  className = ''
}: HoverRevealCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
    >
      {/* Base content */}
      <div>{children}</div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/95 via-charcoal-dark/70 to-transparent flex items-end"
        variants={{
          rest: { opacity: 0, y: 20 },
          hover: prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }
        }}
      >
        {overlay}
      </motion.div>
    </motion.div>
  )
}

// Glass card with animated gradient border
interface GlassCardProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
}

export function GlassCard({
  children,
  className = '',
  intensity = 'medium'
}: GlassCardProps) {
  const intensityStyles = {
    light: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    strong: 'bg-white/20 backdrop-blur-lg border-white/30'
  }

  return (
    <div
      className={`rounded-2xl border ${intensityStyles[intensity]} ${className}`}
    >
      {children}
    </div>
  )
}
