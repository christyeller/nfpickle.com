'use client'

import { motion, Variants, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInBounce,
  blurIn,
  rotateIn
} from '@/lib/animations'

type AnimationType =
  | 'fade'
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scale'
  | 'scaleBounce'
  | 'blur'
  | 'rotate'

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number | 'some' | 'all'
  as?: 'div' | 'section' | 'article' | 'span' | 'p' | 'li' | 'ul'
  animateOnMount?: boolean
}

const animationVariants: Record<AnimationType, Variants> = {
  fade: fadeIn,
  fadeUp: fadeInUp,
  fadeDown: fadeInDown,
  fadeLeft: fadeInLeft,
  fadeRight: fadeInRight,
  scale: scaleIn,
  scaleBounce: scaleInBounce,
  blur: blurIn,
  rotate: rotateIn
}

export function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration,
  className = '',
  once = true,
  amount = 0.2,
  as = 'div',
  animateOnMount = false
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  // Simplified variants for reduced motion
  const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } }
  }

  const variants = prefersReducedMotion
    ? reducedMotionVariants
    : animationVariants[animation]

  // Custom transition with delay
  const transition = {
    delay,
    ...(duration && { duration })
  }

  // If animateOnMount, use animate instead of whileInView
  if (animateOnMount) {
    return (
      <MotionComponent
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={transition}
        className={className}
      >
        {children}
      </MotionComponent>
    )
  }

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

// Staggered container for multiple items
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
  once?: boolean
  amount?: number | 'some' | 'all'
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0.1,
  once = true,
  amount = 0.2
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : delayChildren
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item to be used inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
}

export function StaggerItem({
  children,
  className = '',
  animation = 'fadeUp'
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } }
  }

  const variants = prefersReducedMotion
    ? reducedMotionVariants
    : animationVariants[animation]

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// Simple fade wrapper for sections
interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeInSection({
  children,
  className = '',
  delay = 0
}: FadeInSectionProps) {
  return (
    <ScrollReveal animation="fade" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

// Slide up on scroll - most common animation
interface SlideUpProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SlideUp({
  children,
  className = '',
  delay = 0
}: SlideUpProps) {
  return (
    <ScrollReveal animation="fadeUp" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

// Scale in animation
interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
  bounce?: boolean
}

export function ScaleIn({
  children,
  className = '',
  delay = 0,
  bounce = false
}: ScaleInProps) {
  return (
    <ScrollReveal
      animation={bounce ? 'scaleBounce' : 'scale'}
      delay={delay}
      className={className}
    >
      {children}
    </ScrollReveal>
  )
}
