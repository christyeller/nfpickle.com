'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { staggerItem } from '@/lib/animations'
import { MotionTiltCard } from './TiltCard'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating?: number
  variant?: 'default' | 'featured' | 'compact'
  accentColor?: 'lime' | 'coral' | 'teal' | 'purple'
}

export default function TestimonialCard({
  quote,
  author,
  role,
  rating = 5,
  variant = 'default',
  accentColor = 'lime',
}: TestimonialCardProps) {
  const prefersReducedMotion = useReducedMotion()

  const accentColors = {
    lime: {
      star: 'text-lime fill-lime',
      avatar: 'from-lime to-teal',
      quote: 'text-lime/20',
      border: 'group-hover:border-lime/30',
    },
    coral: {
      star: 'text-coral fill-coral',
      avatar: 'from-coral to-sunset',
      quote: 'text-coral/20',
      border: 'group-hover:border-coral/30',
    },
    teal: {
      star: 'text-teal fill-teal',
      avatar: 'from-teal to-lime',
      quote: 'text-teal/20',
      border: 'group-hover:border-teal/30',
    },
    purple: {
      star: 'text-purple fill-purple',
      avatar: 'from-purple to-coral',
      quote: 'text-purple/20',
      border: 'group-hover:border-purple/30',
    },
  }

  const colors = accentColors[accentColor]

  if (variant === 'featured') {
    return (
      <FeaturedTestimonialCard
        quote={quote}
        author={author}
        role={role}
        rating={rating}
        accentColor={accentColor}
      />
    )
  }

  if (variant === 'compact') {
    return (
      <CompactTestimonialCard
        quote={quote}
        author={author}
        role={role}
        accentColor={accentColor}
      />
    )
  }

  const CardWrapper = prefersReducedMotion ? motion.div : MotionTiltCard

  return (
    <motion.div variants={staggerItem}>
      <CardWrapper
        className={`group relative h-full p-8 rounded-2xl bg-white border border-gray-100
          shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 ${colors.border}`}
        maxTilt={6}
        scale={1.01}
      >
        {/* Quote icon */}
        <div className="absolute top-6 right-6">
          <Quote className={`w-12 h-12 ${colors.quote}`} />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 400 }}
            >
              <Star
                className={`w-5 h-5 ${i < rating ? colors.star : 'text-gray-200 fill-gray-200'}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <motion.div
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors.avatar}
              flex items-center justify-center text-white font-bold text-xl shadow-lg`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {author.charAt(0)}
          </motion.div>
          <div>
            <p className="font-display font-semibold text-charcoal-dark">{author}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>

        {/* Decorative gradient line at bottom */}
        <div
          className={`absolute bottom-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r ${colors.avatar}
            opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </CardWrapper>
    </motion.div>
  )
}

function FeaturedTestimonialCard({
  quote,
  author,
  role,
  rating = 5,
  accentColor = 'lime',
}: TestimonialCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-lime/20 via-teal/20 to-purple/20
        rounded-3xl blur-3xl opacity-50" />

      <motion.div
        className="relative p-10 rounded-3xl bg-[#1A5F7A] border border-white/10 overflow-hidden"
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple/5 rounded-full blur-3xl" />

        {/* Large quote mark */}
        <div className="absolute top-8 left-8">
          <Quote className="w-20 h-20 text-lime/10" />
        </div>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${i < rating ? 'text-lime fill-lime' : 'text-gray-600'}`}
              />
            ))}
          </div>

          {/* Quote */}
          <p className="text-white text-2xl leading-relaxed mb-8 font-display">
            &ldquo;{quote}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime to-teal
              flex items-center justify-center text-court-dark font-bold text-2xl">
              {author.charAt(0)}
            </div>
            <div>
              <p className="font-display font-bold text-white text-lg">{author}</p>
              <p className="text-white/60">{role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function CompactTestimonialCard({
  quote,
  author,
  role,
  accentColor = 'lime',
}: Omit<TestimonialCardProps, 'rating' | 'variant'>) {
  const accentColors = {
    lime: 'from-lime to-teal',
    coral: 'from-coral to-sunset',
    teal: 'from-teal to-lime',
    purple: 'from-purple to-coral',
  }

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100">
      <div
        className={`w-12 h-12 rounded-full bg-gradient-to-br ${accentColors[accentColor]}
          flex items-center justify-center text-white font-bold flex-shrink-0`}
      >
        {author.charAt(0)}
      </div>
      <div>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-2">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium text-charcoal-dark">{author}</span> • {role}
        </p>
      </div>
    </div>
  )
}

// Testimonial carousel card for use in sliders
export function TestimonialSlideCard({
  quote,
  author,
  role,
  rating = 5,
}: Omit<TestimonialCardProps, 'variant' | 'accentColor'>) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-lime fill-lime' : 'text-gray-600'}`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/90 leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime to-teal
          flex items-center justify-center text-court-dark font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-white text-sm">{author}</p>
          <p className="text-xs text-white/60">{role}</p>
        </div>
      </div>
    </div>
  )
}
