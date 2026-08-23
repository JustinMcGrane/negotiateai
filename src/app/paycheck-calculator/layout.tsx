import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Calculate Your Take-Home Pay by State | Hayven',
  description: 'Free paycheck calculator. See your take-home pay after federal and state taxes for any state — including NC, NY, Ohio, California, Texas, and more. Calculate your net pay instantly.',
  alternates: { canonical: 'https://gethayven.com/paycheck-calculator' },
  openGraph: {
    title: 'Paycheck Calculator — Calculate Your Take-Home Pay by State | Hayven',
    description: 'Free paycheck calculator. See your take-home pay after federal and state taxes for any state — including NC, NY, Ohio, California, Texas, and more.',
    url: 'https://gethayven.com/paycheck-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
