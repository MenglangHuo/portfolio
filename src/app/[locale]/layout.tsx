import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getMessages } from 'next-intl/server'
import { cookies } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import dynamic from 'next/dynamic'
import { Kantumruy_Pro } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import type { Metadata } from 'next'

import './globals.css'

const Kantumruy = Kantumruy_Pro({ subsets: ['khmer', 'latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.menglanghuo.online'),
  title: {
    default: 'Huo Menglang - Fullstack System Developer',
    template: '%s - Huo Menglang Portfolio',
  },
  description: 'Fullstack System Developer specializing in distributed systems, Spring Boot, Next.js, and cloud architecture. Dedicated to building resilient software crafts.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  applicationName: 'Huo Menglang Portfolio',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Huo Menglang Portfolio',
    startupImage: '/apple-icon.png',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Huo Menglang Portfolio',
    title: 'Huo Menglang - Fullstack System Developer',
    description: 'Fullstack System Developer specializing in distributed systems, Spring Boot, Next.js, and cloud architecture. Dedicated to building resilient software crafts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Huo Menglang - Fullstack System Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huo Menglang - Fullstack System Developer',
    description: 'Fullstack System Developer specializing in distributed systems, Spring Boot, Next.js, and cloud architecture. Dedicated to building resilient software crafts.',
    images: ['/og-image.png'],
  },
}

const AppThemeProvider = dynamic(() => import('@/components/context/theme'), {
  ssr: true,
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
  const messages = await getMessages()
const locale=(await params).locale;
  const theme = 'light'

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body
        className={cn(
          Kantumruy.className,
          'text-alter-light',
          'antialiased bg-main bg-[radial-gradient(#C7CABA_1px,transparent_1px)] [background-size:20px_20px]'
        )}
      >
        <AppThemeProvider attribute='class' defaultTheme='light' forcedTheme='light' enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            {children}
            <SpeedInsights />
            <Analytics />
          </NextIntlClientProvider>
        </AppThemeProvider>

        <NextTopLoader
          color='#2299DD'
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner={false}
          easing='ease'
          speed={200}
          shadow='0 0 10px #2299DD,0 0 5px #2299DD'
          zIndex={1600}
          showAtBottom={false}
        />
      </body>
    </html>
  )
}
