'use client'

import { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

// Pickleball paddle and ball - for "Fastest Growing Sport"
export function PickleballPaddleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Paddle face */}
      <ellipse cx="10" cy="9" rx="7" ry="8" />
      {/* Paddle holes */}
      <circle cx="8" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="10" r="1" fill="currentColor" stroke="none" />
      {/* Handle */}
      <path d="M10 17 L10 22" strokeWidth="3" />
      {/* Ball */}
      <circle cx="19" cy="17" r="3.5" />
      <circle cx="18" cy="16" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="16" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="18" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Multiple people/generations playing - for "All Ages"
export function AllAgesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Adult */}
      <circle cx="8" cy="5" r="2.5" />
      <path d="M4 21v-4a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v4" />
      {/* Child */}
      <circle cx="17" cy="7" r="2" />
      <path d="M14 21v-3a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v3" />
      {/* Connecting arc (togetherness) */}
      <path d="M11 10 Q13 8 14 10" strokeDasharray="2 1" />
    </svg>
  )
}

// Fun paddle swing with sparkle - for "Fun & Affordable"
export function FunPaddleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Paddle (angled for action) */}
      <ellipse cx="12" cy="10" rx="6" ry="7" transform="rotate(-20 12 10)" />
      {/* Paddle holes */}
      <circle cx="10" cy="8" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="13" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="11" cy="11" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r="0.8" fill="currentColor" stroke="none" />
      {/* Handle */}
      <path d="M9 16 L6 21" strokeWidth="2.5" />
      {/* Sparkles */}
      <path d="M19 3 L19 6 M17.5 4.5 L20.5 4.5" />
      <path d="M21 8 L21 10 M20 9 L22 9" />
      {/* Motion lines */}
      <path d="M17 12 L20 11" strokeWidth="1" />
      <path d="M18 14 L20 14" strokeWidth="1" />
    </svg>
  )
}

// Brain with happy face - for "Improves Mental Health"
export function MentalHealthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Brain outline */}
      <path d="M12 4C8 4 5 7 5 10c0 2 1 3.5 2.5 4.5C6 15.5 5 17 5 19c0 1.5 2 2 4 2 1 0 2-.5 3-1 1 .5 2 1 3 1 2 0 4-.5 4-2 0-2-1-3.5-2.5-4.5C18 13.5 19 12 19 10c0-3-3-6-7-6z" />
      {/* Brain folds */}
      <path d="M9 8 Q12 6 15 8" />
      <path d="M8 12 Q12 10 16 12" />
      {/* Smile */}
      <path d="M9 15 Q12 17 15 15" />
      {/* Sparkle/positivity */}
      <circle cx="10" cy="12" r="0.5" fill="currentColor" />
      <circle cx="14" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}

// People connected in circle - for "Builds Community"
export function CommunityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Center pickleball */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="11" cy="11" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="13" cy="11" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="0.5" fill="currentColor" stroke="none" />
      {/* Person 1 (top) */}
      <circle cx="12" cy="3" r="1.5" />
      <path d="M12 5 L12 7" />
      {/* Person 2 (right) */}
      <circle cx="20" cy="9" r="1.5" />
      <path d="M18.5 10 L16 11" />
      {/* Person 3 (bottom-right) */}
      <circle cx="18" cy="18" r="1.5" />
      <path d="M16.5 17 L14.5 14.5" />
      {/* Person 4 (bottom-left) */}
      <circle cx="6" cy="18" r="1.5" />
      <path d="M7.5 17 L9.5 14.5" />
      {/* Person 5 (left) */}
      <circle cx="4" cy="9" r="1.5" />
      <path d="M5.5 10 L8 11" />
    </svg>
  )
}

// Heart with pulse/activity line - for "Improves Physical Health"
export function PhysicalHealthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Heart */}
      <path d="M12 6C10 3 5 3 4 7c0 4 8 11 8 11s8-7 8-11c-1-4-6-4-8-1z" />
      {/* Pulse/heartbeat line */}
      <path d="M4 12 L8 12 L9.5 9 L11 14 L12.5 10 L14 12 L20 12" strokeWidth="1.5" />
      {/* Small pickleball */}
      <circle cx="18" cy="6" r="2" />
      <circle cx="17.5" cy="5.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="5.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="6.5" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Icon map for easy access
export const pickleballIconMap = {
  PickleballPaddle: PickleballPaddleIcon,
  AllAges: AllAgesIcon,
  FunPaddle: FunPaddleIcon,
  MentalHealth: MentalHealthIcon,
  Community: CommunityIcon,
  PhysicalHealth: PhysicalHealthIcon,
} as const

export type PickleballIconName = keyof typeof pickleballIconMap
