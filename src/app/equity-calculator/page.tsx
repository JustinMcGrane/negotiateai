import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, DollarSign, Percent, Clock } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'Equity Calculator — Hayven',
  description: 'Find out what your stock options and RSUs are actually worth — today and at exit — so you can negotiate equity like you know what you\'re doing.',
}

const benefits = [
  { icon: DollarSign, title: 'Real dollar value', desc: 'Convert shares, strike prices, and vesting schedules into actual dollars — not abstract percentages.' },
  { icon: Percent, title: 'Dilution and exit modeling', desc: 'Understand how future funding rounds affect your stake and what different exit scenarios mean for you.' },
  { icon: Clock, title: 'Vesting schedule clarity', desc: 'See exactly when your equity vests, what it\'s worth at each milestone, and how to evaluate the cliff.' },
]

const steps = [
  { number: '01', title: 'Enter your equity details', desc: 'Input your shares, strike price, current valuation, and vesting schedule.' },
  { number: '02', title: 'Model your scenarios', desc: 'See your equity value at different exit multiples — conservative, realistic, and optimistic.' },
  { number: '03', title: 'Negotiate from data', desc: 'Walk into equity conversations knowing what you have, what it\'s worth, and what to ask for.' },
]

export default function EquityCalculatorPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}><Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority /></Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" prefetch={true} style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 600, background: '#141414', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>Get started free <ArrowRight size={14} /></Link>
        </div>
      </header>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 72px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(36px, 6.5vw, 76px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: 24, color: '#0f172a', whiteSpace: 'nowrap' }}>
          What is your equity<br /><span style={{ color: '#2563eb' }}>actually worth?</span>
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
          Stock options and RSUs are complicated. Find out what yours is worth today and at exit — in plain numbers, not finance jargon.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <Link href="/signup" style={{ height: 48, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 28px', background: '#141414', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Calculate my equity free <ArrowRight size={15} /></Link>
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Options and RSUs', 'Exit scenario modeling', 'Free to use'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}><CheckCircle size={14} color="#16a34a" />{t}</div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 12 }}>Equity is only valuable if you understand it.</h2>
          <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 520, margin: '0 auto 56px' }}>Most people accept equity packages they can&apos;t explain. That&apos;s how they get taken advantage of.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: '28px 24px' }}>
                <b.icon size={18} color="#94a3b8" style={{ marginBottom: 16 }} />
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
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Know your equity before you sign.</h2>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto 36px' }}>Model every scenario in seconds — free, no credit card required.</p>
        <Link href="/signup" style={{ height: 50, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 32px', background: '#fff', color: '#0f172a', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>Calculate my equity free <ArrowRight size={15} /></Link>
      </section>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24 }}>
        {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(({ href, label }) => (
          <Link key={href} href={href} prefetch={true} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
        ))}
      </footer>
    </div>
  )
}
