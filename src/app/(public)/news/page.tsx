import { prisma } from '@/lib/prisma'
import NewsPageClient from './NewsPageClient'

export const metadata = {
  title: 'News | North Fork Pickleball',
  description: 'Stay up to date with club announcements and pickleball news',
}

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    include: {
      Media: true,
    },
  })

  return <NewsPageClient posts={posts} />
}
