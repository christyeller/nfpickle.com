import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Hero from '@/components/public/Hero'
import HomePageSections from '@/components/public/HomePageSections'

export const metadata: Metadata = {
  title: 'North Fork Pickleball Club | Hotchkiss Pickleball Courts & Community',
  description: 'North Fork Pickleball Club is bringing dedicated pickleball courts to Hotchkiss, Colorado. Join our growing community of players in the North Fork Valley - Paonia, Hotchkiss, and Crawford. Open play, events, and more!',
  alternates: {
    canonical: 'https://nfpickle.com',
  },
}

export default async function HomePage() {
  const [upcomingEvents, recentPosts, membersCount] = await Promise.all([
    prisma.event.findMany({
      where: {
        status: 'published',
        startDate: { gte: new Date() },
      },
      orderBy: { startDate: 'asc' },
      take: 3,
    }),
    prisma.post.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: {
        Media: true,
      },
    }),
    prisma.member.count(),
  ])

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* All other sections - client-side for animations */}
      <HomePageSections
        upcomingEvents={upcomingEvents}
        recentPosts={recentPosts}
        membersCount={membersCount}
      />
    </>
  )
}
