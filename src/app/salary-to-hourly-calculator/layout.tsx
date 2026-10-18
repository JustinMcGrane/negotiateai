import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator — Convert Any Pay Rate Instantly | Hayven',
  description: 'Convert annual salary to hourly rate — or hourly to salary. Adjusts for hours worked per week and weeks per year.',
  alternates: { canonical: 'https://gethayven.com/salary-to-hourly-calculator' },
  openGraph: {
    type: 'website',
    title: 'Salary to Hourly Calculator — Convert Any Pay Rate Instantly | Hayven',
    description: 'Convert annual salary to hourly rate — or hourly to salary. Adjusts for hours worked per week and weeks per year.',
    url: 'https://gethayven.com/salary-to-hourly-calculator',
    images: [{ url: 'https://gethayven.com/salary-to-hourly-calculator/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary to Hourly Calculator — Convert Any Pay Rate Instantly | Hayven',
    description: 'Convert annual salary to hourly rate — or hourly to salary. Adjusts for hours worked per week and weeks per year.',
    images: ['https://gethayven.com/salary-to-hourly-calculator/opengraph-image'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Salary to Hourly Calculator',
      url: 'https://gethayven.com/salary-to-hourly-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free salary to hourly rate calculator. Convert annual salary to hourly, daily, weekly, and monthly pay.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
        { '@type': 'ListItem', position: 2, name: 'Salary to Hourly Calculator', item: 'https://gethayven.com/salary-to-hourly-calculator' },
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
