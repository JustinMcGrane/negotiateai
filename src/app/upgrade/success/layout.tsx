import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to Pro — Hayven',
  description: 'Your Hayven Pro account is active.',
  robots: { index: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
