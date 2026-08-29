import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analyze Your Offer — Hayven',
  description: 'Get an instant breakdown of your job offer. Score it 0–100, spot red flags, and know exactly what to negotiate.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
