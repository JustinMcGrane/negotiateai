import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Am I Underpaid? Find Out Your Market Rate — Hayven',
  description: 'Enter your role, level, and city — find out in 30 seconds if you\'re underpaid and by how much. See what professionals like you are actually earning.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
