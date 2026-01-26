'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Newspaper } from 'lucide-react'
import PostCard from '@/components/public/PostCard'
import type { Post, Media } from '@prisma/client'

interface NewsPageClientProps {
  posts: (Post & { Media: Media | null })[]
}

export default function NewsPageClient({ posts }: NewsPageClientProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-charcoal-dark overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: '#3893A4' }}
        />

        {/* Mesh overlay */}
        <div className="absolute inset-0 mesh-background opacity-20" />

        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-teal/20 border-teal/30 text-teal mb-6"
            >
              <Newspaper className="w-4 h-4" />
              <span className="text-sm font-medium">Stay Updated</span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-teal">News</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-white/70 max-w-xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Club updates, announcements, and pickleball news
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
              fill="#FCF9F0"
            />
          </svg>
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
