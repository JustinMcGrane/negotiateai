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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
