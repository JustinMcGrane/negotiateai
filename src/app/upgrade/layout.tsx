import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upgrade to Pro — Hayven',
  description: 'Unlock unlimited access to Sarah, all negotiation tools, resume builder, and more. Pro is $20/month. Cancel anytime.',
  robots: { index: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
