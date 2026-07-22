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

export const metadata: Metadata = {
  title: 'Hayven — Get paid what you\'re worth',
  description: 'AI recruiter, resume analyzer, job search, cover letter generator, and salary negotiation tools. Everything you need to land the job and the offer you deserve.',
  openGraph: {
    title: 'Hayven — Get paid what you\'re worth',
    description: 'AI recruiter, resume analyzer, job search, and salary negotiation. Land the job and the offer you deserve.',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://gethayven.com',
    type: 'website',
  },
}

const careerFeatures = [
  { icon: UserCircle, color: '#6366f1', bg: '#eef2ff', name: 'AI Recruiter — Sarah', desc: 'Your personal recruiter available 24/7. Resume feedback, job targeting, interview prep, and offer strategy — all in one conversation.' },
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
  { icon: Play, name: 'Negotiation Simulator', desc: 'Practice with an AI recruiter. Get scored.' },
  { icon: MessageSquare, name: 'Interview Salary Coach', desc: 'Real-time coaching on salary questions.' },
]

const proFeatures = [
  'Sarah AI recruiter — unlimited',
  'All 10 negotiation tools — unlimited',
  'Resume analyzer + cover letter generator',
  'Offer evaluator + counter-offer builder',
  'Raise builder + negotiation playbook',
  'Session history',
]

const eliteFeatures = [
  'Everything in Professional',
  'Sarah remembers you across sessions',
  'Mock interview coaching with feedback',
  'Live negotiation roleplay',
  'Annual Review Coach + Promotion Planner',
  'PDF compensation report',
]

export default function LandingPage() {
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
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
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
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '72px 24px 88px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EBF5FB', border: '1px solid #C9E2F5', borderRadius: 20, padding: '5px 14px', marginBottom: 32, fontSize: 12, fontWeight: 600, color: '#2D6EA8' }}>
          AI-powered career platform
        </div>
        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 800, lineHeight: 1.1,
          letterSpacing: '-0.03em', marginBottom: 28,
          color: '#0f172a',
        }}>
          Land the job.<br />
          Negotiate the offer.<br />
          Get paid what you&apos;re <span style={{ display: 'inline-block', background: '#1D6FD1', color: '#fff', borderRadius: 10, padding: '2px 18px 8px' }}>worth.</span>
        </h1>

        <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px' }}>
          Hayven gives you an AI recruiter, resume analyzer, job search, cover letter generator, and 10 negotiation tools — everything you need to take control of your career.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <Link href="/signup" style={{
            height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 30px', background: '#141414', color: '#fff',
            borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}>
            Start for free <ArrowRight size={15} />
          </Link>
          <Link href="#features" style={{
            height: 50, display: 'inline-flex', alignItems: 'center',
            padding: '0 26px', background: 'transparent', color: '#374151',
            border: '1px solid #d1d5db', borderRadius: 10, fontSize: 15, textDecoration: 'none', fontWeight: 500,
          }}>
            See what&apos;s inside
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { stat: '15+', label: 'AI-powered career tools' },
            { stat: '100%', label: 'free to start' },
          ].map(s => (
            <div key={s.stat} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{s.stat}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof bar */}
      <div style={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '20px 40px', background: '#fafbfc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'Resume analysis',
            'AI job matching',
            'Salary benchmarking',
            'Negotiation coaching',
            'Live roleplay practice',
            'Offer scoring',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b', fontWeight: 500 }}>
              <CheckCircle size={14} color="#4A90D9" />
              {item}
            </div>
          ))}
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
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', marginBottom: 16 }}>AI RECRUITER</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.025em' }}>
              Meet Sarah.<br />Your personal recruiter.
            </h2>
            <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.8, marginBottom: 32 }}>
              Sarah has 12 years of recruiting experience at Google, Meta, and Stripe. She knows what hiring managers actually think, what kills candidacies silently, and exactly how to position you to win.
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
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#4A90D9', color: '#fff',
              padding: '12px 24px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Talk to Sarah <ArrowRight size={14} />
            </Link>
          </div>
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { value: '24/7', label: 'Always available', sub: 'No scheduling. No waiting.' },
              { value: '$27K', label: 'Avg money left behind', sub: 'Without negotiating.' },
              { value: '10x', label: 'More offer data', sub: 'Than a typical recruiter.' },
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
            <p style={{ fontSize: 16, color: '#64748b' }}>Start free. Upgrade when it pays off.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>

            {/* Free */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 20 }}>Free</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 4 }}>$0</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 28 }}>No credit card required</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {['One session with Sarah', 'See your current market value', 'Get your target role and salary', 'Realistic timeline to get there'].map(f => (
                  <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={14} color="#10b981" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/signup" style={{
                display: 'flex', justifyContent: 'center',
                height: 44, lineHeight: '44px',
                border: '1px solid #e2e8f0', borderRadius: 9,
                fontSize: 14, textDecoration: 'none', color: '#374151', fontWeight: 600,
              }}>
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div style={{ background: '#2D6EA8', border: '2px solid #2D6EA8', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 20, right: 20, background: '#4A90D9', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.05em' }}>MOST POPULAR</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Professional</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>$49<span style={{ fontSize: 15, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Unlimited coaching and tools</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {proFeatures.map(f => (
                  <div key={f} style={{ fontSize: 13, color: '#C9E2F5', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={14} color="#7AB8E8" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/signup" style={{
                display: 'flex', justifyContent: 'center',
                height: 44, lineHeight: '44px',
                background: '#fff', borderRadius: 9,
                fontSize: 14, textDecoration: 'none', color: '#2D6EA8', fontWeight: 700,
              }}>
                Get Professional
              </Link>
            </div>

            {/* Elite */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#7c3aed', marginBottom: 20 }}>Elite</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 4 }}>$79<span style={{ fontSize: 15, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 28 }}>Everything in Pro, plus:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {eliteFeatures.map(f => (
                  <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={14} color="#7c3aed" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/signup" style={{
                display: 'flex', justifyContent: 'center',
                height: 44, lineHeight: '44px',
                background: '#f5f3ff', borderRadius: 9,
                fontSize: 14, textDecoration: 'none', color: '#7c3aed', fontWeight: 700,
              }}>
                Get Elite
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', borderTop: '1px solid #EBF5FB', borderBottom: '1px solid #EBF5FB', padding: '96px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 16 }}>
            Your next job is waiting.
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 36 }}>
            Start free today. Sarah will help you figure out exactly where to begin.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#2D6EA8', color: '#fff',
            padding: '15px 36px', borderRadius: 10,
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
          }}>
            Get started free <ArrowRight size={16} />
          </Link>
          <div style={{ marginTop: 14, fontSize: 13, color: '#94a3b8' }}>No credit card required. Free forever plan available.</div>
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
                  {[{ href: '/signup', label: 'Sign up free' }, { href: '/login', label: 'Sign in' }, { href: '/#features', label: 'Features' }].map(({ href, label }) => (
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
