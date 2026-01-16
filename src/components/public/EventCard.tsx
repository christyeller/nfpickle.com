'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Clock, ArrowRight, Users } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import { eventTypeLabels, type EventType } from '@/types'
import type { Event } from '@prisma/client'
import { staggerItem } from '@/lib/animations'

interface EventCardProps {
  event: Event
  variant?: 'default' | 'featured' | 'compact'
}

const eventTypeColors: Record<string, { bg: string; text: string; border: string }> = {
  'open-play': { bg: 'bg-lime/10', text: 'text-lime-700', border: 'border-lime/30' },
  'tournament': { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/30' },
  'clinic': { bg: 'bg-teal/10', text: 'text-teal', border: 'border-teal/30' },
  'social': { bg: 'bg-purple/10', text: 'text-purple', border: 'border-purple/30' },
  'meeting': { bg: 'bg-sunset/10', text: 'text-sunset-dark', border: 'border-sunset/30' },
}

export default function EventCard({ event, variant = 'default' }: EventCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const startDate = new Date(event.startDate)
  const month = startDate.toLocaleDateString('en-US', { month: 'short' })
  const day = startDate.getDate()
  const dayOfWeek = startDate.toLocaleDateString('en-US', { weekday: 'short' })

  const colors = eventTypeColors[event.eventType] || eventTypeColors['open-play']

  if (variant === 'featured') {
    return <FeaturedEventCard event={event} />
  }

  if (variant === 'compact') {
    return <CompactEventCard event={event} />
  }

  return (
    <motion.div variants={staggerItem}>
      <Link href={`/events/${event.slug}`} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-cream border border-gray-100
            shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300"
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex">
            {/* Date Badge */}
            <motion.div
              className="w-24 bg-gradient-to-b from-court to-court-dark text-white
                flex flex-col items-center justify-center p-4 relative overflow-hidden"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-lime/10 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal/10 rounded-full" />

              <span className="text-xs font-medium uppercase text-lime tracking-wider">
                {dayOfWeek}
              </span>
              <span className="text-4xl font-display font-bold">{day}</span>
              <span className="text-sm font-medium uppercase text-white/80">{month}</span>
            </motion.div>

            {/* Content */}
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Event type badge */}
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-medium
                      rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    {eventTypeLabels[event.eventType as EventType] || event.eventType}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-display font-semibold mt-2
                    group-hover:text-court transition-colors">
                    {event.title}
                  </h3>
                </div>

                {/* Arrow */}
                <motion.div
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center
                    group-hover:bg-lime group-hover:text-court-dark transition-colors"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Meta info */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal" />
                  <span>{formatTime(event.startDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-coral" />
                  <span>{event.locationName}</span>
                </div>
              </div>

              {/* Cost */}
              {event.cost && event.cost > 0 && (
                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full
                  bg-lime/10 text-lime-700 text-sm font-medium">
                  ${event.cost.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lime via-teal to-purple
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

function FeaturedEventCard({ event }: { event: Event }) {
  const prefersReducedMotion = useReducedMotion()
  const startDate = new Date(event.startDate)
  const dateString = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-court via-court-light to-purple
          p-1 shadow-elevation-3"
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative rounded-[22px] bg-charcoal-dark p-8 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple/10 rounded-full blur-3xl" />

          {/* Featured badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-lime/20 border border-lime/30 mb-6">
            <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
            <span className="text-sm font-medium text-lime">Featured Event</span>
          </div>

          {/* Content */}
          <h3 className="text-3xl font-display font-bold text-white mb-4">
            {event.title}
          </h3>

          <p className="text-white/70 text-lg mb-6 line-clamp-2">
            {event.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-lime" />
              <span>{dateString} at {formatTime(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-coral" />
              <span>{event.locationName}</span>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl
              bg-lime text-court-dark font-bold"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          >
            <span>View Details</span>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

function CompactEventCard({ event }: { event: Event }) {
  const startDate = new Date(event.startDate)
  const day = startDate.getDate()
  const month = startDate.toLocaleDateString('en-US', { month: 'short' })

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
        {/* Date */}
        <div className="w-14 h-14 rounded-xl bg-court text-white flex flex-col items-center justify-center">
          <span className="text-lg font-bold">{day}</span>
          <span className="text-xs uppercase">{month}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-charcoal-dark truncate group-hover:text-court transition-colors">
            {event.title}
          </h4>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span>{formatTime(event.startDate)}</span>
            <span>•</span>
            <span className="truncate">{event.locationName}</span>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-court transition-colors" />
      </div>
    </Link>
  )
}
