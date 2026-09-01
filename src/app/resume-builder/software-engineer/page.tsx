import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'Software Engineer Resume — AI Builder & Templates | Hayven',
  description: 'Build a software engineer resume that passes ATS and impresses hiring managers. AI-powered bullet rewrites, ATS scoring, and templates for SWE roles. Free to start.',
  alternates: { canonical: 'https://gethayven.com/resume-builder/software-engineer' },
  openGraph: { title: 'Software Engineer Resume Builder | Hayven', description: 'AI resume builder for software engineers. ATS scoring, bullet rewrites, and SWE-specific templates.' },
}

const bullets = {
  before: 'Worked on backend services and helped improve system performance.',
  after: 'Redesigned the payment service API to reduce p99 latency from 840ms to 120ms, eliminating $180K/year in SLA penalty costs and unblocking 3 enterprise contracts.',
}

const tips = [
  { title: 'Lead with impact, not stack', desc: 'Hiring managers care about what you shipped and what broke. List your tech stack in a Skills section — don\'t bury your summary in a list of frameworks.' },
  { title: 'Quantify everything you can', desc: 'Latency improvements, uptime percentages, lines of code removed, users served, requests per second. Engineers have more measurable data than almost any other role — use it.' },
  { title: 'Scope your projects clearly', desc: 'Did you build it alone or on a team of 8? Were you the tech lead or an IC? Recruiters need context on the size and complexity of your contributions.' },
  { title: 'ATS loves exact keyword matches', desc: 'If a job description says "distributed systems," don\'t write "microservices architecture." Use the exact phrase. ATS doesn\'t do semantic matching.' },
  { title: 'GitHub and portfolio links', desc: 'Add a GitHub URL to your header. If you have public repos or a personal site, link them. A strong GitHub profile is a resume in itself for many engineering roles.' },
  { title: 'Tailor for each company tier', desc: 'A FAANG resume needs to emphasize scale and complexity. A startup resume needs to show ownership and breadth. Same experience, different framing.' },
]

const keywords = ['React', 'Node.js', 'Python', 'AWS', 'Kubernetes', 'PostgreSQL', 'CI/CD', 'REST APIs', 'GraphQL', 'Microservices', 'System Design', 'Agile', 'Git', 'Docker', 'TypeScript']

export default function SoftwareEngineerResumePage() {
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

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#4169E1', background: '#eff6ff', padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: '0.06em' }}>SOFTWARE ENGINEER RESUME</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: '#0f172a' }}>
          A software engineer resume<br />that actually gets interviews
        </h1>
        <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 36px' }}>
          Paste your resume and get ATS scoring, SWE-specific bullet rewrites, keyword gap analysis, and a prioritized action plan — in under 60 seconds.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>
          Analyze My Resume — Free <ArrowRight size={16} />
        </Link>
        <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card · Results in 60 seconds</p>
      </section>

      {/* Before / After */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 40, color: '#0f172a' }}>What Hayven does to your bullets</h2>
          <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '10px 24px', background: '#f8fafc', borderBottom: '0.5px solid #e5e7eb', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>BACKEND ENGINEER · BEFORE & AFTER</div>
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

      {/* ATS Keywords */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 16, color: '#0f172a' }}>Keywords ATS systems look for in SWE resumes</h2>
          <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>Hayven checks your resume for these and tells you exactly which are missing and where to add them.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {keywords.map(k => (
              <span key={k} style={{ fontSize: 13, fontWeight: 600, padding: '7px 16px', borderRadius: 20, background: '#f1f5f9', color: '#334155', border: '0.5px solid #e2e8f0' }}>{k}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 48, color: '#0f172a' }}>How to write a software engineer resume</h2>
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

      {/* Article */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24, color: '#0f172a' }}>What makes a great software engineer resume in 2025</h2>
          <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.85 }}>
            <p style={{ marginBottom: 20 }}>The software engineering job market has changed significantly. With more candidates applying to the same roles — and more companies using ATS to filter them — a generic resume doesn&apos;t get through anymore. The engineers who get interviews are the ones who frame their experience in terms of business outcomes, not technical tasks.</p>
            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>Structure that works for SWE roles</h3>
            <p style={{ marginBottom: 20 }}>Most SWE resumes should follow this order: Contact info → Summary (2–3 sentences, focused on your level and specialty) → Work Experience → Projects (if early-career) → Skills → Education. Don&apos;t bury your skills at the bottom if you&apos;re a senior engineer — recruiters want to see your stack quickly.</p>
            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>The FAANG vs. startup framing problem</h3>
            <p style={{ marginBottom: 20 }}>A resume that works for a FAANG recruiter often doesn&apos;t work for a Series A startup, and vice versa. FAANG wants to see scale: millions of users, high-availability systems, cross-functional collaboration. Startups want ownership, breadth, and shipping speed. Tailor your framing — not just your keywords — for each company type.</p>
            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>Projects matter more than you think</h3>
            <p>For engineers with under 5 years of experience, a strong projects section can outweigh a weak employment history. Include what the project does, what you built specifically, the tech stack, and any measurable outcome (users, stars, uptime). A deployed project with real users is worth more than 10 tutorial projects.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Get your SWE resume reviewed in 60 seconds</h2>
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
