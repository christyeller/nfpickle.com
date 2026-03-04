import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about North Fork Pickleball Club and our mission to bring dedicated pickleball courts to Hotchkiss, Colorado. We are building a vibrant pickleball community in the North Fork Valley.',
  keywords: ['North Fork Pickleball Club', 'Hotchkiss pickleball', 'about North Fork Pickleball', 'pickleball community Colorado'],
  alternates: {
    canonical: 'https://nfpickle.com/about',
  },
  openGraph: {
    title: 'About North Fork Pickleball Club',
    description: 'Learn about our mission to bring dedicated pickleball courts to Hotchkiss, Colorado and build a vibrant community.',
    url: 'https://nfpickle.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
