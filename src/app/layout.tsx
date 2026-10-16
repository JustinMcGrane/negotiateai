import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hayven — AI Career Coaching & Salary Negotiation',
  description: "AI-powered career coaching for salary negotiation, raise requests, and compensation guidance. Know your market rate, build your strategy, and get paid what you're worth.",
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  metadataBase: new URL('https://gethayven.com'),
  openGraph: {
    siteName: 'Hayven',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://gethayven.com/opengraph-image', width: 1200, height: 630, alt: 'Hayven — AI Career Coaching & Salary Negotiation' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://gethayven.com/opengraph-image'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hayven',
  url: 'https://gethayven.com',
  logo: 'https://gethayven.com/logo.png',
  description: 'AI-powered career coaching platform for salary negotiation, raise requests, and compensation guidance.',
  sameAs: [
    'https://www.linkedin.com/company/gethayven',
    'https://twitter.com/gethayven',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hayven',
  url: 'https://gethayven.com',
  description: 'AI-powered career coaching for salary negotiation and compensation guidance.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://gethayven.com/blog?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  )
}
