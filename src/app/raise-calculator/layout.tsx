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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
