import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, BarChart2, MapPin, TrendingUp } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'Salary Market Rate Tool — See What You Should Be Earning | Hayven',
  description: 'Find out if you\'re underpaid in 60 seconds. Enter your role, city, and level — get your p25–p90 salary range and a negotiation tip tailored to your market. Free.',
  alternates: { canonical: 'https://gethayven.com/compensation-analyzer' },
  openGraph: {
    title: 'Salary Market Rate Tool — See What You Should Be Earning | Hayven',
    description: 'Find out if you\'re underpaid in 60 seconds. Get your salary range by role, city, and level. Free.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Market Rate Tool | Hayven',
    description: 'Find out exactly what you should be earning. See your market rate at every percentile by role, location, and experience.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I know what salary to ask for?',
      acceptedAnswer: { '@type': 'Answer', text: 'Look up the 75th percentile for your role, level, and city — that\'s the number to anchor your ask to. Hayven\'s Compensation Analyzer gives you the full p25–p90 range so you know exactly where you stand and what to target in a negotiation.' },
    },
    {
      '@type': 'Question',
      name: 'Are national salary averages accurate?',
      acceptedAnswer: { '@type': 'Answer', text: 'National averages are often misleading because compensation varies dramatically by city. A software engineer in San Francisco earns significantly more than the same role in Austin or Chicago. Always use location-adjusted salary data when preparing for a negotiation.' },
    },
    {
      '@type': 'Question',
      name: 'What is a good salary for my role?',
      acceptedAnswer: { '@type': 'Answer', text: 'A competitive salary is one at or above the 50th percentile (median) for your role, experience level, and city. The 75th percentile is a strong target for negotiation. Hayven\'s Compensation Analyzer shows you all four percentiles — p25, p50, p75, and p90 — so you can see the full market range.' },
    },
    {
      '@type': 'Question',
      name: 'How much can I negotiate above the initial offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most initial offers come in at or below the 50th percentile. Candidates who counter at the 75th percentile typically receive 5–20% more than the original offer. The exact amount depends on the role, company size, and how far below market the initial offer is.' },
    },
  ],
}

const benefits = [
  { icon: BarChart2, title: 'Percentile breakdown', desc: 'See what the 25th, 50th, 75th, and 90th percentile looks like for your role — so you know exactly where you stand.' },
  { icon: MapPin, title: 'Location-adjusted', desc: 'Market rates vary dramatically by city. Get numbers specific to your market, not national averages that mislead.' },
  { icon: TrendingUp, title: 'Know your ask', desc: 'Walk into any salary conversation with a defensible number backed by market data, not gut feel.' },
]

const steps = [
  { number: '01', title: 'Enter your role and location', desc: 'Tell us your job title, level, years of experience, and city.' },
  { number: '02', title: 'Get your market range', desc: 'See the full compensation range for your role across percentiles, including base, bonus, and total comp estimates.' },
  { number: '03', title: 'Use it in your negotiation', desc: 'Anchor your ask to the 75th percentile and walk in with data instead of guesswork.' },
]

export default function CompensationAnalyzerPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}><Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority /></Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" prefetch={true} style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free <ArrowRight size={14} /></Link>
        </div>
      </header>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 72px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(36px, 6.5vw, 76px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: 24, color: '#0f172a', whiteSpace: 'nowrap' }}>
          Find out what you<br /><span style={{ color: '#4169E1' }}>should actually be earning.</span>
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px' }}>
          To know what salary to ask for, you need your market rate — the 25th through 90th percentile for your exact role, level, and city. Hayven calculates that number in seconds so you can anchor your counter-offer to data, not instinct. Most candidates who negotiate at the 75th percentile receive 10–20% more than their initial offer.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <Link href="/signup" style={{ height: 48, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 28px', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free <ArrowRight size={15} /></Link>
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Role-specific ranges', 'Location-adjusted data', 'Free to use'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}><CheckCircle size={14} color="#16a34a" />{t}</div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 12 }}>Stop guessing. Start knowing.</h2>
          <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 520, margin: '0 auto 56px' }}>Most people negotiate without knowing their number. That's why most people lose.</p>
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

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Related tools</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { href: '/offer-evaluator', label: 'Offer Evaluator' },
            { href: '/counter-offer-builder', label: 'Counter-Offer Builder' },
            { href: '/raise-calculator', label: 'Raise Calculator' },
            { href: '/raise-request-builder', label: 'Raise Request Builder' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: '#4169E1', textDecoration: 'none', border: '1px solid #dbeafe', borderRadius: 8, padding: '6px 14px', background: '#eff6ff' }}>{label}</Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Know your number before the call.</h2>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto 36px' }}>Get your market rate in seconds — free, no credit card required.</p>
        <Link href="/signup" style={{ height: 50, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 32px', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free <ArrowRight size={15} /></Link>
      </section>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24 }}>
        {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(({ href, label }) => (
          <Link key={href} href={href} prefetch={true} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
        ))}
      </footer>
    </div>
  )
}
