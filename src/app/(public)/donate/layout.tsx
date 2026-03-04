import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support North Fork Pickleball Club and help build dedicated pickleball courts in Hotchkiss, Colorado. Your donation helps grow pickleball in the North Fork Valley.',
  keywords: ['donate to North Fork Pickleball', 'support Hotchkiss pickleball courts', 'pickleball donation Colorado', 'North Fork Valley pickleball fundraising'],
  alternates: {
    canonical: 'https://nfpickle.com/donate',
  },
  openGraph: {
    title: 'Donate to North Fork Pickleball Club',
    description: 'Help build dedicated pickleball courts in Hotchkiss. Support pickleball in the North Fork Valley.',
    url: 'https://nfpickle.com/donate',
  },
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children
}
