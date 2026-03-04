import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Where to Play Pickleball',
  description: 'Find pickleball courts near Hotchkiss, Colorado. Play pickleball in Crawford, Paonia, Delta, and Cedaredge. Court locations, schedules, and rules for North Fork Valley pickleball.',
  keywords: ['Hotchkiss pickleball courts', 'North Fork pickleball courts', 'Paonia pickleball', 'Crawford pickleball', 'Delta pickleball', 'where to play pickleball Colorado'],
  alternates: {
    canonical: 'https://nfpickle.com/play',
  },
  openGraph: {
    title: 'Where to Play Pickleball | North Fork Valley Courts',
    description: 'Find pickleball courts near Hotchkiss, Colorado. Locations in Crawford, Paonia, Delta, and Cedaredge.',
    url: 'https://nfpickle.com/play',
  },
}

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return children
}
