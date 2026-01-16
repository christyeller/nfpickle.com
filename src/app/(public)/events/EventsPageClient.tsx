'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, CalendarDays, Clock } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import SectionHeader from '@/components/public/SectionHeader'
import EventCard from '@/components/public/EventCard'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { Event } from '@prisma/client'

interface EventsPageClientProps {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export default function EventsPageClient({
  upcomingEvents,
  pastEvents,
}: EventsPageClientProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Open play, tournaments, clinics, and more"
        badge="Join the Fun"
        badgeIcon={Calendar}
        accentColor="coral"
      />

      {/* Upcoming Events */}
      <section className="section bg-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-lime/10 via-teal/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Upcoming Events"
            subtitle="Mark your calendar and join us"
            badge="Coming Up"
            badgeIcon={CalendarDays}
            badgeColor="coral"
            highlightWord="Events"
            highlightColor="coral"
          />

          {upcomingEvents.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-6 max-w-4xl mx-auto"
            >
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant={index === 0 ? 'featured' : 'default'}
                />
              ))}
            </motion.div>
          ) : (
            <ScrollReveal className="text-center py-16 px-8 rounded-3xl bg-gray-50 border border-gray-100 max-w-2xl mx-auto">
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-6"
              >
                <Calendar className="w-10 h-10 text-coral" />
              </motion.div>
              <h3 className="text-2xl font-display font-bold text-charcoal-dark mb-2">
                No Upcoming Events
              </h3>
              <p className="text-gray-500 mb-6">
                Check back soon for new events! Join our mailing list to stay updated.
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="section bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="container-custom relative z-10">
            <SectionHeader
              title="Past Events"
              subtitle="See what you missed"
              badge="Event History"
              badgeIcon={Clock}
              badgeColor="purple"
              highlightWord="Events"
              highlightColor="purple"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6 max-w-4xl mx-auto"
            >
              {pastEvents.slice(0, 5).map((event) => (
                <motion.div
                  key={event.id}
                  variants={staggerItem}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  <EventCard event={event} variant="compact" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}
