import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

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
  const post = await prisma.post.findUnique({ where: { slug } })

  if (!post || post.status !== 'published') {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-dark via-primary to-dark-blue">
        <div className="container-custom">
          <Link
            href="/news"
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to News
          </Link>

          <time className="text-white/80 text-sm">{formatDate(post.publishedAt)}</time>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-white/90 mt-4 max-w-3xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) =>
                paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
