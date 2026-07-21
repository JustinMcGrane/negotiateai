import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  TrendingUp, BookOpen, Play, FileSearch,
  Calculator, DollarSign, Mail, Shield, PenLine, MessageSquare,
  UserCircle, FileText, Search, ClipboardList, PenSquare, ArrowRight,
} from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'Hayven — Get paid what you\'re worth',
  description: 'AI recruiter, resume analyzer, job search, cover letter generator, and salary negotiation tools. Everything you need to land the job and the offer you deserve.',
  openGraph: {
    title: 'Hayven — Get paid what you\'re worth',
    description: 'AI recruiter, resume analyzer, job search, and salary negotiation. Land the job and the offer you deserve.',
    url: 'https://negotiateai.com',
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
  { icon: TrendingUp, color: '#0F6E56', bg: '#E8F5F0', name: 'Compensation Analyzer', desc: 'See your market rate at the 25th through 90th percentile for your exact role and location.' },
  { icon: FileSearch, color: '#0F6E56', bg: '#E8F5F0', name: 'Offer Evaluator', desc: 'Score any job offer 0–100 and get a breakdown of exactly what to push on.' },
  { icon: Calculator, color: '#0F6E56', bg: '#E8F5F0', name: 'Equity Calculator', desc: 'Model your equity value across conservative, base, and optimistic exit scenarios.' },
  { icon: DollarSign, color: '#0F6E56', bg: '#E8F5F0', name: 'Cost of Not Negotiating', desc: 'See the compounding dollar gap over 5–20 years of accepting less than market rate.' },
  { icon: BookOpen, color: '#854F0B', bg: '#FEF3E2', name: 'Negotiation Playbook', desc: 'A personalized 5-step negotiation plan with exact language to use in every conversation.' },
  { icon: Mail, color: '#854F0B', bg: '#FEF3E2', name: 'Counter-Offer Builder', desc: 'Generate a ready-to-send email and phone script for your specific counter-offer.' },
  { icon: Shield, color: '#854F0B', bg: '#FEF3E2', name: 'Objection Handler', desc: 'Get three responses to any recruiter pushback — assertive, collaborative, or reframe.' },
  { icon: PenLine, color: '#854F0B', bg: '#FEF3E2', name: 'Raise Request Builder', desc: 'Build a compelling raise request email and talking points from your accomplishments.' },
  { icon: Play, color: '#141414', bg: '#f0f0f0', name: 'Negotiation Simulator', desc: 'Practice a live negotiation with an AI recruiter. Get a scored debrief with specific feedback.' },
  { icon: MessageSquare, color: '#141414', bg: '#f0f0f0', name: 'Interview Salary Coach', desc: 'Real-time coaching on how to answer salary questions at every stage of the interview process.' },
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
      <section style={{
        maxWidth: 900, margin: '0 auto',
        padding: '56px 24px 80px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6.5vw, 76px)',
          fontWeight: 800, lineHeight: 1.12,
          letterSpacing: '-0.03em', marginBottom: 28,
          color: '#0f172a',
          whiteSpace: 'nowrap',
        }}>
          Land the job.<br />
          Negotiate the offer.<br />
          Get paid what you&apos;re{' '}
          <span style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            borderRadius: 10,
            padding: '2px 18px 8px',
          }}>worth.</span>
        </h1>

        <p style={{
          fontSize: 20, color: '#475569', lineHeight: 1.7,
          marginBottom: 40, maxWidth: 580, margin: '0 auto 40px',
        }}>
          Hayven gives you an AI recruiter, resume analyzer, job search, cover letter generator, and 10 negotiation tools — everything you need to take control of your career.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <Link href="/signup" style={{
            height: 48, display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 28px', background: '#141414', color: '#fff',
            borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none',
          }}>
            Start for free <ArrowRight size={15} />
          </Link>
          <Link href="#features" style={{
            height: 48, display: 'inline-flex', alignItems: 'center',
            padding: '0 24px', background: 'transparent', color: '#374151',
            border: '1px solid #d1d5db', borderRadius: 10, fontSize: 15, textDecoration: 'none',
          }}>
            See what’s inside
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
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

      {/* Question hook */}
      <section style={{ padding: '64px 24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 10 }}>
          Are you being paid what you deserve?
        </div>
        <div style={{ fontSize: 16, color: '#64748b', marginBottom: 24 }}>
          Most people have no idea. Here&apos;s what the data says about your role.
        </div>
        <svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 40px' }}>
          <path d="M12 2v32" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4"/>
          <path d="M3 28l9 12 9-12" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Compensation graphic */}
        <div style={{ maxWidth: 720, margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '40px 32px', boxShadow: '0 4px 40px rgba(37,99,235,0.08)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 32 }}>
            SOFTWARE ENGINEER II · SAN FRANCISCO
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Your offer', value: '$158K', sub: 'below market', color: '#ef4444', bg: '#fef2f2' },
              { label: 'Market rate', value: '$185K', sub: 'what you should earn', color: '#2563eb', bg: '#eff6ff' },
              { label: "You're leaving", value: '$27K', sub: 'on the table', color: '#0f172a', bg: '#f8fafc' },
            ].map(({ label, value, sub, color, bg }) => (
              <div key={label} style={{ background: bg, padding: '24px 16px', textAlign: 'center', borderRadius: 14 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>{sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '14px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: 15, color: '#1e40af', fontWeight: 600 }}>
              Counter at $185K–$192K —{' '}
              <Link href="/signup" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
                Build your counter-offer →
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* Sarah feature */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', padding: '80px 24px', marginTop: 48 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Meet Sarah.
              <br />Your personal recruiter.
            </h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, marginBottom: 28 }}>
              Sarah has 12 years of recruiting experience at Google, Meta, and Stripe. She knows what hiring managers actually think, what kills candidacies silently, and exactly how to position you to win.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {[
                'Resume and LinkedIn optimization',
                'Job targeting and company strategy',
                'Interview preparation and coaching',
                'Offer negotiation and counter strategy',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#374151' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#0f172a', color: '#fff',
              padding: '11px 22px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Talk to Sarah <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 16, padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: '#0f172a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>S</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Sarah</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Career Recruiter</div>
              </div>
            </div>
            {[
              { from: 'sarah', text: "Hi! I looked at your resume and I want to be direct with you — your experience bullets don't show impact. Hiring managers see 200 resumes a day. Numbers get attention. Let's fix that." },
              { from: 'user', text: 'What should I change first?' },
              { from: 'sarah', text: 'Start with your last two roles. For each bullet, ask yourself: what changed because of what I did, and by how much? Even rough numbers like 20% or $50K work. I\'ll help you rewrite them.' },
            ].map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 10,
              }}>
                <div style={{
                  maxWidth: '85%',
                  background: msg.from === 'user' ? '#2563eb' : '#f8fafc',
                  color: msg.from === 'user' ? '#fff' : '#0f172a', borderRadius: 10,
                  padding: '10px 14px', fontSize: 13, lineHeight: 1.6,
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Hub features */}
      <section id="features" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 14px' }}>
              Everything you need to land the job
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', maxWidth: 500, margin: '0 auto' }}>
              From finding the right roles to submitting a polished application — all in one place.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {careerFeatures.map(({ icon: Icon, color, bg, name, desc }) => (
              <div key={name} style={{
                background: '#fff', border: '0.5px solid #e2e8f0',
                borderRadius: 12, padding: '20px 22px',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <Icon size={18} color="#94a3b8" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Negotiation tools */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: ‘center’, marginBottom: 48 }}>
            <h2 style={{ fontSize: ‘clamp(22px, 4vw, 34px)’, fontWeight: 800, color: ‘#0f172a’, letterSpacing: ‘-0.02em’, margin: ‘0 0 14px’ }}>
              Get paid what you’re worth
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', maxWidth: 500, margin: '0 auto' }}>
              10 tools to help you know your market rate, build your strategy, and practice until you’re ready.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {negotiationTools.map(({ icon: Icon, color, bg, name, desc }) => (
              <div key={name} style={{
                background: '#fff', border: '0.5px solid #e2e8f0',
                borderRadius: 10, padding: '14px 16px',
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <Icon size={15} color="#94a3b8" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 3 }}>{name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 10px' }}>Simple pricing</h2>
            <p style={{ fontSize: 15, color: '#64748b' }}>Start free. Upgrade when it pays off.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Free</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 4 }}>$0</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24 }}>No credit card required</div>
              {['Sarah salary assessment (one session)', 'See your current market value', 'Get your target role + salary', 'Realistic timeline to get there'].map(f => (
                <div key={f} style={{ fontSize: 13, color: '#475569', padding: '6px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <Link href="/signup" style={{
                display: 'block', marginTop: 24, textAlign: 'center',
                height: 42, lineHeight: '42px',
                border: '1px solid #d1d5db', borderRadius: 9,
                fontSize: 14, textDecoration: 'none', color: '#374151', fontWeight: 600,
              }}>
                Get started free
              </Link>
            </div>

            <div style={{ background: '#0f172a', border: '2px solid #0f172a', borderRadius: 14, padding: 28, position: 'relative' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Professional</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>$49<span style={{ fontSize: 15, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24 }}>Unlimited coaching &amp; tools</div>
              {[
                'Sarah AI recruiter — unlimited coaching',
                'All 10 negotiation tools — unlimited',
                'Resume analyzer + cover letter generator',
                'Offer evaluator + counter-offer builder',
                'Raise builder + negotiation playbook',
                'Session history',
              ].map(f => (
                <div key={f} style={{ fontSize: 13, color: '#cbd5e1', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <Link href="/signup" style={{
                display: 'block', marginTop: 24, textAlign: 'center',
                height: 42, lineHeight: '42px',
                background: '#2563eb', borderRadius: 9,
                fontSize: 14, textDecoration: 'none', color: '#fff', fontWeight: 700,
              }}>
                Get Professional →
              </Link>
            </div>

            <div style={{ background: '#0f172a', border: '2px solid #0f172a', borderRadius: 14, padding: 28, position: 'relative' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Elite</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>$79<span style={{ fontSize: 15, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Everything in Professional, plus:</div>
              {['Sarah remembers you across sessions', 'Mock interview coaching with feedback', 'Live negotiation roleplay with Sarah', 'Annual Review Coach + Promotion Planner', 'PDF compensation report', 'Priority support'].map(f => (
                <div key={f} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#94a3b8', fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <Link href="/signup" style={{
                display: 'block', marginTop: 24, textAlign: 'center',
                height: 42, lineHeight: '42px',
                background: '#2563eb', borderRadius: 9,
                fontSize: 14, textDecoration: 'none', color: '#fff', fontWeight: 700,
              }}>
                Get Elite →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Your next job is waiting.
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 36 }}>
            Start free today. Sarah will help you figure out exactly where to begin.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#2563eb', color: '#fff',
            padding: '14px 32px', borderRadius: 10,
            fontSize: 15, fontWeight: 800, textDecoration: 'none',
          }}>
            Get started free <ArrowRight size={15} />
          </Link>
          <div style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>No credit card required. Free forever plan available.</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '36px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <Image src="/logo.svg" alt="Hayven" width={140} height={40} style={{ objectFit: 'contain' }} />
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(({ href, label }) => (
              <Link key={href} href={href} prefetch={true} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', width: '100%', marginTop: 12 }}>
            Hayven provides AI-generated guidance for informational purposes. Results may vary. © {new Date().getFullYear()} Hayven.
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', width: '100%' }}>
            Support: <a href="mailto:GetHayven@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>GetHayven@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
