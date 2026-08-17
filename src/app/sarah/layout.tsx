import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Career Coach — Meet Sarah | Hayven',
  description: 'Sarah is your personalized AI career coach. Get salary advice, resume feedback, negotiation coaching, and interview prep — all in one conversation.',
}

export default function SarahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
