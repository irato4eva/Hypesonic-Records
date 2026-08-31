import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hypesonic Records — Audio Recording, Mixing & Mastering Studio',
  description:
    'Hypesonic Records is a premium recording, mixing, and mastering studio in Benin City, Nigeria. Analog-modeled mixing, stem processing, and streaming-optimized mastering.',
  generator: 'v0.app',
  keywords: [
    'recording studio',
    'mixing',
    'mastering',
    'Benin City',
    'Nigeria',
    'Afrobeats',
    'audio production',
  ],
  openGraph: {
    title: 'Hypesonic Records — World-Class Audio Production',
    description:
      'Premium recording, mixing, and mastering studio in Benin City, Nigeria.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
