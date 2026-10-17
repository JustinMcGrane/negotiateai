import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Resume Coach — Get Expert Resume Feedback | Hayven',
  description: 'Upload your resume and get instant, specific feedback from an AI resume coach. Fix weak bullets, improve ATS scores, and download a polished resume PDF.',
  alternates: {
    canonical: 'https://gethayven.com/resume-coach',
  },
  openGraph: {
    type: 'website',
    title: 'AI Resume Coach — Get Expert Resume Feedback | Hayven',
    description: 'Upload your resume and get instant, specific feedback from an AI resume coach. Fix weak bullets, improve ATS scores, and download a polished resume PDF.',
    url: 'https://gethayven.com/resume-coach',
    images: [{ url: 'https://gethayven.com/resume-coach/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Coach — Get Expert Resume Feedback | Hayven',
    description: 'Upload your resume and get instant, specific feedback from an AI resume coach. Fix weak bullets, improve ATS scores, and download a polished resume PDF.',
    images: ['https://gethayven.com/resume-coach/opengraph-image'],
  },
}

export default function ResumeCoachLayout({ children }: { children: React.ReactNode }) {
  return children
}
