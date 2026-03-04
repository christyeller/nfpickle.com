import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our History',
  description: 'Learn about the history of pickleball in the North Fork Valley. From the first courts in Paonia to building dedicated pickleball courts in Hotchkiss, Colorado.',
  keywords: ['North Fork Pickleball history', 'pickleball Hotchkiss history', 'Paonia pickleball origins', 'North Fork Valley pickleball timeline', 'Crawford pickleball'],
  alternates: {
    canonical: 'https://nfpickle.com/history',
  },
  openGraph: {
    title: 'Our History | North Fork Pickleball Club',
    description: 'The story of pickleball in the North Fork Valley - from Paonia to Hotchkiss and Crawford.',
    url: 'https://nfpickle.com/history',
  },
}

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children
}
