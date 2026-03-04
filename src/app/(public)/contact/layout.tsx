import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with North Fork Pickleball Club. Questions about pickleball in Hotchkiss, open play, events, or joining our community in the North Fork Valley.',
  keywords: ['contact North Fork Pickleball', 'Hotchkiss pickleball contact', 'North Fork Valley pickleball info', 'pickleball club Colorado contact'],
  alternates: {
    canonical: 'https://nfpickle.com/contact',
  },
  openGraph: {
    title: 'Contact North Fork Pickleball Club',
    description: 'Reach out to North Fork Pickleball Club in Hotchkiss, Colorado. We\'d love to hear from you!',
    url: 'https://nfpickle.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
