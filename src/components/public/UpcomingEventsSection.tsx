'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import EventCard from './EventCard'
import { ScrollReveal } from './ScrollReveal'
import { staggerContainer } from '@/lib/animations'
import type { Event, Media } from '@prisma/client'

type EventWithMedia = Event & { Media?: Media | null }

interface UpcomingEventsSectionProps {
  events: EventWithMedia[]
}

export default function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  if (events.length === 0) return null

  const gridCols =
    events.length === 1
      ? 'max-w-md mx-auto'
      : events.length === 2
        ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="section bg-[#FDF9F0] relative overflow-hidden" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 text-coral text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Coming Up
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-dark">
            Upcoming <span className="text-coral">Events</span>
          </h2>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={`grid gap-6 ${gridCols}`}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="homepage"
            />
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-court font-semibold hover:text-court-dark transition-colors"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
