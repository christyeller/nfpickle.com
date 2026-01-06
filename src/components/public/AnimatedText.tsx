'use client'

import { motion, Variants, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

// ===== Animated Heading =====
interface AnimatedHeadingProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  delay?: number
  animation?: 'words' | 'letters' | 'lines' | 'fade'
  gradient?: boolean
}

export function AnimatedHeading({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  animation = 'words',
  gradient = false
}: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[Tag]

  if (prefersReducedMotion || animation === 'fade') {
    return (
      <MotionTag
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={`${className} ${gradient ? 'text-gradient-animated' : ''}`}
      >
        {children}
      </MotionTag>
    )
  }

  if (animation === 'letters') {
    return (
      <MotionTag className={`${className} ${gradient ? 'text-gradient-animated' : ''}`}>
        <AnimatedLetters text={children} delay={delay} />
      </MotionTag>
    )
  }

  if (animation === 'lines') {
    const lines = children.split('\n')
    return (
      <MotionTag className={`${className} ${gradient ? 'text-gradient-animated' : ''}`}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: delay + i * 0.1,
                ease: [0.77, 0, 0.175, 1]
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    )
  }

  // Default: words animation
  return (
    <MotionTag className={`${className} ${gradient ? 'text-gradient-animated' : ''}`}>
      <AnimatedWords text={children} delay={delay} />
    </MotionTag>
  )
}

// ===== Animated Words =====
interface AnimatedWordsProps {
  text: string
  delay?: number
  className?: string
}

export function AnimatedWords({ text, delay = 0, className = '' }: AnimatedWordsProps) {
  const words = text.split(' ')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay
      }
    }
  }

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ===== Animated Letters =====
interface AnimatedLettersProps {
  text: string
  delay?: number
  className?: string
}

export function AnimatedLetters({ text, delay = 0, className = '' }: AnimatedLettersProps) {
  const letters = text.split('')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  }

  const child: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ===== Text Reveal (clip-path animation) =====
interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.77, 0, 0.175, 1]
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// ===== Typewriter Effect =====
interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  cursor?: boolean
}

export function Typewriter({
  text,
  className = '',
  delay = 0,
  speed = 0.05,
  cursor = true
}: TypewriterProps) {
  const letters = text.split('')

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.01,
            delay: delay + i * speed
          }}
        >
          {letter}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-current ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </span>
  )
}

// ===== Gradient Text Animation =====
interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
}

export function GradientText({
  children,
  className = '',
  colors = ['#BFFF00', '#00BFA5', '#7C4DFF', '#BFFF00']
}: GradientTextProps) {
  const gradientString = `linear-gradient(90deg, ${colors.join(', ')})`

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradientString,
        backgroundSize: '300% 100%'
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {children}
    </motion.span>
  )
}

// ===== Counter Animation =====
interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = ''
}: AnimatedCounterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Counter value={value} duration={duration} delay={delay} />
      </motion.span>
      {suffix}
    </motion.span>
  )
}

function Counter({
  value,
  duration,
  delay
}: {
  value: number
  duration: number
  delay: number
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <CounterValue value={value} duration={duration} delay={delay} />
      </motion.span>
    </motion.span>
  )
}

function CounterValue({
  value,
  duration,
  delay
}: {
  value: number
  duration: number
  delay: number
}) {
  const [displayValue, setDisplayValue] = React.useState(0)
  const [hasStarted, setHasStarted] = React.useState(false)

  React.useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateValue = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 4) // Ease out quart
      setDisplayValue(Math.floor(eased * value))

      if (progress < 1) {
        requestAnimationFrame(updateValue)
      }
    }

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateValue)
    }, delay * 1000)

    return () => clearTimeout(timeoutId)
  }, [value, duration, delay, hasStarted])

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  )
}

import React from 'react'

// ===== Split Text (for complex animations) =====
interface SplitTextProps {
  children: string
  className?: string
  wordClassName?: string
  letterClassName?: string
  type?: 'words' | 'letters' | 'both'
}

export function SplitText({
  children,
  className = '',
  wordClassName = '',
  letterClassName = '',
  type = 'words'
}: SplitTextProps) {
  const words = children.split(' ')

  if (type === 'letters') {
    return (
      <span className={className}>
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className={`inline-block ${letterClassName}`}
            style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </span>
    )
  }

  if (type === 'both') {
    return (
      <span className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={`inline-block mr-[0.25em] ${wordClassName}`}>
            {word.split('').map((letter, letterIndex) => (
              <span key={letterIndex} className={`inline-block ${letterClassName}`}>
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    )
  }

  // Default: words
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className={`inline-block mr-[0.25em] ${wordClassName}`}>
          {word}
        </span>
      ))}
    </span>
  )
}
