import { prisma } from '@/lib/prisma'
import BoardMeetingMinutesPageClient from './BoardMeetingMinutesPageClient'

export const metadata = {
  title: 'Board Meeting Minutes',
  description: 'Meeting minutes from the North Fork Pickleball Club Board of Directors.',
  keywords: ['North Fork Pickleball board meeting minutes', 'NFPC board minutes', 'North Fork Pickleball Club governance'],
  alternates: {
    canonical: 'https://nfpickle.com/board-meeting-minutes',
  },
  openGraph: {
    title: 'Board Meeting Minutes | North Fork Pickleball Club',
    description: 'Meeting minutes from the North Fork Pickleball Club Board of Directors.',
    url: 'https://nfpickle.com/board-meeting-minutes',
  },
}

export default async function BoardMeetingMinutesPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published', category: 'Board Meeting Minutes' },
    orderBy: { publishedAt: 'desc' },
    include: {
      Media: true,
    },
  })

  return <BoardMeetingMinutesPageClient posts={posts} />
}
