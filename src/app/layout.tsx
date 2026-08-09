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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="8d072771-7f71-417d-a1ab-fc79a523ed4b";(function(){var d=document;var s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
        />
      </body>
    </html>
  )
}
