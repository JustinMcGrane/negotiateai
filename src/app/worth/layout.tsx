import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Am I Underpaid? Check Your Market Value Free | Hayven',
  description: 'Enter your job title, location, and current salary to instantly see the market median for your role and find out exactly how much you could be leaving on the table.',
  alternates: { canonical: 'https://gethayven.com/worth' },
  openGraph: {
    title: 'Am I Underpaid? Check Your Market Value Free',
    description: 'Enter your job title, location, and current salary to instantly see the market median for your role and find out exactly how much you could be leaving on the table.',
    url: 'https://gethayven.com/worth',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
