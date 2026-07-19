import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, FileText, Zap, Target, Star } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'AI Resume Builder — Hayven',
  description: 'Get recruiter-grade resume feedback with ATS scoring, section-by-section breakdown, rewritten bullets, and a prioritized action plan.',
}

const benefits = [
  {
    icon: Target,
    title: 'ATS optimization',
    desc: 'Know exactly how your resume scores against applicant tracking systems before a human ever sees it.',
  },
  {
    icon: FileText,
    title: 'Line-by-line feedback',
    desc: 'Every bullet, every section — reviewed the way a senior recruiter would review it. No fluff, no filler.',
  },
  {
    icon: Zap,
    title: 'Rewritten bullets',
    desc: 'Weak bullets get rewritten with specific metrics and impact language that hiring managers actually respond to.',
  },
]

const steps = [
  { number: '01', title: 'Paste your resume', desc: 'Copy and paste your current resume or type it in directly. No formatting required.' },
  { number: '02', title: 'Get your analysis', desc: 'Our AI reviews every section and scores your resume across structure, impact, keywords, and ATS readiness.' },
  { number: '03', title: 'Apply the fixes', desc: 'Work through a prioritized action plan with rewritten bullets and specific improvements you can apply immediately.' },
]

export default function ResumeBuilderPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <header style={{
        borderBottom: '0.5px solid #e5e7eb',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: '#fff', zIndex: 50,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Hayven" width={160} height={44} style={{ objectFit: 'contain' }} priority />
        </Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" prefetch={true} style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>
            Sign in
          </Link>
          <Link href="/signup" style={{
            fontSize: 14, fontWeight: 600,
            background: '#141414', color: '#fff',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            Get started free <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '88px 24px 72px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: 20, padding: '5px 14px', marginBottom: 28,
        }}>
          <Star size={12} color="#16a34a" fill="#16a34a" />
          <span style={{ fontSize: 12, color: '#15803d', fontWeight: 600 }}>AI Resume Analyzer</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(30px, 5vw, 50px)',
          fontWeight: 800, lineHeight: 1.15,
          letterSpacing: '-0.03em', marginBottom: 24, color: '#0f172a',
        }}>
          Your resume, reviewed<br />
          <span style={{ color: '#2563eb' }}>the way recruiters see it.</span>
        </h1>

        <p style={{
          fontSize: 18, color: '#475569', lineHeight: 1.7,
          maxWidth: 560, margin: '0 auto 40px',
        }}>
          Get honest, recruiter-grade feedback on your resume — ATS score, section-by-section breakdown, rewritten bullets, and a clear action plan.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <Link href="/signup" style={{
            height: 48, display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 28px', background: '#141414', color: '#fff',
            borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none',
          }}>
            Analyze my resume free <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['No account required to try', 'Results in under 30 seconds', '100% free to start'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
              <CheckCircle size={14} color="#16a34a" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 12 }}>
            Not a resume template. A resume coach.
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 56, maxWidth: 520, margin: '0 auto 56px' }}>
            Most resume tools just format your words. We tell you what's wrong and how to fix it.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: '28px 24px' }}>
                <div style={{ width: 40, height: 40, background: '#f0f4ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <b.icon size={18} color="#2563eb" />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{b.title}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 56 }}>
          How it works
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((s, i) => (
            <div key={s.number} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#94a3b8', minWidth: 32, paddingTop: 2 }}>{s.number}</div>
              <div style={{ flex: 1, paddingBottom: i < steps.length - 1 ? 32 : 0, borderBottom: i < steps.length - 1 ? '0.5px solid #e5e7eb' : 'none' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Stop guessing. Start getting interviews.
        </h2>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
          Find out exactly what's holding your resume back — and get the fixes to do something about it.
        </p>
        <Link href="/signup" style={{
          height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '0 32px', background: '#fff', color: '#0f172a',
          borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
        }}>
          Analyze my resume free <ArrowRight size={15} />
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(({ href, label }) => (
          <Link key={href} href={href} prefetch={true} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
        ))}
      </footer>
    </div>
  )
}
