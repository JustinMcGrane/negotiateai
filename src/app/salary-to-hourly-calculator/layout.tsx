import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator — Convert Annual Pay to Hourly Rate | Hayven',
  description: 'Convert your annual salary to an hourly rate instantly. See your equivalent hourly pay based on a 40-hour work week, plus monthly and weekly breakdowns.',
  alternates: { canonical: 'https://gethayven.com/salary-to-hourly-calculator' },
  openGraph: {
    title: 'Salary to Hourly Calculator — Convert Annual Pay to Hourly Rate',
    description: 'Convert your annual salary to an hourly rate instantly. See your equivalent hourly pay based on a 40-hour work week, plus monthly and weekly breakdowns.',
    url: 'https://gethayven.com/salary-to-hourly-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
