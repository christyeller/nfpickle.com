import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostContent from '../../news/[slug]/PostContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await prisma.page.findUnique({ where: { slug } })

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.content.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      Media: true,
    },
  })

  if (!page || page.status !== 'published') {
    notFound()
  }

  const featuredImageUrl = page.Media?.secureUrl || page.Media?.url
  const isGalleryPage = slug === 'photo-gallery'

  return (
    <>
      {!isGalleryPage && (
        <section
          className="relative pb-16 min-h-[350px] flex items-center justify-center"
          style={featuredImageUrl ? {
            backgroundImage: `url(${featuredImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          <div className={`absolute inset-0 ${featuredImageUrl ? 'bg-black/60' : 'bg-[#3893A4]'}`} />

          <div className="container-custom relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
              {page.title}
            </h1>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section bg-cream">
        <div className={isGalleryPage ? 'max-w-[1400px] mx-auto px-4 sm:px-6' : 'container-custom'}>
          <article className={isGalleryPage ? '' : 'max-w-3xl mx-auto'}>
            <PostContent content={page.content} />
          </article>
        </div>
      </section>
    </>
  )
}
