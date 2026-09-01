import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Resume Builder — Build a Resume That Gets Interviews | Hayven',
  description: 'Build a job-winning resume with AI. Hayven analyzes your resume, scores it against ATS, rewrites weak bullets, and tailors it to any job description — free to start.',
  alternates: { canonical: 'https://gethayven.com/resume-builder' },
  openGraph: {
    title: 'AI Resume Builder | Hayven',
    description: 'Build a job-winning resume with AI. ATS scoring, bullet rewrites, keyword matching — free to start.',
    url: 'https://gethayven.com/resume-builder',
  },
  twitter: { card: 'summary_large_image', title: 'AI Resume Builder | Hayven', description: 'Build a job-winning resume with AI. Free to start.' },
}

const features = [
  {
    icon: '🎯',
    title: 'ATS Score',
    desc: 'See exactly how your resume scores against applicant tracking systems — the software that filters 75% of resumes before a human ever sees them.',
  },
  {
    icon: '✍️',
    title: 'Bullet Rewrites',
    desc: 'We rewrite your weakest bullets from vague responsibilities to quantified, action-led accomplishments that recruiters actually read.',
  },
  {
    icon: '🔍',
    title: 'Keyword Gap Analysis',
    desc: 'Paste a job description and we show you exactly which keywords are missing — and where to add them naturally.',
  },
  {
    icon: '📊',
    title: 'Section-by-Section Score',
    desc: 'Every section of your resume scored 0–100 with specific, actionable feedback on what to fix first.',
  },
  {
    icon: '⚡',
    title: 'Instant Analysis',
    desc: 'Paste your resume and get recruiter-grade feedback in under 60 seconds. No waiting, no back-and-forth.',
  },
  {
    icon: '🎓',
    title: 'Interview Readiness',
    desc: 'We assess whether your resume will generate interview calls — and tell you exactly what\'s holding it back.',
  },
]

const beforeAfter = [
  {
    before: 'Responsible for managing a team of engineers and overseeing project delivery.',
    after: 'Led a team of 6 engineers to ship a customer-facing dashboard that reduced support tickets by 34% and cut onboarding time from 3 days to 4 hours.',
    label: 'Engineering Manager',
  },
  {
    before: 'Helped grow the sales pipeline and worked with the marketing team on campaigns.',
    after: 'Generated $2.1M in pipeline in Q3 by building a co-marketing program with 12 partners — contributing to a 28% increase in enterprise ARR.',
    label: 'Sales Executive',
  },
  {
    before: 'Managed social media accounts and created content for various platforms.',
    after: 'Grew Instagram from 8K to 47K followers in 9 months by launching a short-form video strategy that drove a 3.2x increase in organic reach.',
    label: 'Marketing Manager',
  },
]

const faqs = [
  {
    q: 'Is the AI resume builder really free?',
    a: 'Yes — signing up is free and you can analyze your resume immediately. No credit card required to get started.',
  },
  {
    q: 'What format should I paste my resume in?',
    a: 'Plain text works best. Copy your resume from Word, Google Docs, or PDF and paste it directly. The AI reads the content, not the formatting.',
  },
  {
    q: 'Will this work for any industry?',
    a: 'Yes. Hayven has analyzed resumes across tech, finance, marketing, sales, healthcare, law, and more. The AI adjusts its feedback based on your target role and industry.',
  },
  {
    q: 'What\'s the difference between a resume analyzer and a resume builder?',
    a: 'Most resume builders help you format a document. Hayven focuses on content — the words, bullets, and framing that actually get you interviews. Formatting matters less than you think; content is what recruiters read.',
  },
  {
    q: 'How does the ATS scoring work?',
    a: 'We analyze keyword density, section structure, formatting compatibility, and job-description alignment — the same signals that ATS systems use to rank candidates. A score above 75 means you\'re likely to pass automated filters.',
  },
  {
    q: 'Can I use this to tailor my resume for different jobs?',
    a: 'Yes — paste a specific job description alongside your resume and we\'ll tell you exactly which keywords to add, which bullets to strengthen, and how to reframe your experience for that role.',
  },
]

export default function ResumeBuilderPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '80px 24px 72px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>AI RESUME BUILDER & ANALYZER</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            Your resume is losing you interviews.<br />We fix that.
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 40px' }}>
            Paste your resume and get an ATS score, section-by-section feedback, rewritten bullets, and a prioritized action plan — in under 60 seconds. Free to start.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Link href="/signup" style={{
              display: 'inline-block', background: '#2D6EA8', color: '#fff',
              padding: '16px 40px', borderRadius: 10, fontSize: 17, fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 4px 16px rgba(45,110,168,0.35)',
            }}>
              Analyze My Resume — Free
            </Link>
            <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>No credit card required · Results in 60 seconds</p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '40px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 56, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { v: '75%', l: 'of resumes rejected by ATS before a human sees them' },
            { v: '6 sec', l: 'average recruiter time on a resume' },
            { v: '40%', l: 'more callbacks with quantified bullets' },
          ].map(s => (
            <div key={s.l} style={{ maxWidth: 180 }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: '#2D6EA8', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 8, lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>Before & after Hayven</h2>
          <p style={{ fontSize: 16, color: '#475569', textAlign: 'center', marginBottom: 52, maxWidth: 520, margin: '0 auto 52px' }}>
            This is the difference between a resume that gets ignored and one that gets interviews.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {beforeAfter.map(ex => (
              <div key={ex.label} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '10px 20px', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.06em' }}>
                  {ex.label.toUpperCase()}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ padding: 24, borderRight: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginBottom: 10, letterSpacing: '0.06em' }}>❌ BEFORE</div>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0, background: '#fef2f2', padding: '12px 16px', borderRadius: 8, borderLeft: '3px solid #ef4444' }}>{ex.before}</p>
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', marginBottom: 10, letterSpacing: '0.06em' }}>✓ AFTER HAYVEN</div>
                    <p style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.7, margin: 0, background: '#ecfdf5', padding: '12px 16px', borderRadius: 8, borderLeft: '3px solid #10b981' }}>{ex.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, textAlign: 'center', marginBottom: 52 }}>Everything you get with Hayven</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: '#f8fafc', borderRadius: 14, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{f.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article content for SEO */}
      <section style={{ padding: '48px 24px 80px', maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 28 }}>How to write a resume that actually gets interviews</h2>
        <div style={{ fontSize: 16, lineHeight: 1.9, color: '#334155' }}>
          <p style={{ marginBottom: 24 }}>Most people treat resume writing as a formatting exercise. They spend hours tweaking margins, fonts, and layouts — then wonder why they're not getting calls. The truth is that formatting matters far less than content. Recruiters don't care about your template; they care whether your resume answers one question in the first 6 seconds: "Can this person do the job?"</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '36px 0 14px' }}>The ATS problem most candidates don't know about</h3>
          <p style={{ marginBottom: 24 }}>Before your resume reaches a human, it passes through an Applicant Tracking System. These systems parse your resume for keywords that match the job description, score it, and filter out anything below the threshold. Studies consistently show that 75% of resumes are rejected by ATS before a recruiter ever sees them — not because the candidates aren't qualified, but because their resume isn't optimized for the software.</p>
          <p style={{ marginBottom: 24 }}>The fix is straightforward: match the language in the job description. If the posting says "cross-functional collaboration," use that exact phrase. If it says "P&L ownership," don't write "budget responsibility." ATS systems do exact or near-exact keyword matching, not semantic understanding.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '36px 0 14px' }}>Accomplishments, not responsibilities</h3>
          <p style={{ marginBottom: 24 }}>The single biggest improvement most resumes need is shifting from responsibility-based bullets to accomplishment-based bullets. "Managed social media accounts" describes a job. "Grew Instagram from 12K to 89K followers in 11 months by launching a short-form video strategy" describes an outcome — and outcomes are what get you hired.</p>
          <p style={{ marginBottom: 24 }}>Every bullet point should answer: "So what?" What happened as a result of what you did? What changed, improved, grew, or was saved? If you can't answer that, the bullet is describing a responsibility, not an accomplishment.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '36px 0 14px' }}>How to quantify experience when you don't have hard numbers</h3>
          <p style={{ marginBottom: 24 }}>Not every role generates clean metrics — and that's fine. You can quantify scope (team size, budget managed, number of clients), time (delivered in 3 weeks vs. expected 8), frequency (ran 40+ customer interviews per quarter), or scale (launched in 12 markets across 4 countries). The goal isn't to manufacture numbers — it's to give recruiters a sense of the size and impact of your work.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '36px 0 14px' }}>The top of your resume is the most valuable real estate</h3>
          <p style={{ marginBottom: 24 }}>Recruiters read top-to-bottom and left-to-right, and they stop when they've seen enough to make a decision. That decision usually happens within the first third of the first page. Your summary, your most recent role title, and your first two or three bullets carry disproportionate weight. If those don't land, nothing below them will be read carefully.</p>
          <p style={{ marginBottom: 24 }}>Lead with your strongest accomplishment. Don't save the best for last. Put the number, the outcome, or the impressive scope right at the top where it will be seen.</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 48, textAlign: 'center' }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map(f => (
              <div key={f.q} style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{f.q}</div>
                <div style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2D6EA8 100%)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Stop losing jobs to a weak resume
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', marginBottom: 36, lineHeight: 1.65 }}>
            Get your ATS score, bullet rewrites, and action plan in under 60 seconds — free.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#fff', color: '#2D6EA8',
            padding: '16px 40px', borderRadius: 10, fontSize: 17, fontWeight: 800,
            textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}>
            Analyze My Resume — Free
          </Link>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 14 }}>No credit card required</p>
        </div>
      </section>

    </main>
  )
}
