'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { menuContainer, menuItem } from '@/lib/animations'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/play', label: 'Play' },
  { href: '/events', label: 'Events' },
  { href: '/membership', label: 'Membership' },
  { href: '/donate', label: 'Donate' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-charcoal-dark/95 backdrop-blur-xl shadow-elevation-3 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
                  isScrolled ? 'bg-lime' : 'glass-lime'
                )}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <PickleballIcon className={cn(
                  'w-6 h-6 transition-colors',
                  isScrolled ? 'text-court-dark' : 'text-lime'
                )} />
              </motion.div>
              <span
                className={cn(
                  'text-lg md:text-xl font-display font-bold transition-colors hidden sm:block',
                  isScrolled ? 'text-white' : 'text-white'
                )}
              >
                North Fork <span className="text-lime">Pickleball</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                  isScrolled={isScrolled}
                />
              ))}
              <motion.div
                className="ml-4"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Link
                  href="/membership"
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Join Club
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
              )}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-charcoal-dark/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-charcoal-dark border-l border-white/10 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Nav Links */}
                <motion.div
                  variants={menuContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-2"
                >
                  {navLinks.map((link) => (
                    <motion.div key={link.href} variants={menuItem}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'block py-3 px-4 rounded-xl font-medium text-lg transition-colors',
                          pathname === link.href
                            ? 'bg-lime/10 text-lime'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto"
                >
                  <Link
                    href="/membership"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-primary w-full justify-center flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Join Club
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  isScrolled: boolean
}

function NavLink({ href, label, isActive, isScrolled }: NavLinkProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Link
      href={href}
      className={cn(
        'relative px-4 py-2 font-medium transition-colors rounded-lg',
        isActive
          ? 'text-lime'
          : isScrolled
          ? 'text-white/80 hover:text-white hover:bg-white/5'
          : 'text-white/80 hover:text-white hover:bg-white/10'
      )}
    >
      {label}
      {isActive && !prefersReducedMotion && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-lime rounded-full"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      {isActive && prefersReducedMotion && (
        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-lime rounded-full" />
      )}
    </Link>
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
