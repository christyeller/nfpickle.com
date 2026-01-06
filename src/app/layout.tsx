import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'North Fork Pickleball Club',
  description: 'Serving the North Fork Valley of Colorado - Paonia, Hotchkiss, Crawford',
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
