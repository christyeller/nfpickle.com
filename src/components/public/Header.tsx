'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { menuContainer, menuItem } from '@/lib/animations'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/history', label: 'History' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-[10px]',
          isScrolled && 'backdrop-blur-xl shadow-elevation-3'
        )}
        style={{ backgroundColor: '#FDF9F0' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                className="relative h-[100px] w-auto"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/logo.png"
                  alt="North Fork Pickleball"
                  width={250}
                  height={100}
                  className="h-[100px] w-auto object-contain"
                  priority
                />
              </motion.div>
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
                  href="/donate"
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
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
                          'block py-3 px-4 rounded-xl font-bold text-lg transition-colors',
                          pathname === link.href
                            ? 'bg-[#1A5F7A]/20 text-[#5AAFD4] hover:bg-[#1A5F7A]/30'
                            : 'text-[#5AAFD4]/80 hover:text-[#5AAFD4] hover:bg-white/5'
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
                    href="/donate"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-primary w-full justify-center flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Donate Now
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
        'relative px-4 py-2 font-bold transition-colors rounded-lg',
        isActive
          ? 'hover:opacity-80'
          : 'hover:opacity-80'
      )}
      style={{
        color: isActive ? '#0D3D4D' : '#1A5F7A'
      }}
    >
      {label}
      {isActive && !prefersReducedMotion && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
          style={{ backgroundColor: '#0D3D4D' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      {isActive && prefersReducedMotion && (
        <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ backgroundColor: '#0D3D4D' }} />
      )}
    </Link>
  )
}

