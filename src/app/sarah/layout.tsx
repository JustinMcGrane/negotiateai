import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Career Coach — Meet Sarah | Hayven',
  description: 'Sarah is your free personalized career coach. Get salary advice, resume feedback, negotiation coaching, and interview prep — all in one conversation. Free to start.',
}

export default function SarahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
