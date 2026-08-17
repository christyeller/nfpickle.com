import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getNextOccurrence } from '@/lib/utils'
import Hero from '@/components/public/Hero'
import EmailOptInForm from '@/components/public/EmailOptInForm'
import UpcomingEventsSection from '@/components/public/UpcomingEventsSection'
import HomePageSections from '@/components/public/HomePageSections'

export const metadata: Metadata = {
  title: 'North Fork Pickleball Club | Hotchkiss Pickleball Courts & Community',
  description: 'North Fork Pickleball Club is bringing dedicated pickleball courts to Hotchkiss, Colorado. Join our growing community of players in the North Fork Valley - Paonia, Hotchkiss, and Crawford. Open play, events, and more!',
  alternates: {
    canonical: 'https://nfpickle.com',
  },
}

export default async function HomePage() {
  const now = new Date()

  const [candidateEvents, recentPosts, membersCount] = await Promise.all([
    prisma.event.findMany({
      where: {
        status: 'published',
        OR: [{ startDate: { gte: now } }, { isRecurring: true }],
      },
      include: { Media: true },
    }),
    prisma.post.findMany({
      where: { status: 'published', category: 'News' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: {
        Media: true,
      },
    }),
    prisma.member.count(),
  ])

  const upcomingEvents = candidateEvents
    .map((event) => {
      const { startDate, endDate } = getNextOccurrence(
        event.startDate,
        event.endDate,
        event.isRecurring,
        event.recurringPattern,
        now
      )
      return { ...event, startDate, endDate }
    })
    .filter((e) => e.startDate >= now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Email Opt-In Strip */}
      <EmailOptInForm variant="strip" />

      {/* Upcoming Events */}
      <UpcomingEventsSection events={upcomingEvents} />

      {/* All other sections - client-side for animations */}
      <HomePageSections
        upcomingEvents={upcomingEvents}
        recentPosts={recentPosts}
        membersCount={membersCount}
      />
    </>
  )
}
