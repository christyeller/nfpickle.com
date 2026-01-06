'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import VanillaTilt from 'vanilla-tilt'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glare?: boolean
  maxGlare?: number
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
  reverse?: boolean
  reset?: boolean
  glarePrerender?: boolean
}

export function TiltCard({
  children,
  className = '',
  glare = true,
  maxGlare = 0.2,
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  reverse = false,
  reset = true,
  glarePrerender = false
}: TiltCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!tiltRef.current || prefersReducedMotion) return

    VanillaTilt.init(tiltRef.current, {
      max: maxTilt,
      perspective,
      scale,
      speed,
      glare,
      'max-glare': maxGlare,
      reverse,
      reset,
      'glare-prerender': glarePrerender
    })

    const currentRef = tiltRef.current

    return () => {
      if (currentRef && 'vanillaTilt' in currentRef) {
        (currentRef as HTMLDivElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy()
      }
    }
  }, [glare, maxGlare, maxTilt, perspective, scale, speed, reverse, reset, glarePrerender, prefersReducedMotion])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={tiltRef}
      className={`transform-gpu ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

// Framer Motion version for more control
interface MotionTiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
  scale?: number
}

export function MotionTiltCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02
}: MotionTiltCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const newRotateX = ((y - centerY) / centerY) * -maxTilt
    const newRotateY = ((x - centerX) / centerX) * maxTilt

    setRotateX(newRotateX)
    setRotateY(newRotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? scale : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  )
}

// 3D Card with depth layers
interface Card3DProps {
  children: ReactNode
  className?: string
  depth?: number
}

export function Card3D({ children, className = '', depth = 50 }: Card3DProps) {
  const prefersReducedMotion = useReducedMotion()
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setTransform({
      rotateX: ((y - centerY) / centerY) * -10,
      rotateY: ((x - centerX) / centerX) * 10
    })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Background shadow layer */}
      <div
        className="absolute inset-0 bg-black/20 rounded-2xl blur-xl"
        style={{
          transform: `translateZ(-${depth}px) scale(0.95)`,
          transformStyle: 'preserve-3d'
        }}
      />
      {/* Main content */}
      <div
        style={{
          transform: 'translateZ(0)',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
