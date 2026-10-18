import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Skills List — Top Skills to Put on Your Resume in 2025 | Hayven',
  description: 'Browse 200+ in-demand resume skills across tech, marketing, project management, and more. Find the right keywords to get past ATS and impress recruiters.',
  alternates: { canonical: 'https://gethayven.com/resume-skills' },
  openGraph: {
    type: 'website',
    title: 'Resume Skills List — Top Skills to Put on Your Resume in 2025 | Hayven',
    description: 'Browse 200+ in-demand resume skills across tech, marketing, project management, and more. Find the right keywords to get past ATS and impress recruiters.',
    url: 'https://gethayven.com/resume-skills',
    images: [{ url: 'https://gethayven.com/resume-skills/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Skills List — Top Skills to Put on Your Resume in 2025 | Hayven',
    description: 'Browse 200+ in-demand resume skills across tech, marketing, project management, and more. Find the right keywords to get past ATS and impress recruiters.',
    images: ['https://gethayven.com/resume-skills/opengraph-image'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Resume Skills List',
      url: 'https://gethayven.com/resume-skills',
      description: 'Browse 200+ in-demand resume skills across tech, marketing, project management, and more.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
        { '@type': 'ListItem', position: 2, name: 'Resume Skills', item: 'https://gethayven.com/resume-skills' },
      ],
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
