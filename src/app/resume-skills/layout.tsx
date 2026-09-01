import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Skills to Put on a Resume — Examples by Job Type | Hayven',
  description: 'Discover the best skills to put on a resume. Browse top technical skills, soft skills, and computer skills with examples for every industry and job type.',
  alternates: { canonical: 'https://gethayven.com/resume-skills' },
  openGraph: {
    title: 'Best Resume Skills List — Examples by Job | Hayven',
    description: 'The best technical skills, soft skills, and computer skills to put on your resume for any role.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Resume Skills to List | Hayven',
    description: 'Browse top resume skills by category and job type with real examples.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
