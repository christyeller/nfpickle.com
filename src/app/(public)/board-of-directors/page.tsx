'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Users, ArrowRight, ChevronDown } from 'lucide-react'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface BoardMember {
  name: string
  role: string
  image: string
  bio: string
  imagePosition?: string
}

const boardMembers: BoardMember[] = [
  {
    name: 'Kim Burke',
    role: 'President',
    image: '/images/board/kim.png',
    bio: 'I moved to the North Fork Valley from South Florida 30 years ago and I am still amazed at the rich, vibrant quality of life this small rural community has to offer its residents. I graduated from the University of Florida and subsequently worked for Turner Construction Company in Miami as an estimator and project coordinator on many multi-million dollar construction projects. After moving to Crawford, building a house and having a son, I joined with a group of like-minded parents to help create the North Fork Community Montessori School (NFCMS) in Hotchkiss and I joyfully served on that board for 10 years. Because I have become an avid pickleball enthusiast, I am excited once again to give back to our wonderful community by serving on the North Fork Pickleball Club (NFPC) Board and helping to implement its vision of making pickleball easily accessible to the residents of Hotchkiss and surrounding communities in the North Fork Valley.',
  },
  {
    name: 'Therese McGraw',
    role: 'Vice President',
    image: '/images/board/therese.jpeg',
    bio: "I was born in Chicago, IL and lived in Southwestern Michigan before moving to Colorado in 1996. I competed in Division 1 Softball and graduated from Illinois State University with a Bachelors in Psychology, and stayed on to complete a Master's Degree in Special Education, while working as an Assistant Softball Coach for Illinois State. Upon completion of my Master's Degree, I worked at a high school in SW Michigan for three years, teaching students with Learning and Behavioral Disabilities. When I moved to Colorado, I worked in Summit County, CO for 21 years as a Day Treatment and Special Education Teacher, before retiring in 2016. My husband and I married in 2000, and moved from Leadville, CO to Grand Lake, CO in 2014, where we were small business owners until our move to Crawford in 2022. I learned to play Pickleball in Grand Lake, and continue to enjoy the accessibility of a competitive and fun sport that accommodates the aging process, while also providing social opportunities. I am excited about bringing Pickleball and Tennis courts to Hotchkiss and the North Fork Valley, so the folks in our communities, spanning all age groups, can stay active, have fun, and make new friends.",
  },
  {
    name: 'Lynn Graunke',
    role: 'Secretary/Treasurer',
    image: '/images/board/lynn.jpeg',
    imagePosition: 'object-[50%_10%]',
    bio: "My name is Lynn Graunke and I have called the North Fork Valley home for the past three years. I love being part of a community that values health, connection, and time outdoors! I have a professional background in project management and many years of service on a variety of volunteer committees, which has helped me develop strong skills in listening, collaborating, and helping move ideas into action. I care deeply about keeping people active at every age and I am very excited about supporting the continued growth of the North Fork pickleball program. When I'm not volunteering, I enjoy ranching, hiking, snowshoeing, and spending time with my husband and our two Labrador retrievers.",
  },
  {
    name: 'Tony Vervloet',
    role: 'Member at Large',
    image: '/images/board/tony.jpeg',
    bio: "My name is Tony Vervloet, and I'm an avid pickleball player with a current 4.0 club rating and more than eight years of playing experience. Over the years, I've also enjoyed teaching pickleball classes to a wide range of players—from beginners (2.0) through intermediate levels (3.5). I am currently in my second year as Tournament Director for the Kokopelli Klassic, an event that welcomes approximately 350–400 players from throughout the greater Phoenix area, with skill levels ranging from 3.0 to 4.5. Prior to my pickleball journey, I worked for Union Oil Company of California (UNOCAL) and Chevron Corporation as an oil and gas drilling engineer. I retired in 2014 after serving as Drilling Manager for Western Venezuela and Trinidad.",
  },
  {
    name: 'Bev Wilmore',
    role: 'Member at Large',
    image: '/images/board/bev.jpeg',
    bio: "I've lived in the North Fork Valley for 30+ years enjoying many outdoor activities with my family. As a former tennis player I found pickleball 5+ years ago and enjoy the game, the friendships and the fun and will love to see more opportunities for pickleball in our communities.",
  },
]

const BIO_PREVIEW_LENGTH = 150

function BoardMemberCard({ member }: { member: BoardMember }) {
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
          <div className="w-44 h-44 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple/20">
            <Image
              src={member.image}
              alt={member.name}
              width={176}
              height={176}
              className={`w-full h-full object-cover ${member.imagePosition ?? ''}`}
            />
          </div>
        ) : (
          <div className="w-44 h-44 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal to-purple flex items-center justify-center">
            <Users size={64} className="text-white" />
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
      {/* Custom Creative Hero */}
      <section
        className="relative pt-28 pb-[300px] overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/in-paonia.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Playful badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/10 border-white/30 text-white mb-6"
            >
              <Users size={16} />
              <span className="text-sm font-medium">Leadership</span>
            </motion.div>

            {/* Main title with animated words */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Meet Our{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-lime">Board</span>
                <motion.span
                  className="absolute -inset-1 bg-lime/20 rounded-lg -z-0"
                  initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-white max-w-xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              The dedicated volunteers leading our club
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
              fill="#FCF9F0"
            />
          </svg>
        </div>
      </section>

      {/* Board Section */}
      <section className="section bg-cream relative overflow-hidden -mt-px pt-[25px]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
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
      <section
        className="section text-white relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/820092531-img_3458.jpeg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

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
