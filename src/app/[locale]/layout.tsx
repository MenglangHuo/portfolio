import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/next'
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
    default: 'Huo Menglang (Menglang / MrLang) - Fullstack System Developer',
    template: '%s - Huo Menglang (MrLang) Portfolio',
  },
  description:
    'Fullstack System Developer portfolio of Huo Menglang (menglang, lang, mrlang, huomenglang, menglanghuo). Specializing in distributed systems, Spring Boot, Next.js, and cloud architecture in Cambodia.',
  keywords: [
    'menglang',
    'lang',
    'mrlang',
    'huomenglang',
    'menglanghuo',
    'Huo Menglang',
    'Menglang Huo',
    'Mr. Lang',
    'Mr Lang',
    'ហួ ម៉េងឡាង',
    'ម៉េងឡាង',
    'Fullstack Developer',
    'System Developer',
    'Software Engineer',
    'Backend Developer',
    'Frontend Developer',
    'Cambodia Developer',
    'Phnom Penh Developer',
    'Spring Boot',
    'Next.js',
    'PostgreSQL',
    'Cloud Architecture',
    'Microservices',
  ],
  authors: [{ name: 'Huo Menglang', url: 'https://www.menglanghuo.online' }],
  creator: 'Huo Menglang (menglang, mrlang, huomenglang, menglanghuo)',
  publisher: 'Huo Menglang',
  alternates: {
    canonical: 'https://www.menglanghuo.online',
    languages: {
      'en': 'https://www.menglanghuo.online/en',
      'km': 'https://www.menglanghuo.online/kh',
      'km-KH': 'https://www.menglanghuo.online/kh',
      'x-default': 'https://www.menglanghuo.online/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  applicationName: 'Huo Menglang (MrLang) Portfolio',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Huo Menglang (MrLang) Portfolio',
    startupImage: '/apple-icon.png',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    url: 'https://www.menglanghuo.online',
    siteName: 'Huo Menglang (MrLang) Portfolio',
    title: 'Huo Menglang (Menglang / MrLang) - Fullstack System Developer',
    description:
      'Fullstack System Developer portfolio of Huo Menglang (menglang, lang, mrlang, huomenglang, menglanghuo). Specializing in distributed systems, Spring Boot, Next.js, and cloud architecture.',
    images: [
      {
        url: 'https://www.menglanghuo.online/og-image.jpg',
        secureUrl: 'https://www.menglanghuo.online/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Huo Menglang (menglang, mrlang, huomenglang, menglanghuo) - Fullstack System Developer Portfolio',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['km_KH'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huo Menglang (Menglang / MrLang) - Fullstack System Developer',
    description:
      'Fullstack System Developer portfolio of Huo Menglang (menglang, lang, mrlang, huomenglang, menglanghuo). Specializing in distributed systems, Spring Boot, Next.js, and cloud architecture.',
    images: ['https://www.menglanghuo.online/og-image.jpg'],
    creator: '@Menglang_HUO',
  },
  other: {
    'telegram:channel': '@Menglang_HUO',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.menglanghuo.online/#person',
      name: 'Huo Menglang',
      alternateName: [
        'menglang',
        'lang',
        'mrlang',
        'huomenglang',
        'menglanghuo',
        'Menglang',
        'Lang',
        'MrLang',
        'Mr. Lang',
        'ហួ ម៉េងឡាង',
        'ម៉េងឡាង',
      ],
      url: 'https://www.menglanghuo.online',
      image: 'https://www.menglanghuo.online/assets/images/photo-1.jpg',
      jobTitle: 'Fullstack System Developer',
      description:
        'Experienced Fullstack Developer and System Developer building resilient digital products, distributed systems, Spring Boot, Next.js, and cloud architecture.',
      email: 'mailto:huomenglang@gmail.com',
      sameAs: [
        'https://github.com/MenglangHuo',
        'https://www.linkedin.com/in/menglang-huo-651741284',
        'https://t.me/Menglang_HUO',
      ],
      knowsAbout: [
        'Fullstack Development',
        'System Architecture',
        'Spring Boot',
        'Next.js',
        'PostgreSQL',
        'Microservices',
        'DevOps',
        'Big Data',
        'AI',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.menglanghuo.online/#website',
      url: 'https://www.menglanghuo.online',
      name: 'Huo Menglang (MrLang) Portfolio',
      description:
        'Official portfolio of Huo Menglang (menglang, lang, mrlang, huomenglang, menglanghuo)',
      publisher: {
        '@id': 'https://www.menglanghuo.online/#person',
      },
      inLanguage: ['en', 'km'],
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.menglanghuo.online/#profilepage',
      url: 'https://www.menglanghuo.online',
      name: 'Huo Menglang - Profile',
      mainEntity: {
        '@id': 'https://www.menglanghuo.online/#person',
      },
    },
  ],
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
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          </NextIntlClientProvider>
        </AppThemeProvider>

        <SpeedInsights />
        <Analytics />

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
