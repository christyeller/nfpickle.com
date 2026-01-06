'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement | null>
  isInView: boolean
  hasAnimated: boolean
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsInView(true)
              setHasAnimated(true)
            }, delay)
          } else {
            setIsInView(true)
            setHasAnimated(true)
          }

          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, delay])

  return { ref, isInView, hasAnimated }
}

// Hook for staggered animations on multiple elements
interface UseStaggerAnimationOptions {
  threshold?: number
  rootMargin?: string
  staggerDelay?: number
}

export function useStaggerAnimation(
  itemCount: number,
  options: UseStaggerAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', staggerDelay = 100 } = options

  const containerRef = useRef<HTMLElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  )

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the visibility of each item
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newState = [...prev]
                newState[i] = true
                return newState
              })
            }, i * staggerDelay)
          }
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [itemCount, threshold, rootMargin, staggerDelay])

  return { containerRef, visibleItems }
}

// Hook for scroll progress (0 to 1)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(Math.min(Math.max(scrollProgress, 0), 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

// Hook for element scroll progress (when element enters and exits viewport)
export function useElementScrollProgress() {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate progress: 0 when element enters bottom, 1 when it exits top
      const elementTop = rect.top
      const elementHeight = rect.height

      // Start tracking when element enters viewport from bottom
      // End tracking when element exits viewport from top
      const startOffset = windowHeight // Element starts at bottom of viewport
      const endOffset = -elementHeight // Element ends when fully above viewport

      const totalDistance = startOffset - endOffset
      const currentPosition = startOffset - elementTop

      const elementProgress = currentPosition / totalDistance
      setProgress(Math.min(Math.max(elementProgress, 0), 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { ref, progress }
}

// Hook for detecting scroll direction
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY

    if (scrollY > lastScrollY) {
      setScrollDirection('down')
    } else if (scrollY < lastScrollY) {
      setScrollDirection('up')
    }

    setLastScrollY(scrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [updateScrollDirection])

  return scrollDirection
}

// Hook for scroll velocity
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const scrollY = window.scrollY
      const timeDelta = now - lastTime.current

      if (timeDelta > 0) {
        const scrollDelta = scrollY - lastScrollY.current
        const newVelocity = scrollDelta / timeDelta
        setVelocity(newVelocity)
      }

      lastScrollY.current = scrollY
      lastTime.current = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return velocity
}
