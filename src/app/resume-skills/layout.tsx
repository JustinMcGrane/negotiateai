import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Skills List — Best Skills to Put on a Resume in 2026 | Hayven',
  description: 'Browse 200+ in-demand resume skills by category: tech, marketing, design, finance, operations, and more. Copy the exact keywords that get past ATS and impress hiring managers.',
  alternates: { canonical: 'https://gethayven.com/resume-skills' },
  openGraph: {
    title: 'Resume Skills List — Best Skills to Put on a Resume in 2026',
    description: 'Browse 200+ in-demand resume skills by category: tech, marketing, design, finance, operations, and more. Copy the exact keywords that get past ATS and impress hiring managers.',
    url: 'https://gethayven.com/resume-skills',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
