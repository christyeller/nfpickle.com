import { prisma } from '@/lib/prisma'
import NewsPageClient from './NewsPageClient'

export const metadata = {
  title: 'News & Announcements',
  description: 'Stay up to date with North Fork Pickleball Club news, announcements, and updates about pickleball in Hotchkiss and the North Fork Valley of Colorado.',
  keywords: ['North Fork Pickleball news', 'Hotchkiss pickleball updates', 'pickleball announcements Colorado', 'North Fork Valley pickleball news'],
  alternates: {
    canonical: 'https://nfpickle.com/news',
  },
  openGraph: {
    title: 'News & Announcements | North Fork Pickleball Club',
    description: 'Latest news and updates from North Fork Pickleball Club in Hotchkiss, Colorado.',
    url: 'https://nfpickle.com/news',
  },
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
