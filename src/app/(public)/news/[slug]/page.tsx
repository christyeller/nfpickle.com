import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import PostContent from './PostContent'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | North Fork Pickleball`,
    description: post.excerpt || post.content.substring(0, 160),
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      featuredImage: true,
    },
  })

  if (!post || post.status !== 'published') {
    notFound()
  }

  const featuredImageUrl = post.featuredImage?.secureUrl || post.featuredImage?.url

  return (
    <>
      {/* Hero with featured image background */}
      <section
        className="relative pb-16 min-h-[400px] flex items-center justify-center"
        style={featuredImageUrl ? {
          backgroundImage: `url(${featuredImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        {/* Dark overlay for readability */}
        <div className={`absolute inset-0 ${featuredImageUrl ? 'bg-gradient-to-t from-black/80 via-black/50 to-black/30' : 'bg-gradient-to-br from-primary-dark via-primary to-dark-blue'}`} />

        <div className="container-custom relative z-10 text-center">
          <time className="text-white/80 text-sm">{formatDate(post.publishedAt)}</time>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-white/90 mt-4 max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          )}

          <Link
            href="/news"
            className="inline-flex items-center text-white/80 hover:text-white mt-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to News
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-cream">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto">
            <PostContent content={post.content} />
          </article>
        </div>
      </section>
    </>
  )
}
