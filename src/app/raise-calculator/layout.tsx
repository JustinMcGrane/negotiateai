import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raise Calculator — Calculate Your New Salary After a Raise | Hayven',
  description: 'Free salary raise calculator. Enter your current salary and raise percentage or amount to see your new pay — annually, monthly, biweekly, and hourly.',
  alternates: { canonical: 'https://gethayven.com/raise-calculator' },
  openGraph: {
    title: 'Raise Calculator — Free | Hayven',
    description: 'Calculate your new salary after a raise. See annual, monthly, and hourly pay breakdown instantly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raise Calculator | Hayven',
    description: 'Free salary raise calculator. Calculate your new pay after any raise percentage or dollar amount.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
