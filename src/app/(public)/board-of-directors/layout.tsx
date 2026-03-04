import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Board of Directors',
  description: 'Meet the volunteer board members leading North Fork Pickleball Club. Dedicated to growing pickleball in Hotchkiss and the North Fork Valley of Colorado.',
  keywords: ['North Fork Pickleball board', 'Hotchkiss pickleball leadership', 'North Fork Valley pickleball club board', 'pickleball volunteers Colorado'],
  alternates: {
    canonical: 'https://nfpickle.com/board-of-directors',
  },
  openGraph: {
    title: 'Board of Directors | North Fork Pickleball Club',
    description: 'Meet the dedicated volunteers leading North Fork Pickleball Club in Hotchkiss, Colorado.',
    url: 'https://nfpickle.com/board-of-directors',
  },
}

export default function BoardOfDirectorsLayout({ children }: { children: React.ReactNode }) {
  return children
}
