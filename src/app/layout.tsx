import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'BlogHub - Discover Amazing Stories',
    template: '%s | BlogHub'
  },
  description: 'Discover amazing stories, insights, and knowledge from our community of writers. Explore technology, design, business, and lifestyle content.',
  keywords: ['blog', 'technology', 'design', 'business', 'lifestyle', 'articles', 'stories'],
  authors: [{ name: 'BlogHub Team' }],
  creator: 'BlogHub',
  publisher: 'BlogHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bloghub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bloghub.com',
    title: 'BlogHub - Discover Amazing Stories',
    description: 'Discover amazing stories, insights, and knowledge from our community of writers.',
    siteName: 'BlogHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BlogHub - Discover Amazing Stories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogHub - Discover Amazing Stories',
    description: 'Discover amazing stories, insights, and knowledge from our community of writers.',
    images: ['/og-image.jpg'],
    creator: '@bloghub',
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
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ErrorBoundary>
              <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <Navbar />
                <main className="flex-1 pt-16">
                  {children}
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
