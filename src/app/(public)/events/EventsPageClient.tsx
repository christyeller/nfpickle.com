'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, CalendarDays, Clock } from 'lucide-react'
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
      {/* Hero Section */}
      <section
        className="relative pt-28 pb-[300px] overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/tournament.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/10 border-white/30 text-white mb-6"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Join the Fun</span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-white">Events</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-white max-w-xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Open play, tournaments, clinics, and more
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
              fill="#FCF9F0"
            />
          </svg>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-cream relative overflow-hidden -mt-px pt-[25px]">
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
