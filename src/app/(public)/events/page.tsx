import { prisma } from '@/lib/prisma'
import { Calendar } from 'lucide-react'
import { getNextOccurrence } from '@/lib/utils'
import EventsPageClient from './EventsPageClient'

export const metadata = {
  title: 'Events | North Fork Pickleball',
  description: 'Join us for open play, tournaments, clinics, and social events',
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { status: 'published' },
    include: { Media: true },
  })

  const now = new Date()

  // Recurring events are stored as a single date; roll them forward to
  // their next occurrence so they keep showing as upcoming.
  const eventsWithOccurrence = events.map((event) => {
    const { startDate, endDate } = getNextOccurrence(
      event.startDate,
      event.endDate,
      event.isRecurring,
      event.recurringPattern,
      now
    )
    return { ...event, startDate, endDate }
  })

  const upcomingEvents = eventsWithOccurrence
    .filter((e) => e.startDate >= now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  const pastEvents = eventsWithOccurrence
    .filter((e) => e.startDate < now)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())

  return (
    <EventsPageClient
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  )
}
