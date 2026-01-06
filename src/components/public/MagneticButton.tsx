'use client'

import { ReactNode, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: 'button' | 'a' | 'div'
  href?: string
  onClick?: () => void
  disabled?: boolean
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  radius = 150,
  as = 'button',
  href,
  onClick,
  disabled = false
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion || !buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < radius) {
      const pullStrength = (1 - distance / radius) * strength
      setPosition({
        x: distanceX * pullStrength,
        y: distanceY * pullStrength
      })
    }
  }, [prefersReducedMotion, strength, radius, disabled])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.button

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement>,
    className: `relative inline-flex items-center justify-center ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20
    },
    whileTap: prefersReducedMotion || disabled ? undefined : { scale: 0.95 },
    onClick: disabled ? undefined : onClick
  }

  if (as === 'a' && href) {
    return (
      <motion.a
        {...commonProps}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
      >
        {children}
      </motion.a>
    )
  }

  if (as === 'div') {
    return (
      <motion.div
        {...commonProps}
        ref={buttonRef as React.RefObject<HTMLDivElement>}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <MotionComponent
      {...commonProps}
      disabled={disabled}
    >
      {children}
    </MotionComponent>
  )
}

// Ripple effect button
interface RippleButtonProps {
  children: ReactNode
  className?: string
  rippleColor?: string
  onClick?: () => void
  disabled?: boolean
}

interface Ripple {
  x: number
  y: number
  id: number
}

export function RippleButton({
  children,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.4)',
  onClick,
  disabled = false
}: RippleButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const [ripples, setRipples] = useState<Ripple[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || disabled) {
      onClick?.()
      return
    }

    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 600)

    onClick?.()
  }, [onClick, prefersReducedMotion, disabled])

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: rippleColor
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            width: 500,
            height: 500,
            x: -250,
            y: -250,
            opacity: 0
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// Animated arrow button
interface ArrowButtonProps {
  children: ReactNode
  className?: string
  arrowClassName?: string
  direction?: 'right' | 'left' | 'up' | 'down'
  href?: string
  onClick?: () => void
}

export function ArrowButton({
  children,
  className = '',
  arrowClassName = '',
  direction = 'right',
  href,
  onClick
}: ArrowButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  const arrowPaths: Record<string, string> = {
    right: 'M5 12h14M12 5l7 7-7 7',
    left: 'M19 12H5M12 19l-7-7 7-7',
    up: 'M12 19V5M5 12l7-7 7 7',
    down: 'M12 5v14M19 12l-7 7-7-7'
  }

  const arrowTranslate: Record<string, { x: number; y: number }> = {
    right: { x: 4, y: 0 },
    left: { x: -4, y: 0 },
    up: { x: 0, y: -4 },
    down: { x: 0, y: 4 }
  }

  const button = (
    <motion.span
      className={`inline-flex items-center gap-2 ${className}`}
      whileHover="hover"
      initial="rest"
    >
      <span>{children}</span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={arrowClassName}
        variants={{
          rest: { x: 0, y: 0 },
          hover: prefersReducedMotion
            ? {}
            : arrowTranslate[direction]
        }}
        transition={{ duration: 0.2 }}
      >
        <path d={arrowPaths[direction]} />
      </motion.svg>
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {button}
      </a>
    )
  }

  return (
    <button onClick={onClick}>
      {button}
    </button>
  )
}

// Glow button (combines magnetic + glow effects)
interface GlowButtonProps {
  children: ReactNode
  className?: string
  glowColor?: 'lime' | 'coral' | 'teal' | 'purple'
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export function GlowButton({
  children,
  className = '',
  glowColor = 'lime',
  onClick,
  href,
  disabled = false
}: GlowButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  const glowClasses: Record<string, string> = {
    lime: 'hover:shadow-glow-lime',
    coral: 'hover:shadow-glow-coral',
    teal: 'hover:shadow-glow-teal',
    purple: 'hover:shadow-glow-purple'
  }

  return (
    <MagneticButton
      className={`${className} ${!prefersReducedMotion ? glowClasses[glowColor] : ''} transition-shadow duration-300`}
      as={href ? 'a' : 'button'}
      href={href}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MagneticButton>
  )
}
