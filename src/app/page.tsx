import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  TrendingUp, BookOpen, Play, FileSearch,
  Calculator, DollarSign, Mail, Shield, PenLine, MessageSquare,
  UserCircle, FileText, Search, ClipboardList, PenSquare, ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'
import { FAQ } from '@/components/negotiate/FAQ'

export const metadata: Metadata = {
  title: 'Hayven — Get paid what you\'re worth',
  description: 'Personalized career coach, resume analyzer, job search, cover letter generator, and salary negotiation tools. Everything you need to land the job and the offer you deserve.',
  openGraph: {
    title: 'Hayven — Get paid what you\'re worth',
    description: 'Personalized career coach, resume analyzer, job search, and salary negotiation. Land the job and the offer you deserve.',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://gethayven.com',
    type: 'website',
  },
}

const careerFeatures = [
  { icon: UserCircle, color: '#6366f1', bg: '#eef2ff', name: 'Career Coach — Sarah', desc: 'Your personalized career coach available 24/7. Resume feedback, job targeting, interview prep, and offer strategy — all in one conversation.' },
  { icon: FileText, color: '#0891b2', bg: '#e0f2fe', name: 'Resume Analyzer', desc: 'Recruiter-grade feedback with ATS scoring, section-by-section breakdown, rewritten bullets, and a prioritized action plan.' },
  { icon: Search, color: '#059669', bg: '#ecfdf5', name: 'Job Search', desc: 'Search real job listings and get matched to roles that fit your background. Apply in one click.' },
  { icon: PenSquare, color: '#d97706', bg: '#fffbeb', name: 'Cover Letter Generator', desc: 'Generate a tailored, compelling cover letter for any role in seconds. Professional, warm, or bold — your tone.' },
  { icon: ClipboardList, color: '#7c3aed', bg: '#f5f3ff', name: 'Application Tracker', desc: 'Track every application in one place. Never lose track of where you stand or what comes next.' },
]

const negotiationTools = [
  { icon: TrendingUp, name: 'Compensation Analyzer', desc: 'See your market rate at every percentile.' },
  { icon: FileSearch, name: 'Offer Evaluator', desc: 'Score any job offer 0–100.' },
  { icon: Calculator, name: 'Equity Calculator', desc: 'Model your equity across exit scenarios.' },
  { icon: DollarSign, name: 'Cost of Not Negotiating', desc: 'See the compounding dollar gap over 20 years.' },
  { icon: BookOpen, name: 'Negotiation Playbook', desc: 'A personalized 5-step negotiation plan.' },
  { icon: Mail, name: 'Counter-Offer Builder', desc: 'Ready-to-send counter-offer email and script.' },
  { icon: Shield, name: 'Objection Handler', desc: 'Three responses to any recruiter pushback.' },
  { icon: PenLine, name: 'Raise Request Builder', desc: 'Build a compelling raise request from your wins.' },
  { icon: Play, name: 'Negotiation Simulator', desc: 'Practice with an AI coach. Get scored.' },
  { icon: MessageSquare, name: 'Interview Salary Coach', desc: 'Real-time coaching on salary questions.' },
]

const proFeatures = [
  'Sarah career coach — unlimited',
  'All 10 negotiation tools — unlimited',
  'Resume analyzer + cover letter generator',
  'Offer evaluator + counter-offer builder',
  'Raise builder + negotiation playbook',
  'Session history',
]


const TICKER_ITEMS = [
  { name: 'Michael R.', title: 'Product Manager', company: 'Google', result: 'negotiated $18K more' },
  { name: 'Priya S.', title: 'Software Engineer', company: 'Stripe', result: 'discovered she was $31K underpaid' },
  { name: 'James T.', title: 'Account Executive', company: 'Salesforce', result: 'negotiated $14K more + signing bonus' },
  { name: 'Aisha K.', title: 'Data Scientist', company: 'Meta', result: 'negotiated $22K more in equity' },
  { name: 'Carlos M.', title: 'Marketing Manager', company: 'Amazon', result: 'got a $12K raise approved' },
  { name: 'Rachel W.', title: 'UX Designer', company: 'Airbnb', result: 'negotiated $9K more + remote flexibility' },
  { name: 'David L.', title: 'Engineering Manager', company: 'Microsoft', result: 'negotiated $27K more' },
  { name: 'Sofia B.', title: 'Operations Lead', company: 'Uber', result: 'discovered she was $19K underpaid' },
]

const LOGOS = [
  { name: 'Google', color: '#4285F4' },
  { name: 'Meta', color: '#0866FF' },
  { name: 'Amazon', color: '#FF9900' },
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'Microsoft', color: '#00A4EF' },
  { name: 'Apple', color: '#555555' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Airbnb', color: '#FF5A5F' },
  { name: 'Netflix', color: '#E50914' },
  { name: 'Uber', color: '#000000' },
]

export default function LandingPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Top announcement bar */}
      <div style={{ background: '#0f172a', width: '100%', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>🏆 </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>85% of people who negotiate their salary get more money</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}> — are you leaving money on the table?</span>
        </div>
        <Link href="/upgrade" style={{ fontSize: 13, fontWeight: 600, color: '#7AB8E8', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Find out →
        </Link>
      </div>

      {/* Header */}
      <header style={{
        borderBottom: '0.5px solid #e5e7eb',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: '#fff', zIndex: 50,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" prefetch={true} style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>
            Sign in
          </Link>
          <Link href="/upgrade" style={{
            fontSize: 14, fontWeight: 700,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: '#fff',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
          }}>
            ✦ Try 7 days for $4.99 <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 88px' }} className="landing-hero">
        <h1 style={{ fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 32, color: '#0f172a', fontSize: 'clamp(56px, 9.5vw, 112px)', whiteSpace: 'nowrap' }}>
          You&apos;re worth more.
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }} className="landing-hero-grid">

          {/* Left — text */}
          <div>
            <p style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#2952CC', letterSpacing: '-0.02em', marginBottom: 20 }}>Find out how much — and go get it.</p>

            <p style={{ fontSize: 17, color: '#64748b', lineHeight: 1.75, marginBottom: 32, maxWidth: 460 }}>
              Find out if you&apos;re being underpaid — and get a personalized plan to close the gap.
            </p>

            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                color: '#f59e0b', textTransform: 'uppercase',
                border: '1px solid rgba(245,158,11,0.3)',
                background: 'rgba(245,158,11,0.07)',
                padding: '5px 12px', borderRadius: 20,
              }}>
                ★ LIMITED INTRO OFFER — 7 DAYS FULL ACCESS
              </span>
            </div>

            <Link href="/upgrade" style={{
              height: 52, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 32px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
            }}>
              ✦ FIND OUT YOUR WORTH HERE
            </Link>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
              Then $19.99/month. Cancel anytime.
            </div>

            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', marginTop: 48 }}>
              {[
                { stat: '$27K', label: 'avg left on table' },
                { stat: '85%', label: 'negotiate & get more' },
                { stat: '24/7', label: 'always available' },
              ].map(s => (
                <div key={s.stat}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{s.stat}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — salary card */}
          <div style={{
            background: '#fff',
            border: '1px solid #e8edf3',
            borderRadius: 20,
            padding: '28px 24px 24px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.09)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: 5 }}>SALARY ANALYSIS</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Software Engineer</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>San Francisco, CA · 4 yrs exp.</div>
              </div>
              <div style={{ background: '#fef2f2', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#dc2626' }}>
                Underpaid
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ position: 'relative', height: 7, borderRadius: 99, overflow: 'visible', marginBottom: 8, background: '#f1f5f9' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'linear-gradient(to right, #fca5a5 0%, #fde68a 45%, #6ee7b7 100%)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '22%', transform: 'translate(-50%, -50%)', width: 16, height: 16, background: '#fff', border: '3px solid #0f172a', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 1 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontWeight: 600, color: '#cbd5e1', letterSpacing: '0.06em' }}>
                <span>BELOW MARKET</span><span>MARKET RATE</span><span>ABOVE MARKET</span>
              </div>
            </div>

            {[
              { label: 'Your current salary', value: '$112,000', color: '#ef4444' },
              { label: 'Market median', value: '$148,000', color: '#0f172a' },
              { label: 'Top 25%', value: '$171,000', color: '#10b981' },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <span style={{ fontSize: 13, color: '#64748b' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: row.color }}>{row.value}</span>
              </div>
            ))}

            <div style={{ marginTop: 16, background: '#fef2f2', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#b91c1c', letterSpacing: '0.06em', marginBottom: 3 }}>MONEY LEFT ON THE TABLE</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#dc2626', letterSpacing: '-0.02em' }}>$36,000 / year</div>
            </div>

            <Link href="/upgrade" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              marginTop: 12, background: '#4169E1', color: '#fff',
              borderRadius: 10, padding: '12px 20px',
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
              width: '100%', boxSizing: 'border-box' as const,
            }}>
              See my real market value <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .landing-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Logo strip */}
      <div style={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '24px 40px', background: '#fafbfc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.08em', textAlign: 'center', marginBottom: 16 }}>USED BY PROFESSIONALS AT</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            {LOGOS.map(({ name, color }) => (
              <div key={name} style={{
                background: '#fff', border: '1px solid #e8edf3', borderRadius: 10,
                padding: '10px 20px', fontSize: 14, fontWeight: 700, color,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)', letterSpacing: '-0.01em',
              }}>{name}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Hub */}
      <section id="features" style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.1em', marginBottom: 12 }}>CAREER HUB</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', margin: '0 0 16px' }}>
              Everything you need to land the job
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, lineHeight: 1.7 }}>
              From finding the right roles to submitting a polished application — all in one place.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '4px 40px' }}>
            {careerFeatures.map(({ icon: Icon, color, name, desc }) => (
              <div key={name} style={{
                display: 'flex', gap: 24, alignItems: 'flex-start',
                padding: '28px 0',
                borderBottom: '1px solid #f1f5f9',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={26} color={color} />
                </div>
                <div style={{ paddingTop: 6 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{name}</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sarah section */}
      <section style={{ background: '#0f172a', padding: '96px 40px' }}>
        <div className="landing-sarah" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', marginBottom: 16 }}>CAREER COACH</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.025em' }}>
              Meet Sarah.<br />Your personal career coach.
            </h2>
            <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.8, marginBottom: 32 }}>
              Sarah has 12 years of experience at Google, Meta, and Stripe. She knows what hiring managers actually think, what kills candidacies silently, and exactly how to position you to win.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {[
                'Resume and LinkedIn optimization',
                'Job targeting and company strategy',
                'Interview preparation and coaching',
                'Offer negotiation and counter strategy',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                  <CheckCircle size={15} color="#7AB8E8" />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/upgrade" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 24px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
              ✦ Try 7 days for $4.99 <ArrowRight size={14} />
            </Link>
          </div>
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { value: '24/7', label: 'Always available', sub: 'No scheduling. No waiting.' },
              { value: '$27K', label: 'Avg money left behind', sub: 'Without negotiating.' },
              { value: '10x', label: 'More offer data', sub: 'Than a typical career coach.' },
              { value: '100%', label: 'Personalized', sub: 'To your role and market.' },
            ].map(({ value, label, sub }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '24px 20px' }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 6 }}>{value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Negotiation tools */}
      <section style={{ padding: '96px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.1em', marginBottom: 12 }}>NEGOTIATION SUITE</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', margin: '0 0 16px' }}>
              Get paid what you&apos;re worth
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, lineHeight: 1.7 }}>
              10 tools to know your market rate, build your strategy, and practice until you&apos;re ready.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '4px 40px' }}>
            {negotiationTools.map(({ icon: Icon, name, desc }) => (
              <div key={name} style={{
                display: 'flex', gap: 24, alignItems: 'flex-start',
                padding: '28px 0',
                borderBottom: '1px solid #e9eef4',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#eef2f7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={26} color="#475569" />
                </div>
                <div style={{ paddingTop: 6 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{name}</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.1em', marginBottom: 12 }}>PRICING</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', margin: '0 0 12px' }}>Simple, transparent pricing</h2>
            <p style={{ fontSize: 16, color: '#64748b' }}>Try for 7 days. Cancel anytime.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 640, margin: '0 auto' }}>

            {/* Pro */}
            <div style={{ background: '#2D6EA8', border: '2px solid #2D6EA8', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 20, right: 20, background: '#4A90D9', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.05em' }}>MOST POPULAR</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Professional</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>$19.99<span style={{ fontSize: 15, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>First 7 days for $4.99</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Then $19.99/month. Cancel anytime.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {proFeatures.map(f => (
                  <div key={f} style={{ fontSize: 13, color: '#C9E2F5', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={14} color="#7AB8E8" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/upgrade" style={{
                display: 'flex', justifyContent: 'center',
                height: 44, lineHeight: '44px',
                background: '#fff', borderRadius: 9,
                fontSize: 14, textDecoration: 'none', color: '#2D6EA8', fontWeight: 700,
              }}>
                Try 7 days for $4.99
              </Link>
            </div>


          </div>
        </div>
      </section>

      <FAQ />

      {/* Resume Cards Section */}
      <section style={{ padding: '96px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 14 }}>
              Resume guides by role
            </h2>
            <p style={{ fontSize: 17, color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Step-by-step resume breakdowns for the roles that matter most — with real examples and the exact metrics hiring managers want to see.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

            {/* Software Engineer */}
            <Link href="/blog/software-engineer-resume" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                {/* Mini Resume Mockup */}
                <div style={{ background: '#1e293b', padding: '24px 20px', position: 'relative' }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: '16px 14px', fontSize: 9, lineHeight: 1.6, color: '#334155', fontFamily: 'monospace' }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#0f172a', marginBottom: 2 }}>Jordan Lee</div>
                    <div style={{ color: '#64748b', marginBottom: 8, fontSize: 8 }}>jordan@email.com · github.com/jlee · linkedin.com/in/jlee</div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6, marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Skills</div>
                      <div style={{ color: '#475569' }}>Python · TypeScript · React · Node.js · AWS · Docker · Postgres</div>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6, marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Experience</div>
                      <div style={{ fontWeight: 700, fontSize: 9, color: '#0f172a' }}>Senior Software Engineer · Stripe</div>
                      <div style={{ color: '#64748b', marginBottom: 4, fontSize: 8 }}>2022 – Present</div>
                      <div style={{ color: '#475569' }}>• Reduced API latency by 40%, cutting p99 from 800ms to 480ms</div>
                      <div style={{ color: '#475569' }}>• Built real-time pipeline processing 2M events/day with Kafka</div>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Education</div>
                      <div style={{ color: '#475569' }}>B.S. Computer Science · UC Berkeley · 2020</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#6366f1', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>
                    ATS ✓
                  </div>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', marginBottom: 6 }}>Software Engineer</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Resume guide & examples</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>How to structure your tech stack, write impact-driven bullets, and pass ATS screening.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#6366f1' }}>
                    Read guide <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Account Executive */}
            <Link href="/blog/account-executive-resume" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ background: '#1e293b', padding: '24px 20px', position: 'relative' }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: '16px 14px', fontSize: 9, lineHeight: 1.6, color: '#334155', fontFamily: 'monospace' }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#0f172a', marginBottom: 2 }}>Morgan Chen</div>
                    <div style={{ color: '#64748b', marginBottom: 8, fontSize: 8 }}>morgan@email.com · linkedin.com/in/mchen</div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 4, padding: '4px 8px', marginBottom: 8, fontSize: 8, color: '#166534' }}>
                      Mid-market SaaS AE · 5 yrs · Avg 118% quota · $30K–$150K ACV
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6, marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Experience</div>
                      <div style={{ fontWeight: 700, fontSize: 9, color: '#0f172a' }}>Account Executive · Salesforce</div>
                      <div style={{ color: '#64748b', marginBottom: 4, fontSize: 8 }}>2021 – Present</div>
                      <div style={{ color: '#475569' }}>• Closed $2.4M ARR in FY2024 at 127% quota — #2 of 18 AEs</div>
                      <div style={{ color: '#475569' }}>• Self-sourced 60% of pipeline, averaging 4 SQLs/week</div>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Tools</div>
                      <div style={{ color: '#475569' }}>Salesforce · Outreach · Gong · MEDDIC · LinkedIn SN</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#059669', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>
                    127% ✓
                  </div>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#059669', marginBottom: 6 }}>Account Executive</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Resume guide & examples</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>How to show quota attainment, deal size, and pipeline metrics in a way that lands interviews.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#059669' }}>
                    Read guide <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Marketing Manager */}
            <Link href="/blog/marketing-manager-resume" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ background: '#1e293b', padding: '24px 20px', position: 'relative' }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: '16px 14px', fontSize: 9, lineHeight: 1.6, color: '#334155', fontFamily: 'monospace' }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#0f172a', marginBottom: 2 }}>Alex Rivera</div>
                    <div style={{ color: '#64748b', marginBottom: 8, fontSize: 8 }}>alex@email.com · linkedin.com/in/arivera</div>
                    <div style={{ background: '#fef9c3', border: '1px solid #fef08a', borderRadius: 4, padding: '4px 8px', marginBottom: 8, fontSize: 8, color: '#713f12' }}>
                      Demand gen · B2B SaaS · 6 yrs · $800K budget ownership
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6, marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Experience</div>
                      <div style={{ fontWeight: 700, fontSize: 9, color: '#0f172a' }}>Marketing Manager · HubSpot</div>
                      <div style={{ color: '#64748b', marginBottom: 4, fontSize: 8 }}>2020 – Present</div>
                      <div style={{ color: '#475569' }}>• Drove $4.2M in pipeline via 6-channel demand gen program</div>
                      <div style={{ color: '#475569' }}>• Grew organic traffic 8K → 47K/mo in 14 months via SEO</div>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Tools</div>
                      <div style={{ color: '#475569' }}>HubSpot · Marketo · GA4 · Semrush · LinkedIn Ads</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#d97706', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>
                    3.4x ROAS ✓
                  </div>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#d97706', marginBottom: 6 }}>Marketing Manager</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Resume guide & examples</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>How to show campaign results, budget ownership, and channel impact — not just buzzwords.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#d97706' }}>
                    Read guide <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', borderTop: '1px solid #EBF5FB', borderBottom: '1px solid #EBF5FB', padding: '96px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 16 }}>
            Find out what you&apos;re worth.
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 36 }}>
            Sarah will tell you your market rate, what&apos;s holding you back, and exactly what to do next.
          </p>
          <Link href="/upgrade" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#2D6EA8', color: '#fff',
            padding: '15px 36px', borderRadius: 10,
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
          }}>
            See my market value <ArrowRight size={16} />
          </Link>
          <div style={{ marginTop: 14, fontSize: 13, color: '#94a3b8' }}>7 days for $4.99 — then $19.99/month. Cancel anytime.</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '48px 40px 36px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
            <div>
              <Image src="/logo.svg" alt="Hayven" width={130} height={36} style={{ objectFit: 'contain', marginBottom: 12 }} />
              <div style={{ fontSize: 13, color: '#94a3b8', maxWidth: 260, lineHeight: 1.6 }}>
                AI-powered career and salary negotiation tools for professionals who want to get paid what they&apos;re worth.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: 14 }}>PRODUCT</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[{ href: '/upgrade', label: 'Get started' }, { href: '/login', label: 'Sign in' }, { href: '/#features', label: 'Features' }, { href: '/ai-career-coach', label: 'Career Coach' }].map(({ href, label }) => (
                    <Link key={href} href={href} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: 14 }}>LEGAL</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[{ href: '/privacy', label: 'Privacy Policy' }, { href: '/terms', label: 'Terms of Service' }].map(({ href, label }) => (
                    <Link key={href} href={href} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: 14 }}>SUPPORT</div>
                <a href="mailto:GetHayven@gmail.com" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>GetHayven@gmail.com</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>© {new Date().getFullYear()} Hayven. All rights reserved.</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>AI-generated guidance for informational purposes only. Results may vary.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
