import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raise Calculator — Calculate Your Salary After a Raise | Hayven',
  description: 'Free raise calculator. Enter your current salary and raise percentage or dollar amount to see your new salary, monthly increase, and weekly increase instantly.',
  alternates: { canonical: 'https://gethayven.com/raise-calculator' },
  openGraph: {
    title: 'Raise Calculator — Calculate Your Salary After a Raise | Hayven',
    description: 'Free raise calculator. Enter your current salary and raise percentage or dollar amount to see your new salary, monthly increase, and weekly increase instantly.',
    url: 'https://gethayven.com/raise-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
