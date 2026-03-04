import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events & Tournaments',
  description: 'Upcoming pickleball events, tournaments, and open play sessions hosted by North Fork Pickleball Club in Hotchkiss and the North Fork Valley of Colorado.',
  keywords: ['North Fork Pickleball events', 'Hotchkiss pickleball tournaments', 'pickleball open play Colorado', 'North Fork Valley pickleball events'],
  alternates: {
    canonical: 'https://nfpickle.com/events',
  },
  openGraph: {
    title: 'Pickleball Events & Tournaments | North Fork Pickleball Club',
    description: 'Join pickleball events, tournaments, and open play in Hotchkiss and the North Fork Valley.',
    url: 'https://nfpickle.com/events',
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
