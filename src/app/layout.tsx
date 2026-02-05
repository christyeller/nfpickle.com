import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'North Fork Pickleball Club',
  description: 'Serving the North Fork Valley of Colorado - Paonia, Hotchkiss, Crawford',
  icons: {
    icon: 'https://media.nfpickle.com/site-assets/newlogo-tp.png',
    apple: 'https://media.nfpickle.com/site-assets/newlogo-tp.png',
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
