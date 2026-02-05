'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
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
      { name: 'Crawford Town Hall', url: 'https://townofcrawford.colorado.gov/', type: 'outdoor', courts: 1 },
      { name: 'Crawford Montessori School', url: 'https://nfmc.deltaschools.com/en-US', type: 'indoor', courts: 1 },
    ],
    schedule: 'Currently playing indoors: Wednesdays at 4pm and Saturdays at 9am.',
    color: 'lime' as const,
  },
  {
    name: 'Paonia',
    locations: [
      { name: 'Apple Valley Park', url: 'https://townofpaonia.colorado.gov/departments/parks-recreation', type: 'outdoor', courts: 3 },
    ],
    schedule: 'Play happens on Tuesdays, Thursdays and Saturdays. Start times are anywhere from 11am - 1pm and vary according to weather.',
    color: 'teal' as const,
  },
  {
    name: 'Delta',
    locations: [
      { name: 'Bill Heddles Recreation Center', url: 'https://www.cityofdelta.net/parksrecgolf/page/recreation-center', type: 'both', courts: null },
    ],
    schedule: 'Outdoor tennis courts are lined for pickleball. Indoor rec pickleball is offered on the basketball court at scheduled times listed on their website.',
    color: 'teal' as const,
  },
  {
    name: 'Cedaredge',
    locations: [
      { name: 'Grand Mesa Pickleball Club', url: 'https://www.grandmesapickleball.org/', type: 'members', courts: null },
    ],
    schedule: 'Play is limited to members only. They have their own organization and are also raising money to build more courts.',
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
              We&apos;re excited to announce a new community effort to bring <strong>dedicated pickleball courts</strong> to the North Fork Valley! To make this dream a reality, we have formed a 501(c)(3) nonprofit organization which will allow us to receive State and Federal grants; a vital step in securing resources for our project. We are currently working with the Delta County Commissioners, the Delta County School District and the North Fork Pool Park and Recreation District to strategize creation of both tennis courts and dedicated pickleball courts in the Hotchkiss area.
            </p>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Link
              href="#"
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

                      <div className="mt-3 space-y-2">
                        {court.locations.map((location) => (
                          <div key={location.name} className="flex flex-wrap items-center gap-2">
                            <a
                              href={location.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-court hover:text-court-dark font-medium underline underline-offset-2"
                            >
                              {location.name}
                            </a>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                              {location.type === 'both' ? 'Indoor & Outdoor' : location.type === 'members' ? 'Members Only' : location.type}
                            </span>
                            {location.courts && (
                              <span className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-600">
                                {location.courts} {location.courts === 1 ? 'court' : 'courts'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="mt-4 text-sm text-gray-600">
                        {court.schedule}
                      </p>
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
      <section className="section bg-[#FDF9F0] relative overflow-hidden">
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
      <section
        className="section relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.nfpickle.com/site-assets/NFV.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for readability */}
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

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <TestimonialCard
              quote="Great group of people at NF Pickleball Club lots of fun and laughs. I am enjoying the sport with this group."
              author="Randy Wilmore"
              role="Club Member"
              accentColor="lime"
            />
            <TestimonialCard
              quote="It has been so much fun learning how to play pickleball. I have enjoyed being more active and it's a great way to connect and meet new people."
              author="Karen Kropp"
              role="Club Member"
              accentColor="teal"
            />
            <TestimonialCard
              quote="I've had so much fun playing with the crew at the North Fork Pickleball Club! Everyone is kind and patient with me as a new player and I always feel welcome."
              author="Jenny Eyler"
              role="Club Member"
              accentColor="coral"
            />
          </motion.div>
        </div>
      </section>

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
