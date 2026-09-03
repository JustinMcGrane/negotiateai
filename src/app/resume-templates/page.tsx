import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Resume Templates — ATS-Friendly, Modern & Professional | Hayven',
  description: 'Download free resume templates built for ATS compatibility. Modern, professional, and executive designs with AI-powered feedback and bullet rewrites. Free to start.',
  alternates: { canonical: 'https://gethayven.com/resume-templates' },
  openGraph: {
    title: 'Free Resume Templates — ATS-Friendly | Hayven',
    description: 'Modern, professional, and executive resume templates with AI scoring and bullet rewrites.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Templates | Hayven',
    description: 'Free ATS-friendly resume templates with AI-powered feedback.',
  },
}

const templates = [
  {
    name: 'ATS Clean',
    tag: 'Most Popular',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
    desc: 'Single-column, plain formatting. Zero risk of ATS parsing errors. Best for large companies using automated screening.',
    good: ['Enterprise companies', 'High-volume applications', 'Applicant tracking systems'],
    href: '/resume-builder',
  },
  {
    name: 'Modern Professional',
    tag: 'Versatile',
    tagColor: '#4169E1',
    tagBg: '#eff6ff',
    desc: 'Two-column layout with a subtle accent color. Readable by most ATS systems. Best for companies that value design sensibility.',
    good: ['Tech companies', 'Startups', 'Creative roles'],
    href: '/resume-builder',
  },
  {
    name: 'Executive',
    tag: 'Senior Roles',
    tagColor: '#7c3aed',
    tagBg: '#f5f3ff',
    desc: 'Strong typographic hierarchy with space for a professional summary and board-level achievements. Built for VP+ and C-suite candidates.',
    good: ['Director, VP, C-suite', 'Board presentations', 'Executive search firms'],
    href: '/resume-builder',
  },
  {
    name: 'Minimal',
    tag: 'Design-Forward',
    tagColor: '#0f172a',
    tagBg: '#f1f5f9',
    desc: 'Generous whitespace, refined typography, no borders. Lets your content breathe. Popular in design, marketing, and consulting.',
    good: ['Design & creative roles', 'Consulting', 'Marketing and brand'],
    href: '/resume-builder',
  },
  {
    name: 'Technical',
    tag: 'Engineering',
    tagColor: '#b45309',
    tagBg: '#fffbeb',
    desc: 'Skills-first layout with monospace code-style skill tags. Signals technical depth immediately. Best for engineering and data roles.',
    good: ['Software engineers', 'Data scientists', 'DevOps and infrastructure'],
    href: '/resume-builder',
  },
  {
    name: 'Sales & Revenue',
    tag: 'Numbers First',
    tagColor: '#dc2626',
    tagBg: '#fef2f2',
    desc: 'Bold metric callouts and quota attainment highlights. Puts your numbers front and center. Built for AEs, SDRs, and sales leaders.',
    good: ['Account executives', 'Sales managers', 'Revenue and GTM roles'],
    href: '/resume-builder',
  },
]

const faqs = [
  {
    q: 'Which resume template is best for ATS?',
    a: 'The ATS Clean template is the safest choice for automated screening. It uses a single-column layout with no tables, columns, or graphics — the formatting patterns most likely to cause ATS parsing errors. If you\'re applying to large enterprises or roles with high application volume, start here.',
  },
  {
    q: 'What is the best resume template for 2025?',
    a: 'For most job seekers in 2025, a clean single-column or simple two-column template wins. ATS systems have improved, but multi-column layouts still cause parsing errors at many companies. The most important factor is content quality — an ATS-optimized template with strong impact bullets outperforms a visually impressive template with weak content every time.',
  },
  {
    q: 'Should I use a resume template or make my own?',
    a: 'Use a template. Starting from scratch wastes time on formatting decisions that don\'t affect your chances. A well-designed template keeps your focus on the content — the bullets, metrics, and keywords that actually determine whether you get an interview.',
  },
  {
    q: 'Are these resume templates free?',
    a: 'Yes. All Hayven resume templates are free to use. You can also run your existing resume through our AI analyzer for a free ATS score, section-by-section feedback, and a prioritized fix list — no credit card required.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function ResumeTemplatesPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
            Try Free <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#4169E1', background: '#eff6ff', padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: '0.06em' }}>FREE RESUME TEMPLATES</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: '#0f172a' }}>
          Resume templates that pass ATS<br />and impress hiring managers
        </h1>
        <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 36px' }}>
          Six ATS-tested designs — from clean single-column to executive. Pick your template, then let Hayven&apos;s AI score your content and rewrite your bullets.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
          Get Your Free Resume Score <ArrowRight size={16} />
        </Link>
        <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card · ATS score in 60 seconds</p>
      </section>

      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {templates.map(t => (
            <div key={t.name} style={{ border: '0.5px solid #e5e7eb', borderRadius: 14, padding: '24px 20px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: t.tagColor, background: t.tagBg, padding: '3px 10px', borderRadius: 20 }}>{t.tag}</span>
              </div>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, marginBottom: 16 }}>{t.desc}</p>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 8 }}>BEST FOR</div>
                {t.good.map(g => (
                  <div key={g} style={{ fontSize: 13, color: '#334155', marginBottom: 4 }}>· {g}</div>
                ))}
              </div>
              <Link href={t.href} style={{ display: 'block', textAlign: 'center', background: '#0f172a', color: '#fff', padding: '9px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                Use This Template
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 48, color: '#0f172a' }}>
            Resume templates by job role
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { label: 'Software Engineer', href: '/resume-builder/software-engineer' },
              { label: 'Product Manager', href: '/resume-builder/product-manager' },
              { label: 'Marketing Manager', href: '/resume-builder/marketing-manager' },
              { label: 'Account Executive', href: '/resume-builder/account-executive' },
              { label: 'Data Scientist', href: '/resume-builder/data-scientist' },
              { label: 'UX Designer', href: '/resume-builder/ux-designer' },
              { label: 'Project Manager', href: '/resume-builder/project-manager' },
              { label: 'Financial Analyst', href: '/resume-builder/financial-analyst' },
              { label: 'Operations Manager', href: '/resume-builder/operations-manager' },
            ].map(r => (
              <Link key={r.label} href={r.href} style={{ display: 'block', padding: '12px 16px', background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#334155', textDecoration: 'none' }}>
                {r.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 40, color: '#0f172a' }}>
          Frequently asked questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {faqs.map(f => (
            <div key={f.q}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{f.q}</div>
              <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.75 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#0f172a', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>Ready to build your resume?</div>
          <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 32, lineHeight: 1.65 }}>Pick a template, upload your resume, and get an ATS score with section-by-section feedback in under 60 seconds.</p>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
            Get Started Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', textAlign: 'center' }}>
        <Link href="/resume-builder" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>← All Resume Tools</Link>
      </footer>
    </div>
  )
}
