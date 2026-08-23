import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pay Raise Calculator — Calculate Your New Salary After a Raise | Hayven',
  description: 'Free pay raise calculator. Enter your current salary and raise percentage or dollar amount to instantly see your new salary, monthly increase, and weekly take-home pay.',
  alternates: { canonical: 'https://gethayven.com/raise-calculator' },
  openGraph: {
    title: 'Pay Raise Calculator — Calculate Your New Salary After a Raise | Hayven',
    description: 'Free pay raise calculator. Enter your current salary and raise percentage or dollar amount to instantly see your new salary, monthly increase, and weekly take-home pay.',
    url: 'https://gethayven.com/raise-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
