'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Facebook, Instagram, Mail, MapPin, Heart, ArrowUpRight, Phone, Inbox } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'

const quickLinks = [
  { href: '/play', label: 'Courts & Schedule' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About Us' },
  { href: '/history', label: 'History' },
  { href: '/board-of-directors', label: 'Board of Directors' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#3893A4' }}>
      <div className="container-custom relative z-10 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <Image
              src="https://media.nfpickle.com/site-assets/whitelogo.png"
              alt="North Fork Pickleball Club"
              width={250}
              height={100}
              unoptimized
              className="mb-6 h-auto w-[250px] object-contain"
            />
            <p className="text-white mb-8 max-w-md leading-relaxed">
              The North Fork Pickleball Club (NFPC) exists to provide a fun, healthy, recreational activity for our rural North Fork Community while promoting exercise, development of skills and camaraderie through the enjoyment of pickleball.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-xl bg-white/10 border border-white/20
                    flex items-center justify-center text-white hover:bg-orange hover:border-orange
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
            <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2 text-white">
              <span className="w-8 h-0.5 bg-white rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white
                      hover:text-white/80 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white
                      group-hover:bg-white/80 transition-colors" />
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
            <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2 text-white">
              <span className="w-8 h-0.5 bg-white rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-white hover:text-white/80 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0
                    group-hover:bg-white/20 transition-colors">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div className="text-sm">
                    <span className="block">Doc Maloney Way</span>
                    <span className="block">at Delta County Fairgrounds</span>
                    <span className="block">403 Fair Grounds</span>
                    <span className="block">Hotchkiss, CO 81419</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="group flex items-start gap-3 text-white">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Inbox size={18} className="text-white" />
                  </div>
                  <div className="text-sm">
                    <span className="block font-medium">Mailing Address</span>
                    <span className="block">PO Box 215</span>
                    <span className="block">Crawford, CO 81415</span>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="mailto:info@northforkpickleball.com"
                  className="group flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0
                    group-hover:bg-white/20 transition-colors">
                    <Mail size={18} className="text-white" />
                  </div>
                  <span className="text-sm">info@northforkpickleball.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:9702615864"
                  className="group flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0
                    group-hover:bg-white/20 transition-colors">
                    <Phone size={18} className="text-white" />
                  </div>
                  <span className="text-sm">(970) 261-5864</span>
                </a>
              </li>
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-8"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            >
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-orange text-white font-semibold
                  hover:bg-orange/90 transition-colors"
              >
                <Heart className="w-4 h-4" />
                Donate Now
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
          className="border-t border-white/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm">
              &copy; {new Date().getFullYear()} North Fork Pickleball Club. All rights reserved.
            </p>
            <p className="text-white text-sm flex items-center gap-1.5">
              Made with <Heart className="w-4 h-4 text-white fill-white" /> in Colorado
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

