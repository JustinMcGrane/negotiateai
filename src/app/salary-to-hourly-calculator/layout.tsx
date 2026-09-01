import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator — Convert Annual Pay to Hourly Rate | Hayven',
  description: 'Free salary to hourly calculator. Convert any annual salary to an hourly rate — plus see your daily, weekly, and monthly pay breakdown. Works for any pay period.',
  alternates: { canonical: 'https://gethayven.com/salary-to-hourly-calculator' },
  openGraph: {
    title: 'Salary to Hourly Calculator — Free | Hayven',
    description: 'Convert your annual salary to an hourly rate instantly. See daily, weekly, and monthly breakdowns.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary to Hourly Calculator | Hayven',
    description: 'Free salary to hourly calculator. Convert annual pay to hourly rate and see full pay breakdown.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
