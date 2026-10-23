import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Estimate Take-Home Pay After Taxes | Hayven',
  description: 'Free paycheck calculator. Enter your salary, filing status, and state to estimate your federal and state taxes, FICA deductions, and net take-home pay per paycheck.',
  alternates: { canonical: 'https://gethayven.com/paycheck-calculator' },
  openGraph: {
    title: 'Paycheck Calculator — Estimate Take-Home Pay After Taxes',
    description: 'Free paycheck calculator. Enter your salary, filing status, and state to estimate your federal and state taxes, FICA deductions, and net take-home pay per paycheck.',
    url: 'https://gethayven.com/paycheck-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
