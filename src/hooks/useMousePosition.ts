'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface UseMousePositionOptions {
  includeTouch?: boolean
  fps?: number
}

// Global mouse position hook
export function useMousePosition(options: UseMousePositionOptions = {}) {
  const { includeTouch = true, fps = 60 } = options
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const lastUpdate = useRef(0)
  const frameTime = 1000 / fps

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate.current >= frameTime) {
        setPosition({ x: e.clientX, y: e.clientY })
        lastUpdate.current = now
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!includeTouch) return
      const now = Date.now()
      if (now - lastUpdate.current >= frameTime) {
        const touch = e.touches[0]
        if (touch) {
          setPosition({ x: touch.clientX, y: touch.clientY })
          lastUpdate.current = now
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    if (includeTouch) {
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (includeTouch) {
        window.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [includeTouch, frameTime])

  return position
}

// Mouse position relative to an element
interface RelativeMousePosition extends MousePosition {
  elementX: number // -1 to 1 from center
  elementY: number // -1 to 1 from center
  isInside: boolean
}

export function useRelativeMousePosition() {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState<RelativeMousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    isInside: false
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const elementX = (x / rect.width) * 2 - 1 // -1 to 1
      const elementY = (y / rect.height) * 2 - 1 // -1 to 1

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      setPosition({
        x,
        y,
        elementX: Math.max(-1, Math.min(1, elementX)),
        elementY: Math.max(-1, Math.min(1, elementY)),
        isInside
      })
    }

    const handleMouseLeave = () => {
      setPosition((prev) => ({ ...prev, isInside: false }))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { ref, ...position }
}

// Hook for magnetic effect on buttons/elements
interface MagneticOptions {
  strength?: number
  radius?: number
}

export function useMagneticEffect(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options
  const ref = useRef<HTMLElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < radius) {
        const pullStrength = (1 - distance / radius) * strength
        setTransform({
          x: distanceX * pullStrength,
          y: distanceY * pullStrength
        })
      } else {
        setTransform({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, radius])

  return { ref, transform }
}

// Hook for tilt effect
interface TiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

export function useTiltEffect(options: TiltOptions = {}) {
  const { maxTilt = 15, perspective = 1000, scale = 1.02, speed = 400 } = options
  const ref = useRef<HTMLElement>(null)
  const [style, setStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
    transition: `transform ${speed}ms cubic-bezier(0.19, 1, 0.22, 1)`
  })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: `transform 100ms cubic-bezier(0.19, 1, 0.22, 1)`
    })
  }, [maxTilt, perspective, scale])

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      transition: `transform ${speed}ms cubic-bezier(0.19, 1, 0.22, 1)`
    })
  }, [perspective, speed])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return { ref, style }
}

// Hook for spotlight/glow following cursor
interface SpotlightOptions {
  size?: number
  opacity?: number
  color?: string
}

export function useSpotlight(options: SpotlightOptions = {}) {
  const { size = 400, opacity = 0.15, color = '191, 255, 0' } = options
  const ref = useRef<HTMLElement>(null)
  const [background, setBackground] = useState('')

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setBackground(
        `radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${color}, ${opacity}), transparent)`
      )
    }

    const handleMouseLeave = () => {
      setBackground('')
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [size, opacity, color])

  return { ref, background }
}
