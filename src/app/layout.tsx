import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Suspense } from 'react'
import { TrackingScripts } from '@/components/TrackingScripts'
import { PostHogProvider, PostHogPageview } from '@/components/PostHogProvider'

export const metadata: Metadata = {
  title: 'Hayven — The compensation platform that pays for itself',
  description: "Know your market rate. Build your strategy. Practice until you're ready.",
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <Providers>{children}</Providers>
        </PostHogProvider>
        <Suspense><PostHogPageview /></Suspense>
        <Suspense><TrackingScripts /></Suspense>
      </body>
    </html>
  )
}
