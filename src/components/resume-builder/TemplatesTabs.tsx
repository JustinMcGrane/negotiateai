'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const resumeTemplates = [
  { accent: '#0f2240', accentLabel: 'Classic Navy', lineStyle: 'none' },
  { accent: '#e05c2a', accentLabel: 'Modern Coral', lineStyle: 'solid' },
  { accent: '#1e3a5f', accentLabel: 'Clean Slate', lineStyle: 'double' },
]

const coverLetterTemplates = [
  { accent: '#0f2240', label: 'Professional', opening: 'I am writing to express my interest in the Senior Product Manager role at Stripe. With 7 years of experience building B2B SaaS products that drove measurable revenue growth, I am confident I can contribute immediately to your team.' },
  { accent: '#e05c2a', label: 'Direct Impact', opening: 'In my last role at Notion, I owned the templates marketplace from zero to 500K monthly active users in 14 months. I\'m applying to Stripe because I want to bring that same product velocity to your enterprise platform.' },
  { accent: '#1e3a5f', label: 'Career Change', opening: 'My background in consulting gave me rigorous analytical skills, but what I kept being drawn to was the product decisions that shaped user behavior. That\'s why I\'m transitioning into product management — and why Stripe\'s approach to developer experience excites me.' },
]

function ResumeCard({ t, i }: { t: typeof resumeTemplates[0]; i: number }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '24px 20px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', fontSize: 8, lineHeight: 1.5, color: '#1e293b', position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: t.accent, marginBottom: 2 }}>Alex Johnson</div>
      {t.lineStyle === 'solid' && <div style={{ height: 2, background: t.accent, marginBottom: 6 }} />}
      {t.lineStyle === 'double' && <div style={{ borderTop: `2px solid ${t.accent}`, borderBottom: `1px solid ${t.accent}`, height: 4, marginBottom: 6 }} />}
      <div style={{ fontSize: 8, color: '#64748b', marginBottom: 10 }}>San Francisco, CA · alex@email.com · linkedin.com/in/alexjohnson</div>
      <div style={{ fontSize: 8, color: '#475569', lineHeight: 1.6, marginBottom: 10 }}>
        7+ years of product management experience driving growth in B2B SaaS. Increased ARR by 40%, reduced churn by 22%, and led cross-functional teams of 12+ across 3 product lines.
      </div>
      <div style={{ fontWeight: 800, fontSize: 9, color: t.accent, borderBottom: `1px solid ${t.accent}`, paddingBottom: 3, marginBottom: 8, letterSpacing: '0.04em' }}>WORK EXPERIENCE</div>
      <div style={{ fontWeight: 700, fontSize: 9, marginBottom: 1 }}>Senior Product Manager · Stripe</div>
      <div style={{ fontSize: 8, color: '#64748b', marginBottom: 5 }}>New York, United States · 2021–Present</div>
      {['Grew activation rate from 38% to 61% in 6 months by redesigning onboarding flow — reducing time-to-value from 9 days to 2.', 'Launched 3 pricing experiments that increased enterprise ACV by $18K and contributed to 28% ARR growth in FY23.', 'Led a 6-person squad to ship a self-serve analytics dashboard, cutting support tickets by 34%.'].map((b, j) => (
        <div key={j} style={{ display: 'flex', gap: 5, marginBottom: 4 }}>
          <span style={{ color: t.accent, flexShrink: 0 }}>•</span>
          <span style={{ fontSize: 8, color: '#334155', lineHeight: 1.5 }}>{b}</span>
        </div>
      ))}
      <div style={{ fontWeight: 800, fontSize: 9, color: t.accent, borderBottom: `1px solid ${t.accent}`, paddingBottom: 3, marginBottom: 8, marginTop: 10, letterSpacing: '0.04em' }}>EDUCATION</div>
      <div style={{ fontWeight: 700, fontSize: 9 }}>B.S. Computer Science · Stanford University</div>
      <div style={{ fontSize: 8, color: '#64748b' }}>2015–2019</div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 9, fontWeight: 600, color: '#94a3b8' }}>{t.accentLabel}</div>
    </div>
  )
}

function CoverLetterCard({ t }: { t: typeof coverLetterTemplates[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '24px 20px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', fontSize: 8, lineHeight: 1.5, color: '#1e293b', position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontWeight: 800, fontSize: 14, color: t.accent, marginBottom: 2 }}>Alex Johnson</div>
      <div style={{ fontSize: 8, color: '#64748b', marginBottom: 10, borderBottom: `1px solid ${t.accent}`, paddingBottom: 8 }}>alex@email.com · linkedin.com/in/alexjohnson</div>
      <div style={{ fontSize: 8, color: '#64748b', marginBottom: 10 }}>Hiring Manager<br />Stripe, Inc.<br />New York, NY</div>
      <div style={{ fontWeight: 700, fontSize: 9, marginBottom: 8 }}>Re: Senior Product Manager</div>
      <div style={{ fontSize: 8, color: '#334155', lineHeight: 1.65, marginBottom: 8 }}>{t.opening}</div>
      <div style={{ fontSize: 8, color: '#334155', lineHeight: 1.65, marginBottom: 8 }}>
        I have led cross-functional teams of 12+ across 3 product lines, consistently delivering measurable results against OKRs. I would welcome the opportunity to discuss how my experience aligns with your team&apos;s goals.
      </div>
      <div style={{ fontSize: 8, color: '#334155', lineHeight: 1.65 }}>Sincerely,<br /><strong>Alex Johnson</strong></div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 9, fontWeight: 600, color: '#94a3b8' }}>{t.label}</div>
    </div>
  )
}

export function TemplatesTabs() {
  const [tab, setTab] = useState<'resumes' | 'cover-letters'>('resumes')

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 40 }}>
        <button
          onClick={() => setTab('resumes')}
          style={{
            fontSize: 15, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            color: tab === 'resumes' ? '#0f172a' : '#94a3b8',
            borderBottom: tab === 'resumes' ? '2px solid #0f172a' : '2px solid transparent',
          }}
        >
          Resumes
        </button>
        <button
          onClick={() => setTab('cover-letters')}
          style={{
            fontSize: 15, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            color: tab === 'cover-letters' ? '#0f172a' : '#94a3b8',
            borderBottom: tab === 'cover-letters' ? '2px solid #0f172a' : '2px solid transparent',
          }}
        >
          Cover Letters
        </button>
      </div>

      {tab === 'resumes' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {resumeTemplates.map((t, i) => <ResumeCard key={i} t={t} i={i} />)}
        </div>
      )}

      {tab === 'cover-letters' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {coverLetterTemplates.map((t, i) => <CoverLetterCard key={i} t={t} />)}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <Link href="/signup" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#0f2240', color: '#fff',
          padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none',
        }}>
          {tab === 'resumes' ? 'Use a free template' : 'Write a cover letter'} <ArrowRight size={14} />
        </Link>
        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>No credit card required</p>
      </div>
    </>
  )
}
