import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Estimate Your Take-Home Pay | Hayven',
  description: 'Calculate your net paycheck after federal and state taxes, Social Security, and Medicare. Supports all 50 states and multiple filing statuses.',
  alternates: { canonical: 'https://gethayven.com/paycheck-calculator' },
  openGraph: {
    type: 'website',
    title: 'Paycheck Calculator — Estimate Your Take-Home Pay | Hayven',
    description: 'Calculate your net paycheck after federal and state taxes, Social Security, and Medicare. Supports all 50 states and multiple filing statuses.',
    url: 'https://gethayven.com/paycheck-calculator',
    images: [{ url: 'https://gethayven.com/paycheck-calculator/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paycheck Calculator — Estimate Your Take-Home Pay | Hayven',
    description: 'Calculate your net paycheck after federal and state taxes, Social Security, and Medicare. Supports all 50 states and multiple filing statuses.',
    images: ['https://gethayven.com/paycheck-calculator/opengraph-image'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Paycheck Calculator',
      url: 'https://gethayven.com/paycheck-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free paycheck calculator. Calculate take-home pay after federal and state taxes for any pay period.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
        { '@type': 'ListItem', position: 2, name: 'Paycheck Calculator', item: 'https://gethayven.com/paycheck-calculator' },
      ],
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
