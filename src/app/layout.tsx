import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Suspense } from 'react'
import { TrackingScripts } from '@/components/TrackingScripts'
import { PostHogProvider, PostHogPageview } from '@/components/PostHogProvider'

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
      <body>
        <PostHogProvider>
          <Providers>{children}</Providers>
        </PostHogProvider>
        <Suspense><PostHogPageview /></Suspense>
        <Suspense><TrackingScripts /></Suspense>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="8d072771-7f71-417d-a1ab-fc79a523ed4b";(function(){var d=document;var s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1715783759494425');fbq('track','PageView');`,
          }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1715783759494425&ev=PageView&noscript=1"/>` }} />
      </body>
    </html>
  )
}
