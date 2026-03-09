'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Calendar,
  Heart,
  Zap,
  ArrowRight,
  Check,
  Sparkles,
  Award,
  Star,
  MapPin,
  Building2,
  Navigation,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import EventCard from './EventCard'
import PostCard from './PostCard'
import FeatureCard from './FeatureCard'
import TestimonialCard from './TestimonialCard'
import StatCard from './StatCard'
import { ScrollReveal } from './ScrollReveal'
import { MagneticButton } from './MagneticButton'
import type { Event, Post } from '@prisma/client'

// Color rotation for features
const featureColors = ['lime', 'coral', 'teal', 'purple', 'lime', 'coral'] as const

// Court location data
const courtLocations = [
  {
    name: 'Crawford',
    locations: [
      { name: 'Crawford Town Hall', url: 'https://townofcrawford.colorado.gov/', type: 'outdoor', courts: null, address: '425 Highway 92, Crawford' },
      { name: 'North Fork Montessori @ Crawford', url: 'https://nfmc.deltaschools.com/en-US', type: 'indoor', courts: null, address: '51 Fir Avenue, Crawford' },
    ],
    admission: 'FREE',
    color: 'lime' as const,
  },
  {
    name: 'Paonia',
    locations: [
      { name: 'Apple Valley Park', url: 'https://townofpaonia.colorado.gov/departments/parks-recreation', type: 'outdoor', courts: null, address: '45 Pan American Avenue, Paonia' },
    ],
    admission: 'FREE',
    color: 'teal' as const,
  },
  {
    name: 'Delta',
    locations: [
      { name: 'Bill Heddles Recreation Center', url: 'https://www.cityofdelta.net/parksrecgolf/page/recreation-center', type: 'both', courts: null, address: '360 Main Street, Delta' },
    ],
    admission: 'Outdoor — FREE | Indoor — $8 general admission',
    color: 'teal' as const,
  },
  {
    name: 'Cedaredge',
    locations: [
      { name: 'Grand Mesa Pickleball Club', url: 'https://www.grandmesapickleball.org/', type: 'indoor', courts: null, address: '360 SW 8th Avenue, Cedaredge' },
    ],
    admission: '$70/year membership',
    color: 'coral' as const,
  },
]

const courtColorMap = {
  lime: {
    border: 'border-lime/30',
    icon: 'bg-lime text-court-dark',
    badge: 'bg-lime/10 text-lime-700',
  },
  teal: {
    border: 'border-teal/30',
    icon: 'bg-teal text-white',
    badge: 'bg-teal/10 text-teal',
  },
  coral: {
    border: 'border-coral/30',
    icon: 'bg-coral text-white',
    badge: 'bg-coral/10 text-coral',
  },
  purple: {
    border: 'border-purple/30',
    icon: 'bg-purple text-white',
    badge: 'bg-purple/10 text-purple',
  },
}

const testimonials = [
  {
    quote: 'Great group of people at NF Pickleball Club lots of fun and laughs. I am enjoying the sport with this group.',
    author: 'Randy Wilmore',
    role: 'Club Member',
    accentColor: 'lime' as const,
  },
  {
    quote: 'It has been so much fun learning how to play pickleball. I have enjoyed being more active and it\'s a great way to connect and meet new people.',
    author: 'Karen Kropp',
    role: 'Club Member',
    accentColor: 'teal' as const,
  },
  {
    quote: 'I\'ve had so much fun playing with the crew at the North Fork Pickleball Club! Everyone is kind and patient with me as a new player and I always feel welcome.',
    author: 'Jenny Eyler',
    role: 'Club Member',
    accentColor: 'coral' as const,
  },
  {
    quote: 'Since moving to the North Fork Valley in 2022, Pickleball has helped me stay active and meet a plethora of friendly and welcoming people.',
    author: 'Therese McGraw',
    role: 'Club Member',
    accentColor: 'purple' as const,
  },
  {
    quote: 'I moved back to the North Fork Valley 4 years ago. For me- Pickleball has been my medium to meet nice folks here. Not only is it great exercise outside and in the sun, but it is FUN!! At 66 it seems like "playing games" and playfulness in general can get lost. But with pickleball- the almost daily fun, laughter, pounding heart rate, giggling, camaraderie, smiling with new friends, and even with 3 generations of families can happen all at once. Thank you for making this happen, it\'s exciting for our community!',
    author: 'Belinda Brownell',
    role: 'Club Member',
    accentColor: 'lime' as const,
  },
  {
    quote: 'I am a resident of Crawford and I really enjoy playing pickleball. To have multiple courts as close as Hotchkiss would be fabulous! There is organized play in Delta with many participants but for me, I drive there everyday for work and would prefer to play in Hotchkiss. Thanks to NFPC for taking on this project!',
    author: 'Carla Bach',
    role: 'Club Member',
    accentColor: 'teal' as const,
  },
]

interface HomePageSectionsProps {
  upcomingEvents: Event[]
  recentPosts: Post[]
  membersCount: number
}

export default function HomePageSections({
  upcomingEvents,
  recentPosts,
  membersCount,
}: HomePageSectionsProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Features Section */}
      <section className="section bg-[#FDF9F0] relative overflow-hidden" style={{ paddingTop: '75px' }}>
        {/* Background decorations */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 text-lime-700 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              A Community Effort
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-charcoal-dark">
              Growing the Sport of Pickleball in our Valley
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re excited to announce a new community effort to bring <strong>dedicated pickleball and tennis courts</strong> to the North Fork Valley! To make this dream a reality, we have formed a 501(c)(3) nonprofit organization which will allow us to receive State and Federal grants; a vital step in securing resources for our project. We are currently working with the Delta County Commissioners, the Delta County School District and the North Fork Pool Park and Recreation District to strategize creation of both tennis courts and dedicated pickleball courts in the Hotchkiss area.
            </p>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Link
              href="#new-courts"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-lime text-white font-bold text-lg rounded-xl hover:bg-lime/90 transition-colors"
            >
              Learn More About Our Proposed New Courts in Hotchkiss
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon="PickleballPaddle"
              title="Fastest Growing Sport"
              description="Pickleball is the fastest-growing sport in the United States. More people play every year, so the North Fork Valley needs more access to the sport."
              color="lime"
              imageSrc="https://media.nfpickle.com/site-assets/with-shirley.avif"
            />
            <FeatureCard
              icon="AllAges"
              title="All Ages"
              description="Pickleball is enjoyed by people of all ages, which is very rare for a sport. That increases participation and promotes intergenerational relationships."
              color="coral"
              imageSrc="https://media.nfpickle.com/site-assets/group.jpg"
            />
            <FeatureCard
              icon="FunPaddle"
              title="Fun & Affordable"
              description="Pickleball is fun, easy to learn, and highly social. No previous experience is necessary and a paddle and a ball are all that is needed. That is important in Delta County."
              color="teal"
              imageSrc="https://media.nfpickle.com/site-assets/paoniaplayers.jpg"
            />
            <FeatureCard
              icon="MentalHealth"
              title="Improves Mental Health"
              description="Physical activity releases endorphins, while the social interaction boosts mood, leading to reduced depression, stress, and improved life satisfaction, say researchers."
              color="purple"
              imageSrc="https://media.nfpickle.com/site-assets/pexels-davidgari-17333854.jpg"
            />
            <FeatureCard
              icon="Community"
              title="Builds Community"
              description="Pickleball fosters a strong sense of belonging. It's an easy way to meet new people and form lasting bonds."
              color="lime"
              imageSrc="https://media.nfpickle.com/site-assets/couple.jpg"
            />
            <FeatureCard
              icon="PhysicalHealth"
              title="Improves Physical Health"
              description="Pickleball improves cardiovascular fitness, joint health, balance, coordination, strength, and weight management."
              color="coral"
              imageSrc="https://media.nfpickle.com/site-assets/pexels-rodrigo-ortega-2044210904-30864598.jpg"
            />
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Section - Overlapping */}
      <section className="relative z-20 -mb-24">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { src: 'https://media.nfpickle.com/site-assets/820092531-img_3458.jpeg', alt: 'Outdoor pickleball group photo' },
              { src: 'https://media.nfpickle.com/site-assets/gallery-2.jpg', alt: 'Indoor pickleball action shot' },
              { src: 'https://media.nfpickle.com/site-assets/820092539-img_3002.jpeg', alt: 'Crawford pickleball players' },
              { src: 'https://media.nfpickle.com/site-assets/820092544-img_2992.jpeg', alt: 'Pickleball game in progress' },
            ].map((image, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-elevation-2 hover:shadow-elevation-3 transition-shadow duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Court Locations */}
      <section className="section bg-[#3893A4] relative overflow-hidden pt-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4"
            >
              <MapPin className="w-4 h-4" />
              Where to Play
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Court Locations
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              You can find a court in the North Fork Valley and surrounding areas... but not in the most centrally located town of Hotchkiss! <span className="text-white font-black">Help us get pickleball courts built in Hotchkiss!</span>
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {courtLocations.map((court) => {
              const colors = courtColorMap[court.color]
              return (
                <motion.div
                  key={court.name}
                  variants={staggerItem}
                  className={`group relative p-6 rounded-2xl bg-[#FDF9F0] border ${colors.border}
                    shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 overflow-hidden`}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full" />

                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 rounded-xl ${colors.icon} shadow-lg flex-shrink-0`}>
                      <MapPin size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-charcoal-dark">
                        {court.name}
                      </h3>

                      {court.admission && (
                        <p className="mt-2 text-sm font-semibold text-charcoal-dark">
                          Admission: {court.admission}
                        </p>
                      )}

                      <div className="mt-3 space-y-2">
                        {court.locations.map((location) => (
                          <div key={location.name}>
                            <div className="flex flex-wrap items-center gap-2">
                              <a
                                href={location.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-court hover:text-court-dark font-medium underline underline-offset-2"
                              >
                                {location.name}
                              </a>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                                {location.type === 'both' ? 'Indoor & Outdoor' : location.type}
                              </span>
                              {location.courts && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                                  {location.courts} {location.courts === 1 ? 'court' : 'courts'}
                                </span>
                              )}
                            </div>
                            {location.address && (
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address + ', CO')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-court transition-colors group/dir"
                              >
                                <Navigation size={13} className="text-court group-hover/dir:text-court-dark flex-shrink-0" />
                                <span className="underline underline-offset-2 decoration-gray-300 group-hover/dir:decoration-court">
                                  {location.address}
                                </span>
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/play#open-play"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-lime text-white font-bold text-lg rounded-xl hover:bg-lime/90 transition-colors"
            >
              Learn More About Local Play Schedules
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Court Renderings Section */}
      <section id="new-courts" className="section bg-[#FDF9F0] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-medium mb-4"
            >
              <Building2 className="w-4 h-4" />
              Coming Soon
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-charcoal-dark">
              Our New Courts in <span className="text-teal">Hotchkiss</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are the renderings of our proposed courts to be built in Hotchkiss at the Delta County Fairgrounds. <span className="text-[#F38D09] font-semibold">Help us make this dream of pickleball in Hotchkiss a reality!</span>
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-4 md:gap-6"
          >
            {[
              { src: 'https://media.nfpickle.com/media/content/rendering1.png', alt: 'Court rendering - aerial view' },
              { src: 'https://media.nfpickle.com/media/content/rendering2.png', alt: 'Court rendering - side view' },
              { src: 'https://media.nfpickle.com/media/content/rendering3.png', alt: 'Court rendering - perspective view' },
            ].map((image, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative aspect-video overflow-hidden rounded-2xl shadow-elevation-2 hover:shadow-elevation-3 transition-shadow duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-elevation-2">
              <Image
                src="https://media.nfpickle.com/site-assets/proposed-court-location.png"
                alt="Bird's eye view of proposed court location"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <p className="text-gray-600 italic text-center mt-4">
              Here&apos;s a bird&apos;s eye view of our proposed location. For reference, the road just north of the red box is Doc Maloney Way. To the left (west) is the Maloney House and to the right (east) is the parking lot for the Miners Trail.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F38D09] text-white font-bold text-lg rounded-xl hover:bg-[#F38D09]/90 transition-colors"
            >
              <Heart className="w-5 h-5" />
              Support This Project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* News Preview */}
      {recentPosts.length > 0 && (
        <section className="section bg-[#FDF9F0] relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="container-custom relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <ScrollReveal>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 text-purple text-sm font-medium mb-4"
                >
                  <Zap className="w-4 h-4" />
                  Latest News
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-dark">
                  Club <span className="text-purple">Updates</span>
                </h2>
              </ScrollReveal>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/news"
                  className="group inline-flex items-center gap-2 text-court font-semibold mt-4 md:mt-0 hover:text-court-dark transition-colors"
                >
                  View all news
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {recentPosts.map((post) => (
                <motion.div key={post.id} variants={staggerItem}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/courts.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="container-custom relative z-10 text-center">
          <ScrollReveal className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
            >
              Ready to <span className="text-lime">Play?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 mb-10"
            >
              Grab your paddle and join us on the courts. Open play is free, and everyone is welcome!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton
                as="a"
                href="/play"
                className="group px-10 py-5 bg-[#FDF9F0] text-court-dark font-bold text-lg rounded-xl
                  hover:shadow-glow-lime transition-shadow"
              >
                <span className="flex items-center gap-2">
                  Find Open Play Times
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/contact"
                className="px-10 py-5 bg-[#F38D09] text-white font-bold text-lg rounded-xl
                  hover:bg-[#F38D09]/90 transition-colors"
              >
                Get in Touch
              </MagneticButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

function TestimonialsCarousel() {
  const pageSize = 3
  const totalPages = Math.ceil(testimonials.length / pageSize)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const next = useCallback(() => {
    setDirection(1)
    setPage((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const prev = useCallback(() => {
    setDirection(-1)
    setPage((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  const goTo = useCallback((index: number) => {
    setDirection(index > page ? 1 : -1)
    setPage(index)
  }, [page])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const slideVariants = prefersReducedMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
      }

  const pageItems = testimonials.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <section
      className="section relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://media.nfpickle.com/site-assets/NFV.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4"
          >
            <Heart className="w-4 h-4 text-white" />
            What Our Members Say
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Loved by Our Community
          </h2>
        </ScrollReveal>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev/Next arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 z-20
              w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
              flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 z-20
              w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
              flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel slide area */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) next()
                  else if (info.offset.x > 50) prev()
                }}
                className="grid md:grid-cols-3 gap-8"
              >
                {pageItems.map((t) => (
                  <TestimonialCard
                    key={t.author}
                    quote={t.quote}
                    author={t.author}
                    role={t.role}
                    accentColor={t.accentColor}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to page ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === page
                    ? 'bg-lime w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
