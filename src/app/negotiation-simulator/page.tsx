import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Mic, BarChart2, RefreshCw, Star } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'Negotiation Simulator — Hayven',
  description: 'Practice salary negotiation with a realistic AI recruiter. Get scored feedback so you walk into the real conversation prepared.',
}

const benefits = [
  { icon: Mic, title: 'Realistic AI recruiter', desc: 'Practice against a recruiter who pushes back, throws objections, and responds like a real hiring manager.' },
  { icon: BarChart2, title: 'Scored debrief', desc: 'Get a score and specific feedback on every session — what landed, what fell flat, and what to do differently.' },
  { icon: RefreshCw, title: 'Run it as many times as you need', desc: 'Repetition builds confidence. Run the same scenario until the silence after your ask stops feeling threatening.' },
]

const steps = [
  { number: '01', title: 'Set up your scenario', desc: 'Tell us about your role, the offer you received, and your target number.' },
  { number: '02', title: 'Practice the conversation', desc: 'Negotiate with Sarah, our AI recruiter, in a realistic back-and-forth simulation.' },
  { number: '03', title: 'Get your debrief', desc: 'See your score, what worked, what didn\'t, and specific lines to improve for next time.' },
]

export default function NegotiationSimulatorPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}><Image src="/logo.png" alt="Hayven" width={160} height={44} style={{ objectFit: 'contain' }} priority /></Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" prefetch={true} style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 600, background: '#141414', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>Get started free <ArrowRight size={14} /></Link>
        </div>
      </header>

      <section style={{ maxWidth: 760, margin: '0 auto', padding: '88px 24px 72px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 20, padding: '5px 14px', marginBottom: 28 }}>
          <Star size={12} color="#16a34a" fill="#16a34a" />
          <span style={{ fontSize: 12, color: '#15803d', fontWeight: 600 }}>Negotiation Simulator</span>
        </div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 24, color: '#0f172a' }}>
          Practice until<br /><span style={{ color: '#2563eb' }}>it feels easy.</span>
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
          Negotiate with a realistic AI recruiter, get scored feedback, and walk into the real conversation knowing exactly what to say.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <Link href="/signup" style={{ height: 48, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 28px', background: '#141414', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Start practicing free <ArrowRight size={15} /></Link>
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Realistic AI recruiter', 'Scored feedback', 'Free to start'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}><CheckCircle size={14} color="#16a34a" />{t}</div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 12 }}>The negotiation falls apart in the silence.</h2>
          <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 520, margin: '0 auto 56px' }}>Most people know what to say. They freeze when the recruiter pushes back. Practice fixes that.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: '28px 24px' }}>
                <div style={{ width: 40, height: 40, background: '#f0f4ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><b.icon size={18} color="#2563eb" /></div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{b.title}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 56 }}>How it works</h2>
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

      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>The real conversation is coming. Practice now.</h2>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto 36px' }}>Start your first simulation free — no credit card required.</p>
        <Link href="/signup" style={{ height: 50, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 32px', background: '#fff', color: '#0f172a', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>Start practicing free <ArrowRight size={15} /></Link>
      </section>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24 }}>
        {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(({ href, label }) => (
          <Link key={href} href={href} prefetch={true} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
        ))}
      </footer>
    </div>
  )
}
