import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'Data Scientist Resume — AI Builder & Templates | Hayven',
  description: 'Build a data scientist resume that gets interviews. AI-powered ATS scoring, bullet rewrites, and DS-specific keyword analysis. Free to start.',
  alternates: { canonical: 'https://gethayven.com/resume-builder/data-scientist' },
  openGraph: { title: 'Data Scientist Resume Builder | Hayven', description: 'AI resume builder for data scientists. ATS scoring, bullet rewrites, and DS templates.' },
}

const bullets = {
  before: 'Built machine learning models to help the team make better business decisions.',
  after: 'Built a churn prediction model (XGBoost, 91% AUC) that identified at-risk accounts 30 days earlier — enabling targeted outreach that reduced churn by 18% and saved $2.3M ARR annually.',
}

const tips = [
  { title: 'Model performance metrics are required', desc: 'AUC, F1, precision/recall, RMSE — always include model performance metrics. "Built a model" means nothing. "Built a model with 91% AUC" means everything.' },
  { title: 'Business impact over technical complexity', desc: 'Hiring managers care more about what the model did for the business than how it worked. Lead with the outcome, then mention the method.' },
  { title: 'Stack and tools matter a lot', desc: 'Python, SQL, R, TensorFlow, PyTorch, Spark, Databricks, Airflow, dbt, Snowflake — ATS systems for DS roles scan for these. List them in a dedicated Skills section.' },
  { title: 'Scale gives context', desc: 'How large was the dataset? How many predictions per day? How much compute? Scale tells recruiters whether you can handle their data environment.' },
  { title: 'Deployed vs. prototype', desc: 'Distinguish between models you deployed to production and experiments that stayed in notebooks. Production experience is significantly more valuable.' },
  { title: 'Domain expertise compounds', desc: 'Healthcare, fintech, e-commerce, NLP, computer vision — domain-specific DS experience is a major differentiator. Name your domain explicitly in your summary.' },
]

const keywords = ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Spark', 'A/B Testing', 'Statistical Modeling', 'Data Pipeline', 'Databricks', 'Snowflake', 'scikit-learn', 'NLP', 'Feature Engineering']

export default function DataScientistResumePage() {
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
        <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#4169E1', background: '#eff6ff', padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: '0.06em' }}>DATA SCIENTIST RESUME</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: '#0f172a' }}>
          A data scientist resume<br />that shows real business impact
        </h1>
        <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 36px' }}>
          Get ATS scoring, DS-specific bullet rewrites, and keyword gap analysis for your target role — in under 60 seconds. Free to start.
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
            <div style={{ padding: '10px 24px', background: '#f8fafc', borderBottom: '0.5px solid #e5e7eb', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>DATA SCIENTIST · BEFORE & AFTER</div>
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
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 36, color: '#0f172a' }}>Keywords ATS systems look for in DS resumes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {keywords.map(k => (
              <span key={k} style={{ fontSize: 13, fontWeight: 600, padding: '7px 16px', borderRadius: 20, background: '#f1f5f9', color: '#334155', border: '0.5px solid #e2e8f0' }}>{k}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 48, color: '#0f172a' }}>How to write a data scientist resume</h2>
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

      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Get your DS resume reviewed in 60 seconds</h2>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>ATS score, bullet rewrites, and a prioritized action plan — free.</p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
          Analyze My Resume — Free <ArrowRight size={15} />
        </Link>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>No credit card required</p>
      </section>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        <Link href="/resume-builder" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← All Resume Templates</Link>
        <Link href="/login" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
        <Link href="/signup" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Sign up</Link>
      </footer>
    </div>
  )
}
