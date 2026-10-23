import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Raise Calculator — See Exactly How Much More You'll Take Home | Hayven",
  description: 'Calculate your raise in seconds. Enter your current salary and raise percentage or amount to see your new salary, monthly pay, and take-home increase after taxes.',
  alternates: { canonical: 'https://gethayven.com/raise-calculator' },
  openGraph: {
    title: "Raise Calculator — See Exactly How Much More You'll Take Home",
    description: 'Calculate your raise in seconds. Enter your current salary and raise percentage or amount to see your new salary, monthly pay, and take-home increase after taxes.',
    url: 'https://gethayven.com/raise-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
