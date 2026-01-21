'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Users, ArrowRight, ChevronDown } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

const boardMembers = [
  {
    name: 'Kim Burke',
    role: 'President',
    image: '/images/board/kim.png',
    bio: 'I moved to the North Fork Valley from South Florida 30 years ago and I am still amazed at the rich, vibrant quality of life this small rural community has to offer its residents. I graduated from the University of Florida and subsequently worked for Turner Construction Company in Miami as an estimator and project coordinator on many multi-million dollar construction projects. After moving to Crawford, building a house and having a son, I joined with a group of like-minded parents to help create the North Fork Community Montessori School (NFCMS) in Hotchkiss and I joyfully served on that board for 10 years. Because I have become an avid pickleball enthusiast, I am excited once again to give back to our wonderful community by serving on the North Fork Pickleball Club (NFPC) Board and helping to implement its vision of making pickleball easily accessible to the residents of Hotchkiss and surrounding communities in the North Fork Valley.',
  },
  {
    name: 'Board Member 2',
    role: 'Vice President',
    image: null,
    bio: 'Board member bio coming soon.',
  },
  {
    name: 'Board Member 3',
    role: 'Secretary',
    image: null,
    bio: 'Board member bio coming soon.',
  },
]

const BIO_PREVIEW_LENGTH = 150

function BoardMemberCard({ member }: { member: typeof boardMembers[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const needsReadMore = member.bio.length > BIO_PREVIEW_LENGTH
  const displayBio = isExpanded || !needsReadMore
    ? member.bio
    : member.bio.slice(0, BIO_PREVIEW_LENGTH).trim() + '...'

  return (
    <motion.div
      variants={staggerItem}
      className="text-center"
    >
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full flex flex-col"
        whileHover={prefersReducedMotion ? {} : { y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {/* Avatar */}
        {member.image ? (
          <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple/20">
            <Image
              src={member.image}
              alt={member.name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal to-purple flex items-center justify-center">
            <Users size={44} className="text-white" />
          </div>
        )}

        <h3 className="text-xl font-display font-bold text-charcoal-dark mb-1">
          {member.name}
        </h3>
        <p className="text-purple font-semibold mb-3">{member.role}</p>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-600 text-sm text-left"
            >
              {displayBio}
            </motion.p>
          </AnimatePresence>
        </div>

        {needsReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 inline-flex items-center gap-1 text-purple hover:text-purple-dark text-sm font-medium transition-colors mx-auto"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function BoardOfDirectorsPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Board Section */}
      <section className="section bg-cream relative overflow-hidden pt-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeader
            title="Board of Directors"
            subtitle="Meet the people leading our club"
            badge="Leadership"
            badgeIcon={Users}
            badgeColor="purple"
            highlightWord="Directors"
            highlightColor="purple"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {boardMembers.map((member) => (
              <BoardMemberCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-court via-court-dark to-purple text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-background opacity-30" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-lime/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Want to Get <span className="text-lime">Involved?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              We&apos;re always looking for passionate community members to help grow pickleball in the North Fork Valley.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-court-dark
                  font-bold text-lg rounded-xl hover:shadow-glow-lime transition-shadow"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
