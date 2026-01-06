import { prisma } from '@/lib/prisma'
import { Calendar } from 'lucide-react'
import EventsPageClient from './EventsPageClient'

export const metadata = {
  title: 'Events | North Fork Pickleball',
  description: 'Join us for open play, tournaments, clinics, and social events',
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { status: 'published' },
    orderBy: { startDate: 'asc' },
  })

  const now = new Date()
  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= now)
  const pastEvents = events.filter((e) => new Date(e.startDate) < now).reverse()

  return (
    <EventsPageClient
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  )
}
