import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Career Coach — Meet Sarah | Hayven',
  description: 'Sarah is your personalized AI career coach. Get salary advice, resume feedback, negotiation coaching, and interview prep — all in one conversation.',
  alternates: { canonical: 'https://gethayven.com/sarah' },
  openGraph: {
    title: 'AI Career Coach — Meet Sarah | Hayven',
    description: 'Sarah is your personalized AI career coach. Get salary advice, resume feedback, negotiation coaching, and interview prep — all in one conversation.',
    url: 'https://gethayven.com/sarah',
    type: 'website',
  },
}

export default function SarahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
