import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator — Convert Annual Salary to Hourly Rate | Hayven',
  description: 'Free salary to hourly calculator. Find out how much $100k, $120k, or any annual salary is per hour — or how much $45/hr is a year. Includes monthly, weekly, and daily breakdowns.',
  alternates: { canonical: 'https://gethayven.com/salary-to-hourly-calculator' },
  openGraph: {
    title: 'Salary to Hourly Calculator — Convert Annual Salary to Hourly Rate | Hayven',
    description: 'Free salary to hourly calculator. Find out how much $100k, $120k, or any annual salary is per hour. Includes monthly, weekly, and daily breakdowns.',
    url: 'https://gethayven.com/salary-to-hourly-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
