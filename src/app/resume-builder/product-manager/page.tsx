import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'Product Manager Resume — AI Builder & Templates | Hayven',
  description: 'Build a product manager resume that gets interviews. AI-powered ATS scoring, bullet rewrites, and PM-specific keyword analysis. Free to start.',
  alternates: { canonical: 'https://gethayven.com/resume-builder/product-manager' },
  openGraph: { title: 'Product Manager Resume Builder | Hayven', description: 'AI resume builder for PMs. ATS scoring, bullet rewrites, and PM-specific templates.' },
}

const bullets = {
  before: 'Managed the product roadmap and worked with engineering and design teams to ship features.',
  after: 'Owned the roadmap for Hayven\'s core discovery product, shipping 9 features in 6 months that drove a 38% increase in DAU and reduced churn by $1.2M ARR — leading a cross-functional team of 12.',
}

const tips = [
  { title: 'Lead with outcomes, not process', desc: 'PMs are hired to move metrics. Every bullet should reference what changed — DAU, revenue, retention, NPS — not just what you shipped.' },
  { title: 'Show cross-functional leadership', desc: 'Mention the size of teams you coordinated (engineering, design, data, sales, marketing). Scope signals seniority.' },
  { title: 'Include discovery work', desc: 'User research, A/B tests, competitive analysis, customer interviews — these show strategic PM thinking, not just execution.' },
  { title: 'OKR and roadmap language', desc: 'ATS systems for PM roles scan for "OKRs", "roadmap", "PRD", "go-to-market", "north star metric". Use these naturally.' },
  { title: 'Distinguish PM from APM', desc: 'If you\'re a senior PM, show ownership and direct accountability. If you\'re an APM, show learning speed and impact relative to your scope.' },
  { title: 'Business context matters', desc: 'B2B vs. B2C, enterprise vs. PLG, platform vs. feature — these distinctions matter to hiring managers. Name the business model you operated in.' },
]

const keywords = ['Product Roadmap', 'OKRs', 'PRD', 'User Research', 'A/B Testing', 'Go-to-Market', 'Stakeholder Management', 'Agile', 'KPIs', 'North Star Metric', 'DAU/MAU', 'Retention', 'ARR', 'NPS', 'SQL']

export default function ProductManagerResumePage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
            Try Free <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#4169E1', background: '#eff6ff', padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: '0.06em' }}>PRODUCT MANAGER RESUME</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: '#0f172a' }}>
          A product manager resume<br />that shows real impact
        </h1>
        <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 36px' }}>
          Get ATS scoring, PM-specific bullet rewrites, and keyword gap analysis tailored to product management roles — in under 60 seconds. Free to start.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
          Analyze My Resume — Free <ArrowRight size={16} />
        </Link>
        <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card · Results in 60 seconds</p>
      </section>

      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 40, color: '#0f172a' }}>What Hayven does to your bullets</h2>
          <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '10px 24px', background: '#f8fafc', borderBottom: '0.5px solid #e5e7eb', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>SENIOR PRODUCT MANAGER · BEFORE & AFTER</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ padding: 28, borderRight: '0.5px solid #e5e7eb' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#ef4444', marginBottom: 10, letterSpacing: '0.06em' }}>❌ BEFORE</div>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0, background: '#fef2f2', padding: '14px 16px', borderRadius: 8, borderLeft: '3px solid #ef4444' }}>{bullets.before}</p>
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#10b981', marginBottom: 10, letterSpacing: '0.06em' }}>✓ AFTER HAYVEN</div>
                <p style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.7, margin: 0, background: '#ecfdf5', padding: '14px 16px', borderRadius: 8, borderLeft: '3px solid #10b981' }}>{bullets.after}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 16, color: '#0f172a' }}>Keywords ATS systems look for in PM resumes</h2>
          <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>Hayven checks your resume for these and tells you exactly which are missing.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {keywords.map(k => (
              <span key={k} style={{ fontSize: 13, fontWeight: 600, padding: '7px 16px', borderRadius: 20, background: '#f1f5f9', color: '#334155', border: '0.5px solid #e2e8f0' }}>{k}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 48, color: '#0f172a' }}>How to write a product manager resume</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {tips.map(t => (
              <div key={t.title} style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <CheckCircle size={16} color="#10b981" />
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{t.title}</div>
                </div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24, color: '#0f172a' }}>What hiring managers look for in a PM resume in 2025</h2>
          <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.85 }}>
            <p style={{ marginBottom: 20 }}>Product management is one of the most competitive roles to break into — and one of the hardest to write a resume for. Unlike engineering, there&apos;s no code to show. Unlike sales, there&apos;s no quota to cite. The PM resume lives and dies on how well you can articulate the connection between your decisions and the outcomes that followed.</p>
            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>The metrics that matter most</h3>
            <p style={{ marginBottom: 20 }}>Product managers should prioritize these metrics in order: retention and churn, revenue and ARR, activation and onboarding, engagement (DAU/MAU), and NPS. If you have any of these, lead with them. If you don&apos;t have exact numbers, use relative improvements (e.g., &quot;reduced time-to-value by 60%&quot;) or scope indicators (e.g., &quot;for a product used by 2M monthly active users&quot;).</p>
            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>APM vs. PM vs. Senior PM vs. Director</h3>
            <p>Each level has different signal expectations. APMs should show curiosity, shipping velocity, and learning. PMs should show ownership of outcomes and cross-functional coordination. Senior PMs should show strategic initiative, business impact, and mentorship. Directors should show organizational influence and portfolio-level thinking. Calibrate your framing to the level you&apos;re targeting.</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Get your PM resume reviewed in 60 seconds</h2>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>ATS score, bullet rewrites, and a prioritized action plan — free.</p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
          Analyze My Resume — Free <ArrowRight size={15} />
        </Link>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>No credit card required</p>
      </section>


      <section style={{ padding: '40px 24px 0', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ borderTop: '0.5px solid #e5e7eb', paddingTop: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 16 }}>RELATED READING</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/blog/product-manager-resume" style={{ fontSize: 13, fontWeight: 600, color: '#4169E1', textDecoration: 'none', padding: '6px 14px', borderRadius: 20, background: '#eff6ff', border: '0.5px solid #bfdbfe' }}>Product Manager Resume Guide</Link>
            <Link href="/compensation-analyzer" style={{ fontSize: 13, fontWeight: 600, color: '#059669', textDecoration: 'none', padding: '6px 14px', borderRadius: 20, background: '#ecfdf5', border: '0.5px solid #a7f3d0' }}>Product Manager Market Rate</Link>
            <Link href="/resume-builder" style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none', padding: '6px 14px', borderRadius: 20, background: '#f1f5f9', border: '0.5px solid #e2e8f0' }}>All Resume Templates</Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        <Link href="/resume-builder" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← All Resume Templates</Link>
        <Link href="/login" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
        <Link href="/signup" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Sign up</Link>
      </footer>
    </div>
  )
}
