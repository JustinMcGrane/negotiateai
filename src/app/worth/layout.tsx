import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Out What You\'re Worth — Hayven',
  description: 'Get your personalized market rate. See what professionals in your role, level, and city are actually earning.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
