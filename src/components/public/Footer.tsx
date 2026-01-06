'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Facebook, Instagram, Mail, MapPin, Heart, ArrowUpRight, Zap } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'

const quickLinks = [
  { href: '/play', label: 'Courts & Schedule' },
  { href: '/events', label: 'Events' },
  { href: '/membership', label: 'Membership' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <footer className="relative bg-charcoal-dark text-white overflow-hidden">
      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <WaveSVG />
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10 pt-32 pb-12 md:pt-40 md:pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl bg-lime flex items-center justify-center"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <PickleballIcon className="w-7 h-7 text-court-dark" />
              </motion.div>
              <span className="text-2xl font-display font-bold">
                North Fork <span className="text-lime">Pickleball</span>
              </span>
            </Link>

            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Serving the North Fork Valley of Colorado. Join our vibrant community of
              players in Paonia, Hotchkiss, and Crawford.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10
                    flex items-center justify-center hover:bg-lime hover:border-lime
                    hover:text-court-dark transition-all duration-300"
                  aria-label={social.label}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-lime rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-gray-400
                      hover:text-lime transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600
                      group-hover:bg-lime transition-colors" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2
                      group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-coral rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0
                    group-hover:bg-teal/20 transition-colors">
                    <MapPin size={18} className="text-teal" />
                  </div>
                  <div>
                    <span className="block text-white font-medium">Paonia Town Park</span>
                    <span className="text-sm">Paonia, CO 81428</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@northforkpickleball.com"
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0
                    group-hover:bg-coral/20 transition-colors">
                    <Mail size={18} className="text-coral" />
                  </div>
                  <span className="text-sm">info@northforkpickleball.com</span>
                </a>
              </li>
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-8"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            >
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-lime to-teal text-court-dark font-semibold
                  hover:shadow-glow-lime transition-shadow"
              >
                <Zap className="w-4 h-4" />
                Join the Club
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-white/10 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} North Fork Pickleball Club. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              Made with <Heart className="w-4 h-4 text-coral fill-coral" /> in Colorado
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function WaveSVG() {
  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      preserveAspectRatio="none"
    >
      <path
        d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z"
        fill="white"
        className="dark:fill-gray-900"
      />
      <path
        d="M0 120V80C240 40 480 20 720 40C960 60 1200 100 1440 80V120H0Z"
        fill="currentColor"
        className="text-charcoal-dark"
        opacity="0.5"
      />
    </svg>
  )
}

function PickleballIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8" cy="10" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="10" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="8" cy="14" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="14" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="7" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="17" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
