import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://nfpickle.com'),
  title: {
    default: 'North Fork Pickleball Club | Hotchkiss Pickleball Courts & Community',
    template: '%s | North Fork Pickleball Club',
  },
  description: 'North Fork Pickleball Club is bringing dedicated pickleball courts to Hotchkiss, Colorado. Join our growing community of pickleball players in the North Fork Valley - Paonia, Hotchkiss, and Crawford.',
  keywords: [
    'North Fork Pickleball',
    'North Fork Pickleball Club',
    'Hotchkiss pickleball',
    'Hotchkiss pickleball courts',
    'Paonia pickleball',
    'Crawford pickleball',
    'North Fork Valley pickleball',
    'Delta County pickleball',
    'Colorado pickleball',
    'pickleball courts Hotchkiss CO',
    'pickleball Western Slope',
  ],
  authors: [{ name: 'North Fork Pickleball Club' }],
  creator: 'North Fork Pickleball Club',
  publisher: 'North Fork Pickleball Club',
  icons: {
    icon: 'https://media.nfpickle.com/site-assets/newlogo-tp.png',
    apple: 'https://media.nfpickle.com/site-assets/newlogo-tp.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nfpickle.com',
    siteName: 'North Fork Pickleball Club',
    title: 'North Fork Pickleball Club | Hotchkiss Pickleball Courts & Community',
    description: 'North Fork Pickleball Club is bringing dedicated pickleball courts to Hotchkiss, Colorado. Join our growing community in the North Fork Valley.',
    images: [
      {
        url: 'https://media.nfpickle.com/site-assets/with-tony.jpeg',
        width: 1200,
        height: 630,
        alt: 'North Fork Pickleball Club - Pickleball in Hotchkiss, Colorado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'North Fork Pickleball Club | Hotchkiss Pickleball',
    description: 'Bringing dedicated pickleball courts to Hotchkiss, Colorado. Join the North Fork Pickleball community!',
    images: ['https://media.nfpickle.com/site-assets/with-tony.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nfpickle.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
