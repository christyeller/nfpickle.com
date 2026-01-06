import { prisma } from '@/lib/prisma'
import Hero from '@/components/public/Hero'
import HomePageSections from '@/components/public/HomePageSections'

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
