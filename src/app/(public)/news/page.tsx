import { prisma } from '@/lib/prisma'
import PostCard from '@/components/public/PostCard'
import SectionHeader from '@/components/public/SectionHeader'

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

  return (
    <>
      {/* Hero */}
      <section className="pb-16 bg-gradient-to-br from-primary-dark via-primary to-dark-blue">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News</h1>
          <p className="text-xl text-white/90">
            Club updates, announcements, and pickleball news
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="section bg-cream">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No news posts yet</p>
              <p className="mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
