import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Take-Home Pay After Taxes | Hayven',
  description: 'Free paycheck calculator. Calculate your take-home pay after federal and state income taxes for any pay period — weekly, biweekly, semi-monthly, or monthly.',
  alternates: { canonical: 'https://gethayven.com/paycheck-calculator' },
  openGraph: {
    title: 'Paycheck Calculator — Free | Hayven',
    description: 'Calculate take-home pay after federal and state taxes for any pay period.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paycheck Calculator | Hayven',
    description: 'Free paycheck calculator. See your take-home pay after taxes for weekly, biweekly, or monthly pay.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
