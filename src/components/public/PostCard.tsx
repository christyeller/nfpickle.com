'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { staggerItem } from '@/lib/animations'
import type { Post } from '@prisma/client'

interface PostCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const prefersReducedMotion = useReducedMotion()

  if (variant === 'featured') {
    return <FeaturedPostCard post={post} />
  }

  if (variant === 'compact') {
    return <CompactPostCard post={post} />
  }

  return (
    <motion.article variants={staggerItem}>
      <Link href={`/news/${post.slug}`} className="group block h-full">
        <motion.div
          className="relative h-full p-6 rounded-2xl bg-white border border-gray-100
            shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 overflow-hidden"
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {/* Decorative gradient corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple/5 to-coral/5 rounded-bl-[100px]" />

          {/* Date badge */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4 text-purple" />
            <time>{formatDate(post.publishedAt)}</time>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-semibold text-charcoal-dark mb-3
            group-hover:text-court transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Read more link */}
          <div className="flex items-center gap-2 text-court font-medium group-hover:text-court-dark transition-colors mt-auto">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple via-coral to-lime
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
      </Link>
    </motion.article>
  )
}

function FeaturedPostCard({ post }: { post: Post }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <article>
      <Link href={`/news/${post.slug}`} className="group block">
        <motion.div
          className="relative p-8 rounded-3xl bg-gradient-to-br from-charcoal-dark to-court-dark
            overflow-hidden"
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime/10 rounded-full blur-3xl" />

          {/* Featured badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-lime/20 border border-lime/30 mb-6">
            <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
            <span className="text-sm font-medium text-lime">Latest Post</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Calendar className="w-4 h-4" />
            <time>{formatDate(post.publishedAt)}</time>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-white/70 text-lg line-clamp-2 mb-6">
              {post.excerpt}
            </p>
          )}

          {/* CTA */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
              bg-lime text-court-dark font-bold"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          >
            <span>Read Article</span>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </Link>
    </article>
  )
}

function CompactPostCard({ post }: { post: Post }) {
  return (
    <article>
      <Link href={`/news/${post.slug}`} className="group block">
        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
          {/* Date badge */}
          <div className="w-12 h-12 rounded-xl bg-purple/10 flex flex-col items-center justify-center flex-shrink-0">
            <span className="text-xs text-purple font-medium">
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="text-lg font-bold text-purple">
              {new Date(post.publishedAt || post.createdAt).getDate()}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-charcoal-dark truncate group-hover:text-court transition-colors">
              {post.title}
            </h4>
            {post.excerpt && (
              <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Arrow */}
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-court transition-colors flex-shrink-0" />
        </div>
      </Link>
    </article>
  )
}
