import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Suspense } from 'react'
import Script from 'next/script'
import { TrackingScripts } from '@/components/TrackingScripts'
import { PostHogPageview } from '@/components/PostHogProvider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Hayven — The compensation platform that pays for itself',
  description: "Know your market rate. Build your strategy. Practice until you're ready.",
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  metadataBase: new URL('https://gethayven.com'),
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Hayven',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hayven' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://client.crisp.chat" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body>
        {children}
        <Suspense><PostHogPageview /></Suspense>
        <Suspense><TrackingScripts /></Suspense>
        {/* Crisp chat — lazyOnload so it never blocks page render */}
        <Script id="crisp-init" strategy="lazyOnload">{`
          window.$crisp=[];
          window.CRISP_WEBSITE_ID="8d072771-7f71-417d-a1ab-fc79a523ed4b";
          (function(){var d=document;var s=d.createElement("script");
          s.src="https://client.crisp.chat/l.js";s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);})();
        `}</Script>
      </body>
    </html>
  )
}
