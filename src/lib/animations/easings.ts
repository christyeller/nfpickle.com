// ===== Custom Easing Functions =====
// These can be used with Framer Motion's transition.ease property

// Smooth, natural feeling easing
export const smooth = [0.25, 0.1, 0.25, 1] as const

// Expo out - starts fast, ends very slow (great for entrances)
export const expoOut = [0.19, 1, 0.22, 1] as const

// Expo in-out - smooth acceleration and deceleration
export const expoInOut = [0.87, 0, 0.13, 1] as const

// Bounce - overshoots and settles (playful, energetic)
export const bounceIn = [0.68, -0.55, 0.265, 1.55] as const

// Elastic - springy with overshoot
export const elastic = [0.68, -0.6, 0.32, 1.6] as const

// Quart out - smooth deceleration
export const quartOut = [0.25, 1, 0.5, 1] as const

// Quint out - even smoother deceleration
export const quintOut = [0.22, 1, 0.36, 1] as const

// Circ out - dramatic slowdown at the end
export const circOut = [0, 0.55, 0.45, 1] as const

// Back out - overshoots slightly before settling
export const backOut = [0.34, 1.56, 0.64, 1] as const

// Back in-out - slight overshoot on both ends
export const backInOut = [0.68, -0.6, 0.32, 1.6] as const

// Sine out - gentle, natural
export const sineOut = [0.39, 0.575, 0.565, 1] as const

// Custom for text reveals
export const textReveal = [0.77, 0, 0.175, 1] as const

// Spring configurations for Framer Motion
export const springs = {
  // Snappy, responsive
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30
  },
  // Bouncy, playful
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20
  },
  // Soft, gentle
  soft: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25
  },
  // Very bouncy (for attention)
  veryBouncy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 15
  },
  // Smooth, no bounce
  smooth: {
    type: 'spring' as const,
    stiffness: 150,
    damping: 20
  },
  // Slow and dramatic
  dramatic: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15
  }
}

// Duration presets
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  medium: 0.5,
  slow: 0.8,
  verySlow: 1.2
}

// Delay presets
export const delays = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  veryLong: 0.6
}

// Stagger presets
export const staggers = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  verySlow: 0.2
}

// Transition presets
export const transitions = {
  // Quick, snappy transition
  snappy: {
    duration: 0.2,
    ease: smooth
  },
  // Smooth, flowing transition
  smooth: {
    duration: 0.4,
    ease: smooth
  },
  // Dramatic entrance
  entrance: {
    duration: 0.6,
    ease: expoOut
  },
  // Quick exit
  exit: {
    duration: 0.3,
    ease: smooth
  },
  // Bouncy entrance
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20
  },
  // Slow reveal
  reveal: {
    duration: 0.8,
    ease: textReveal
  }
}
