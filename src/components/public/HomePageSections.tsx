'use client'

import Link from 'next/link'
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
      {/* Stats Section - Overlapping Hero */}
      <section className="relative -mt-24 z-20">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <StatCard
              value={membersCount > 0 ? membersCount : 50}
              suffix="+"
              label="Active Members"
              icon="Users"
              color="lime"
            />
            <StatCard
              value={4}
              label="Courts Available"
              icon="MapPin"
              color="teal"
            />
            <StatCard
              value={10}
              suffix="+"
              label="Weekly Sessions"
              icon="Calendar"
              color="coral"
            />
            <StatCard
              value={100}
              suffix="%"
              label="Welcome Rate"
              icon="Heart"
              color="purple"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-[#FDF9F0] relative overflow-hidden">
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
              Why Choose Us
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-charcoal-dark">
              More Than Just a <span className="gradient-text">Game</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a community where everyone belongs. From beginners to pros, we&apos;re here to play, learn, and grow together.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon="Users"
              title="Welcoming Community"
              description="New to pickleball? No problem! Our members love helping newcomers learn the game in a friendly, supportive environment."
              color="lime"
            />
            <FeatureCard
              icon="Calendar"
              title="Regular Open Play"
              description="Multiple weekly sessions mean you can always find a time that works. Morning, afternoon, or weekend - we've got you covered."
              color="coral"
            />
            <FeatureCard
              icon="Target"
              title="All Skill Levels"
              description="Whether you're picking up a paddle for the first time or you're a tournament player, you'll find games at your level."
              color="teal"
            />
            <FeatureCard
              icon="Award"
              title="Tournaments & Events"
              description="Compete in friendly tournaments, attend clinics with certified instructors, and join social events throughout the year."
              color="purple"
            />
            <FeatureCard
              icon="MapPin"
              title="Prime Location"
              description="Play at beautiful courts in Paonia Town Park with lights for evening games and stunning mountain views."
              color="lime"
            />
            <FeatureCard
              icon="Heart"
              title="Health & Wellness"
              description="Pickleball is a fantastic full-body workout that's easy on the joints. Stay fit while having fun!"
              color="coral"
            />
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-[#FDF9F0] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-lime/10 via-teal/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-coral/10 via-sunset/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <ScrollReveal>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 text-coral text-sm font-medium mb-4"
              >
                <Calendar className="w-4 h-4" />
                What&apos;s Coming Up
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-dark">
                Upcoming <span className="text-coral">Events</span>
              </h2>
            </ScrollReveal>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 text-court font-semibold mt-4 md:mt-0 hover:text-court-dark transition-colors"
              >
                View all events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {upcomingEvents.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6 max-w-4xl"
            >
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          ) : (
            <ScrollReveal className="text-center py-16 px-8 rounded-3xl bg-[#FDF9F0] border border-[#E8E4DF]">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold text-charcoal-dark mb-2">No Upcoming Events</h3>
              <p className="text-gray-500 mb-6">Check back soon for new events!</p>
              <Link href="/play" className="btn btn-primary">
                View Open Play Schedule
              </Link>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-charcoal-dark relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-lime/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white text-sm font-medium mb-4"
            >
              <Heart className="w-4 h-4 text-coral" />
              What Our Members Say
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Loved by <span className="text-lime">Players</span>
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
              quote="I joined last summer knowing nothing about pickleball. Now I play three times a week! The community here is incredibly welcoming."
              author="Sarah M."
              role="Club Member"
              accentColor="lime"
            />
            <TestimonialCard
              quote="Best decision I made for my health and social life. The courts are great, the people are friendly, and the games are competitive but fun."
              author="Mike T."
              role="Lifetime Member"
              variant="featured"
              accentColor="teal"
            />
            <TestimonialCard
              quote="My wife and I play together every weekend. It's become our favorite way to stay active and make new friends."
              author="David & Linda"
              role="Annual Members"
              accentColor="coral"
            />
          </motion.div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="section bg-[#FDF9F0] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 dots-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-lime/5 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-medium mb-4"
            >
              <Award className="w-4 h-4" />
              Membership Options
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-charcoal-dark">
              Join Our <span className="gradient-text">Community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the membership that works for you. All levels welcome!
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Free Tier */}
            <motion.div
              variants={staggerItem}
              className="group relative"
            >
              <motion.div
                className="h-full p-8 rounded-3xl border-2 border-[#E8E4DF] bg-[#FDF9F0]
                  hover:border-lime/30 hover:shadow-elevation-3 transition-all duration-500"
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold mb-2 text-charcoal-dark">Community</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold">Free</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Newsletter updates', 'Event notifications', 'Open play info', 'Community access'].map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-lime-700" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="/membership"
                  className="block w-full py-4 text-center font-semibold rounded-xl border-2 border-court
                    text-court hover:bg-court hover:text-white transition-all"
                >
                  Sign Up Free
                </Link>
              </motion.div>
            </motion.div>

            {/* Annual Tier - Featured */}
            <motion.div
              variants={staggerItem}
              className="group relative z-10"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-lime via-teal to-purple rounded-[28px] blur-sm opacity-70" />
              <motion.div
                className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-court via-court-dark to-purple
                  text-white shadow-elevation-3"
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-lime text-court-dark text-sm font-bold rounded-full shadow-lg
                    flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    MOST POPULAR
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold mb-2">Annual Member</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold">$25</span>
                    <span className="text-white/70">/year</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {['All Community benefits', 'Voting rights', 'Member discounts', 'Priority registration', 'Member directory'].map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-lime/30 flex items-center justify-center">
                        <Check className="w-3 h-3 text-lime" />
                      </div>
                      <span className="text-white/90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="/membership"
                  className="block w-full py-4 text-center font-bold rounded-xl bg-lime text-court-dark
                    hover:bg-[#FDF9F0] hover:shadow-glow-lime transition-all"
                >
                  Join Now
                </Link>
              </motion.div>
            </motion.div>

            {/* Lifetime Tier */}
            <motion.div
              variants={staggerItem}
              className="group relative"
            >
              <motion.div
                className="h-full p-8 rounded-3xl border-2 border-[#E8E4DF] bg-[#FDF9F0]
                  hover:border-purple/30 hover:shadow-elevation-3 transition-all duration-500"
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
              >
                <div className="absolute -top-3 right-6">
                  <span className="px-3 py-1 bg-purple/10 text-purple text-xs font-bold rounded-full">
                    BEST VALUE
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold mb-2 text-charcoal-dark">Lifetime</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold">$200</span>
                    <span className="text-gray-500 text-sm">one-time</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {['All Annual benefits', 'Never pay again', 'Founding member', 'Special recognition', 'Lifetime access'].map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-purple/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-purple" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="/membership"
                  className="block w-full py-4 text-center font-semibold rounded-xl border-2 border-purple
                    text-purple hover:bg-purple hover:text-white transition-all"
                >
                  Go Lifetime
                </Link>
              </motion.div>
            </motion.div>
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
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-court via-court-dark to-purple" />
        <div className="absolute inset-0 mesh-background opacity-30" />

        {/* Animated orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-lime/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-coral/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

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
                className="px-10 py-5 glass-dark text-white font-bold text-lg rounded-xl
                  hover:bg-[#FDF9F0]/20 transition-colors"
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
