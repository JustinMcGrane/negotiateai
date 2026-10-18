import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raise Calculator — See Exactly How Much More You\'ll Earn | Hayven',
  description: 'Calculate your exact salary after a raise. See new annual pay, monthly increase, and weekly take-home before you negotiate.',
  alternates: { canonical: 'https://gethayven.com/raise-calculator' },
  openGraph: {
    type: 'website',
    title: 'Raise Calculator — See Exactly How Much More You\'ll Earn | Hayven',
    description: 'Calculate your exact salary after a raise. See new annual pay, monthly increase, and weekly take-home before you negotiate.',
    url: 'https://gethayven.com/raise-calculator',
    images: [{ url: 'https://gethayven.com/raise-calculator/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raise Calculator — See Exactly How Much More You\'ll Earn | Hayven',
    description: 'Calculate your exact salary after a raise. See new annual pay, monthly increase, and weekly take-home before you negotiate.',
    images: ['https://gethayven.com/raise-calculator/opengraph-image'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Raise Calculator',
      url: 'https://gethayven.com/raise-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free salary raise calculator. Calculate your new salary after a percent or dollar raise.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
        { '@type': 'ListItem', position: 2, name: 'Raise Calculator', item: 'https://gethayven.com/raise-calculator' },
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
