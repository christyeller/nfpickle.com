'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface UseParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal' | 'both'
  easing?: boolean
}

// Basic parallax effect
export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, direction = 'vertical', easing = true } = options
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let animationFrameId: number

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Calculate how far the element is from the center of the viewport
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const distanceFromCenter = elementCenter - viewportCenter

        // Calculate parallax offset
        const parallaxOffset = distanceFromCenter * speed

        if (direction === 'vertical' || direction === 'both') {
          setOffset((prev) => ({
            ...prev,
            y: easing ? prev.y + (parallaxOffset - prev.y) * 0.1 : parallaxOffset
          }))
        }

        if (direction === 'horizontal' || direction === 'both') {
          setOffset((prev) => ({
            ...prev,
            x: easing ? prev.x + (parallaxOffset - prev.x) * 0.1 : parallaxOffset
          }))
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [speed, direction, easing])

  const transform = direction === 'vertical'
    ? `translateY(${offset.y}px)`
    : direction === 'horizontal'
    ? `translateX(${offset.x}px)`
    : `translate(${offset.x}px, ${offset.y}px)`

  return { ref, offset, transform }
}

// Parallax with mouse movement
interface UseMouseParallaxOptions {
  strength?: number
  invert?: boolean
}

export function useMouseParallax(options: UseMouseParallaxOptions = {}) {
  const { strength = 20, invert = false } = options
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate mouse position relative to center (-0.5 to 0.5)
      const relativeX = (e.clientX / windowWidth) - 0.5
      const relativeY = (e.clientY / windowHeight) - 0.5

      const multiplier = invert ? -1 : 1

      setOffset({
        x: relativeX * strength * multiplier,
        y: relativeY * strength * multiplier
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [strength, invert])

  const transform = `translate(${offset.x}px, ${offset.y}px)`

  return { offset, transform }
}

// Multi-layer parallax (for complex scenes)
interface ParallaxLayer {
  speed: number
  direction?: 'vertical' | 'horizontal'
}

export function useMultiLayerParallax(layers: ParallaxLayer[]) {
  const [offsets, setOffsets] = useState<Array<{ x: number; y: number }>>(
    layers.map(() => ({ x: 0, y: 0 }))
  )

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      setOffsets(
        layers.map((layer) => {
          const offset = scrollY * layer.speed
          return {
            x: layer.direction === 'horizontal' ? offset : 0,
            y: layer.direction !== 'horizontal' ? offset : 0
          }
        })
      )
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [layers])

  return offsets.map((offset) => ({
    offset,
    transform: `translate(${offset.x}px, ${offset.y}px)`
  }))
}

// Smooth parallax with RAF and lerp
interface UseSmoothParallaxOptions {
  speed?: number
  smoothness?: number
}

export function useSmoothParallax(options: UseSmoothParallaxOptions = {}) {
  const { speed = 0.5, smoothness = 0.1 } = options
  const ref = useRef<HTMLElement>(null)
  const [currentOffset, setCurrentOffset] = useState(0)
  const targetOffset = useRef(0)
  const animationFrameId = useRef<number | null>(null)

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animate = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2

      targetOffset.current = (elementCenter - viewportCenter) * speed

      setCurrentOffset((prev) => {
        const newOffset = lerp(prev, targetOffset.current, smoothness)
        // Stop animating when very close to target
        if (Math.abs(newOffset - targetOffset.current) < 0.01) {
          return targetOffset.current
        }
        return newOffset
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [speed, smoothness, lerp])

  return {
    ref,
    offset: currentOffset,
    transform: `translateY(${currentOffset}px)`
  }
}

// Parallax for background images (using background-position)
export function useBackgroundParallax(speed: number = 0.3) {
  const ref = useRef<HTMLElement>(null)
  const [backgroundPosition, setBackgroundPosition] = useState('center 0px')

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = -rect.top * speed
      setBackgroundPosition(`center ${scrolled}px`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, backgroundPosition }
}

// Scale on scroll (zoom effect)
interface UseScaleOnScrollOptions {
  minScale?: number
  maxScale?: number
}

export function useScaleOnScroll(options: UseScaleOnScrollOptions = {}) {
  const { minScale = 1, maxScale = 1.2 } = options
  const ref = useRef<HTMLElement>(null)
  const [scale, setScale] = useState(minScale)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate progress (0 when at bottom, 1 when at top)
      const progress = 1 - (rect.top / windowHeight)
      const clampedProgress = Math.max(0, Math.min(1, progress))

      // Scale from minScale to maxScale
      const newScale = minScale + (maxScale - minScale) * clampedProgress
      setScale(newScale)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [minScale, maxScale])

  return { ref, scale, transform: `scale(${scale})` }
}

// Rotate on scroll
interface UseRotateOnScrollOptions {
  maxRotation?: number
  axis?: 'x' | 'y' | 'z'
}

export function useRotateOnScroll(options: UseRotateOnScrollOptions = {}) {
  const { maxRotation = 360, axis = 'z' } = options
  const ref = useRef<HTMLElement>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height)
      const clampedProgress = Math.max(0, Math.min(1, progress))

      setRotation(maxRotation * clampedProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [maxRotation])

  const transformMap = {
    x: `rotateX(${rotation}deg)`,
    y: `rotateY(${rotation}deg)`,
    z: `rotate(${rotation}deg)`
  }

  return { ref, rotation, transform: transformMap[axis] }
}
