import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service — Hayven',
  description: 'Terms and conditions for using Hayven.',
}

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using Hayven ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. We may update these terms at any time; continued use after changes constitutes acceptance.`,
  },
  {
    title: '2. Description of Service',
    body: `Hayven provides AI-powered career and salary negotiation tools including an AI recruiter, resume analysis, job search, compensation benchmarking, and negotiation guidance. The Service is intended for personal, non-commercial use by job seekers and working professionals.`,
  },
  {
    title: '3. Accounts',
    body: `You must create an account to access most features. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must provide accurate information and must not impersonate another person or entity.`,
  },
  {
    title: '4. Subscriptions and Billing',
    body: `Some features require a paid subscription (Pro or Elite plan). Subscriptions are billed in advance on a monthly or annual basis. You may cancel at any time; cancellation takes effect at the end of the current billing period. We do not provide refunds for partial periods.`,
  },
  {
    title: '5. Acceptable Use',
    body: `You agree not to: use the Service for any unlawful purpose; attempt to reverse-engineer, scrape, or reproduce the Service's AI outputs at scale; share your account credentials with others; or use the Service to harass or harm any person. We reserve the right to suspend accounts that violate these rules.`,
  },
  {
    title: '6. AI-Generated Content',
    body: `The Service uses artificial intelligence to generate advice, scripts, and analysis. This content is for informational purposes only and does not constitute legal, financial, or professional advice. You are solely responsible for any decisions you make based on AI-generated content.`,
  },
  {
    title: '7. Intellectual Property',
    body: `Hayven and its underlying software, brand, and content are owned by us and protected by applicable intellectual property laws. You retain ownership of any content you submit (resume text, job details, etc.) and grant us a limited license to process it to provide the Service.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `To the maximum extent permitted by law, Hayven is not liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability to you for any claim will not exceed the amount you paid us in the 12 months prior to the event giving rise to the claim.`,
  },
  {
    title: '9. Termination',
    body: `We may suspend or terminate your access at any time for violation of these terms or for any other reason at our discretion. You may delete your account at any time from the Account settings page.`,
  },
  {
    title: '10. Governing Law',
    body: `These Terms are governed by the laws of the United States. Any disputes shall be resolved in the applicable courts of the United States, and you consent to personal jurisdiction in those courts.`,
  },
  {
    title: '11. Contact',
    body: `If you have questions about these Terms, email us at GetHayven@gmail.com.`,
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b', textDecoration: 'none', marginBottom: 40 }}>
          <ArrowLeft size={14} /> Back to Hayven
        </Link>

        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 48 }}>Last updated: July 22, 2026</p>

        {SECTIONS.map((s) => (
          <div key={s.title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{s.title}</h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
