import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Resume Coach — ATS Score & Instant Feedback | Hayven',
  description: 'Upload your resume and get honest, specific feedback in seconds. Sarah identifies ATS issues, weak bullets, missing metrics, and rewrites sections so you can compete.',
  alternates: { canonical: 'https://gethayven.com/resume-coach' },
  openGraph: {
    title: 'AI Resume Coach — ATS Score & Instant Feedback',
    description: 'Upload your resume and get honest, specific feedback in seconds. Sarah identifies ATS issues, weak bullets, missing metrics, and rewrites sections so you can compete.',
    url: 'https://gethayven.com/resume-coach',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
