// React Imports
import type { ReactNode } from 'react'

// Next Imports
import type { Metadata, Viewport } from 'next'
import { Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// Third-party Imports
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// Component Imports
import Providers from '@/components/Providers'
import { TooltipProvider } from '@/components/ui/tooltip'

// Util Imports
import { cn } from '@/lib/utils'

// Style Imports
import './globals.css'
import ScrollToTop from '@/components/layout/ScrollToTop'

const geistRounded = localFont({
  src: './fonts/GeistRounded.woff2',
  variable: '--font-geist-rounded',
  weight: '100 900',
  style: 'normal',
  display: 'swap'
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: 'Rakfound',
    template: '%s | Rakfound'
  },
  description: 'Rakfound',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`),
  openGraph: {
    title: 'Rakfound',
    description: 'Rakfound',
    type: 'website',
    siteName: 'Rakfound',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        url: '/og/og-default.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Rakfound'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakfound',
    description: 'Rakfound',
    images: ['/og/og-default.png']
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang='en'
      className={cn(geistRounded.variable, geistMono.variable, 'flex min-h-full w-full antialiased', 'font-sans')}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <NuqsAdapter>
          <Providers sidebarDefaultOpen={true}>
            <TooltipProvider>{children}</TooltipProvider>
          </Providers>
        </NuqsAdapter>

        <ScrollToTop />
      </body>
    </html>
  )
}

export default RootLayout
