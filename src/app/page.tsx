import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/negotiate/FAQ'
import HeroCheckWidget from './HeroCheckWidget'
import {
  TrendingUp, BookOpen, Play, FileSearch,
  Calculator, DollarSign, Mail, Shield, PenLine, MessageSquare,
  UserCircle, FileText, Search, ClipboardList, PenSquare, ArrowRight, CheckCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hayven — Your personal AI career platform',
  description: 'AI career coach, resume analyzer, job search, cover letter generator, and salary negotiation tools. Everything you need to land the job and the offer you deserve.',
  openGraph: {
    title: 'Hayven — Your personal AI career platform',
    description: 'AI career coach, resume analyzer, job search, and salary negotiation. Land the job and the offer you deserve.',
    url: 'https://gethayven.com',
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
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: '#fff', zIndex: 50,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Hayven" width={160} height={44} style={{ objectFit: 'contain', display: 'block' }} priority />
        </Link>
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Link href="/#features" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 12px' }}>Tools</Link>
          <Link href="/blog" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 12px' }}>Resources</Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>
            Sign in
          </Link>
          <Link href="/signup" style={{
            fontSize: 14, fontWeight: 600,
            background: '#ea580c', color: '#fff',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            Get started free <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
        padding: '72px 24px 80px',
      }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          {/* Big headline — centered, full width */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h1 style={{
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: 900, lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#fff', margin: '0 0 16px',
            }}>
              You Are Worth More.<br /><span style={{ color: '#93c5fd' }}>Find out how much in 30 seconds.</span>
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 700, color: '#93c5fd', letterSpacing: '-0.01em', margin: 0 }}>
              Find out how much in 30 seconds — free, no signup needed.
            </p>
          </div>

          {/* Two-column: checklist + widget */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 20, lineHeight: 1.6 }}>
                Enter your job title and see what the market pays for it.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'See if you\'re paid below market',
                  'See how much more you could ask for',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: '#cbd5e1' }}>
                    <CheckCircle size={18} color="#34d399" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <HeroCheckWidget />
          </div>
        </div>
      </section>

      {/* Sarah feature */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '5px 14px', marginBottom: 20,
            }}>
              <UserCircle size={13} color="#a5b4fc" />
              <span style={{ fontSize: 12, color: '#a5b4fc', fontWeight: 600 }}>AI RECRUITER</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Meet Sarah.
              <br />Your personal recruiter.
            </h2>
            <p style={{ fontSize: 15, color: '#c7d2fe', lineHeight: 1.8, marginBottom: 28 }}>
              Sarah has 12 years of recruiting experience at Google, Meta, and Stripe. She knows what hiring managers actually think, what kills candidacies silently, and exactly how to position you to win.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {[
                'Resume and LinkedIn optimization',
                'Job targeting and company strategy',
                'Interview preparation and coaching',
                'Offer negotiation and counter strategy',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#e0e7ff' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#818cf8', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', color: '#1e1b4b',
              padding: '11px 22px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Talk to Sarah <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16, padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'linear-gradient(135deg, #818cf8, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <UserCircle size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Sarah</div>
                <div style={{ fontSize: 11, color: '#a5b4fc' }}>AI Recruiter · Online now</div>
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
                  background: msg.from === 'user' ? '#4f46e5' : 'rgba(255,255,255,0.1)',
                  color: '#fff', borderRadius: 10,
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
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', letterSpacing: '0.08em', marginBottom: 10 }}>CAREER HUB</div>
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
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: 14, padding: 22,
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div style={{ width: 42, height: 42, background: bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 5 }}>{name}</div>
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
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0F6E56', letterSpacing: '0.08em', marginBottom: 10 }}>NEGOTIATION SUITE</div>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 14px' }}>
              Get paid what you're worth
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', maxWidth: 500, margin: '0 auto' }}>
              10 tools to help you know your market rate, build your strategy, and practice until you're ready.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {negotiationTools.map(({ icon: Icon, color, bg, name, desc }) => (
              <div key={name} style={{
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: 12, padding: 18,
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <div style={{ width: 36, height: 36, background: bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={color} />
                </div>
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
      <section style={{ padding: '96px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.12em', marginBottom: 16 }}>PRICING</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', margin: '0 0 48px' }}>Simple, transparent pricing</h2>

          <div style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 20,
            padding: '40px 36px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#10b981', letterSpacing: '0.12em', marginBottom: 20 }}>
              PRO PLAN
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>
              $20 <span style={{ fontSize: 18, fontWeight: 400, color: '#94a3b8' }}>/month</span>
            </div>
            <div style={{ fontSize: 15, color: '#475569', marginBottom: 6 }}>Full unlimited access to everything.</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 32 }}>Free to start · Cancel anytime.</div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                'Sarah career coach — unlimited',
                'All 10 negotiation tools — unlimited',
                'Resume analyzer + cover letter generator',
                'Offer evaluator + counter-offer builder',
                'Raise builder + negotiation playbook',
                'Session history',
              ].map(f => (
                <div key={f} style={{ fontSize: 14, color: '#334155', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle size={15} color="#16a34a" style={{ flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>

            <Link href="/signup" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              height: 52,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              borderRadius: 12,
              fontSize: 15, textDecoration: 'none', color: '#fff', fontWeight: 700,
              boxShadow: '0 4px 20px rgba(239,68,68,0.25)',
            }}>
              Get Started Free
            </Link>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 12, textAlign: 'center' }}>Cancel anytime. No commitment.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #1d4ed8 100%)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Your next job is waiting.
          </h2>
          <p style={{ fontSize: 16, color: '#c7d2fe', lineHeight: 1.7, marginBottom: 36 }}>
            Start free today. Sarah will help you figure out exactly where to begin.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#1e1b4b',
            padding: '14px 32px', borderRadius: 10,
            fontSize: 15, fontWeight: 800, textDecoration: 'none',
          }}>
            Get started free <ArrowRight size={15} />
          </Link>
          <div style={{ marginTop: 16, fontSize: 13, color: '#a5b4fc' }}>No credit card required. Free forever plan available.</div>
        </div>
      </section>

      <FAQ />

      {/* Resume guides by role */}
      <section style={{ padding: '96px 24px', background: '#f8fafc' }}>
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
            <Link href="/blog/software-engineer-resume" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ background: '#1e293b', padding: '24px 20px', position: 'relative' }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: '16px 14px', fontSize: 9, lineHeight: 1.6, color: '#334155', fontFamily: 'monospace' }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#0f172a', marginBottom: 2 }}>Jordan Lee</div>
                    <div style={{ color: '#64748b', marginBottom: 8, fontSize: 8 }}>jordan@email.com · github.com/jlee · linkedin.com/in/jlee</div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6, marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Skills</div>
                      <div style={{ color: '#475569' }}>Python · TypeScript · React · Node.js · AWS · Docker · Postgres</div>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Experience</div>
                      <div style={{ fontWeight: 700, fontSize: 9, color: '#0f172a' }}>Senior Software Engineer · Stripe</div>
                      <div style={{ color: '#64748b', marginBottom: 4, fontSize: 8 }}>2022 – Present</div>
                      <div style={{ color: '#475569' }}>• Reduced API latency by 40%, cutting p99 from 800ms to 480ms</div>
                      <div style={{ color: '#475569' }}>• Built real-time pipeline processing 2M events/day with Kafka</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#6366f1', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>ATS ✓</div>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', marginBottom: 6 }}>Software Engineer</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Resume guide &amp; examples</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>How to structure your tech stack, write impact-driven bullets, and pass ATS screening.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#6366f1' }}>Read guide <ArrowRight size={14} /></div>
                </div>
              </div>
            </Link>

            <Link href="/blog/account-executive-resume" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ background: '#1e293b', padding: '24px 20px', position: 'relative' }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: '16px 14px', fontSize: 9, lineHeight: 1.6, color: '#334155', fontFamily: 'monospace' }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#0f172a', marginBottom: 2 }}>Morgan Chen</div>
                    <div style={{ color: '#64748b', marginBottom: 8, fontSize: 8 }}>morgan@email.com · linkedin.com/in/mchen</div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 4, padding: '4px 8px', marginBottom: 8, fontSize: 8, color: '#166534' }}>Mid-market SaaS AE · 5 yrs · Avg 118% quota · $30K–$150K ACV</div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Experience</div>
                      <div style={{ fontWeight: 700, fontSize: 9, color: '#0f172a' }}>Account Executive · Salesforce</div>
                      <div style={{ color: '#64748b', marginBottom: 4, fontSize: 8 }}>2021 – Present</div>
                      <div style={{ color: '#475569' }}>• Closed $2.4M ARR in FY2024 at 127% quota — #2 of 18 AEs</div>
                      <div style={{ color: '#475569' }}>• Self-sourced 60% of pipeline, averaging 4 SQLs/week</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#059669', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>127% ✓</div>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#059669', marginBottom: 6 }}>Account Executive</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Resume guide &amp; examples</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>How to show quota attainment, deal size, and pipeline metrics in a way that lands interviews.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#059669' }}>Read guide <ArrowRight size={14} /></div>
                </div>
              </div>
            </Link>

            <Link href="/blog/marketing-manager-resume" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ background: '#1e293b', padding: '24px 20px', position: 'relative' }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: '16px 14px', fontSize: 9, lineHeight: 1.6, color: '#334155', fontFamily: 'monospace' }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#0f172a', marginBottom: 2 }}>Alex Rivera</div>
                    <div style={{ color: '#64748b', marginBottom: 8, fontSize: 8 }}>alex@email.com · linkedin.com/in/arivera</div>
                    <div style={{ background: '#fef9c3', border: '1px solid #fef08a', borderRadius: 4, padding: '4px 8px', marginBottom: 8, fontSize: 8, color: '#713f12' }}>Demand gen · B2B SaaS · 6 yrs · $800K budget ownership</div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 8, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Experience</div>
                      <div style={{ fontWeight: 700, fontSize: 9, color: '#0f172a' }}>Marketing Manager · HubSpot</div>
                      <div style={{ color: '#64748b', marginBottom: 4, fontSize: 8 }}>2020 – Present</div>
                      <div style={{ color: '#475569' }}>• Drove $4.2M in pipeline via 6-channel demand gen program</div>
                      <div style={{ color: '#475569' }}>• Grew organic traffic 8K → 47K/mo in 14 months via SEO</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#d97706', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>3.4x ROAS ✓</div>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#d97706', marginBottom: 6 }}>Marketing Manager</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Resume guide &amp; examples</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>How to show campaign results, budget ownership, and channel impact — not just buzzwords.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#d97706' }}>Read guide <ArrowRight size={14} /></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 16 }}>
            Find out what you&apos;re worth.
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 36 }}>
            Sarah will tell you your market rate, what&apos;s holding you back, and exactly what to do next.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#ea580c', color: '#fff',
            padding: '15px 36px', borderRadius: 10,
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
          }}>
            Get started free <ArrowRight size={16} />
          </Link>
          <div style={{ marginTop: 14, fontSize: 13, color: '#94a3b8' }}>Free to start · $20/month after · Cancel anytime.</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '48px 24px 36px' }}>
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
                  {[{ href: '/signup', label: 'Get started' }, { href: '/login', label: 'Sign in' }, { href: '/#features', label: 'Features' }, { href: '/ai-career-coach', label: 'Career Coach' }].map(({ href, label }) => (
                    <Link key={href} href={href} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: 14 }}>TOOLS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { href: '/compensation-analyzer', label: 'Compensation Analyzer' },
                    { href: '/offer-evaluator', label: 'Offer Evaluator' },
                    { href: '/equity-calculator', label: 'Equity Calculator' },
                    { href: '/counter-offer-builder', label: 'Counter-Offer Builder' },
                    { href: '/raise-calculator', label: 'Raise Calculator' },
                    { href: '/raise-request-builder', label: 'Raise Request Builder' },
                    { href: '/negotiation-playbook', label: 'Negotiation Playbook' },
                    { href: '/objection-handler', label: 'Objection Handler' },
                    { href: '/negotiation-simulator', label: 'Negotiation Simulator' },
                    { href: '/interview-salary-coach', label: 'Interview Salary Coach' },
                    { href: '/job-tracker', label: 'Job Tracker' },
                    { href: '/resume-builder', label: 'AI Resume Builder' },
                    { href: '/resume-templates', label: 'Resume Templates' },
                    { href: '/resume-skills', label: 'Resume Skills' },
                    { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                    { href: '/salary-to-hourly-calculator', label: 'Salary to Hourly' },
                    { href: '/tools/salaries', label: 'Salary Guides' },
                  ].map(({ href, label }) => (
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
