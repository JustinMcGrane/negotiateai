import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, FileText, Zap, Target } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'

export const metadata: Metadata = {
  title: 'AI Resume Builder — Hayven',
  description: 'Get recruiter-grade resume feedback with ATS scoring, section-by-section breakdown, rewritten bullets, and a prioritized action plan.',

  alternates: { canonical: 'https://gethayven.com/resume-builder' },
  twitter: {
    card: 'summary_large_image',
    description: 'Build a resume that passes ATS filters and impresses recruiters. Get AI feedback, ATS scoring, and rewritten bullets.',
  },
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

const beforeAfter = [
  {
    label: 'ENGINEERING MANAGER',
    before: 'Responsible for managing a team of engineers and overseeing project delivery.',
    after: 'Led a team of 6 engineers to ship a customer-facing dashboard that reduced support tickets by 34% and cut onboarding from 3 days to 4 hours.',
  },
  {
    label: 'SALES EXECUTIVE',
    before: 'Helped grow the sales pipeline and worked with the marketing team on campaigns.',
    after: 'Generated $2.1M in pipeline in Q3 through a co-marketing program with 12 partners — contributing to a 28% increase in enterprise ARR.',
  },
  {
    label: 'MARKETING MANAGER',
    before: 'Managed social media accounts and created content for various platforms.',
    after: 'Grew Instagram from 8K to 47K followers in 9 months by launching a short-form video strategy that drove a 3.2x increase in organic reach.',
  },
]

const features = [
  { icon: '🎯', title: 'ATS Score', desc: 'Your resume scored 0–100 against applicant tracking systems — the software that filters 75% of applications before a human sees them.' },
  { icon: '✍️', title: 'Bullet Rewrites', desc: 'We identify your weakest bullets and rewrite them from vague responsibilities to quantified, action-led outcomes recruiters stop to read.' },
  { icon: '🔍', title: 'Keyword Gap Analysis', desc: 'Paste a job description and see exactly which keywords are missing — and where to add them without sounding robotic.' },
  { icon: '📊', title: 'Section-by-Section Score', desc: 'Every section scored independently: summary, experience, skills, education. Drill into each one for specific feedback.' },
  { icon: '⚡', title: 'Top 3 Priority Actions', desc: 'We don\'t overwhelm you with 40 suggestions. We rank your most impactful fixes and tell you what to work on first.' },
  { icon: '💬', title: 'Interview Readiness', desc: 'A plain-language assessment of whether your resume will generate calls — and if not, what\'s specifically holding it back.' },
]

const aiFeaturesList = [
  { title: 'Custom resume audits', desc: 'Analyze your resume against specific job descriptions to get personalized optimization insights. Like having a custom checklist for every application.' },
  { title: 'Job-specific rewrites', desc: 'Automatically rewrite your summary and bullets using the exact language from the job description, so your resume speaks directly to what they\'re hiring for.' },
  { title: 'Emphasize achievements', desc: 'We identify where you can add metrics — dollars, percentages, headcount — to boost the impact of every bullet. No more vague or fluffy statements.' },
  { title: 'Smart keyword matching', desc: 'Get suggestions for keywords you\'re missing and see where to add them naturally to improve ATS alignment without sounding robotic.' },
  { title: 'Address skill gaps', desc: 'If the job description mentions skills you haven\'t highlighted, we flag the gap and generate content ideas to show your relevant experience.' },
  { title: 'Track multiple versions', desc: 'Create and compare multiple resume versions for different roles. Keep your applications organized so you know which version is going where.' },
]

const faqs = [
  { q: 'Is Hayven\'s resume builder really free?', a: 'Yes — signing up is free and you can analyze your resume immediately. No credit card required to get started. Pro features like unlimited analyses are available on the paid plan.' },
  { q: 'What format should I paste my resume in?', a: 'Plain text works best. Copy from Word, Google Docs, or a PDF reader and paste it in. The AI reads the content, not the visual formatting.' },
  { q: 'Will this work for any industry?', a: 'Yes. Hayven has analyzed resumes across tech, finance, marketing, sales, healthcare, operations, law, and more. The AI adjusts its feedback based on your target role.' },
  { q: 'How does the ATS scoring work?', a: 'We analyze keyword density, section structure, formatting compatibility, and job-description alignment — the same signals ATS systems use. A score above 75 means you\'re likely to pass automated filters.' },
  { q: 'Can I use this to tailor my resume for different jobs?', a: 'Yes — paste a specific job description alongside your resume and we\'ll show you exactly which keywords to add, which bullets to strengthen, and how to reframe your experience.' },
  { q: 'How is this different from a resume template builder?', a: 'Template builders help you format a document. Hayven focuses on content — the words, bullets, and framing that actually get you interviews. Strong content beats a beautiful template every time.' },
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
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" prefetch={true} style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>
            Sign in
          </Link>
          <Link href="/signup" style={{
            fontSize: 14, fontWeight: 700,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: '#fff',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
          }}>Try Free Today - No Credit Card Required <ArrowRight size={14} /></Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 72px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6.5vw, 76px)',
          fontWeight: 800, lineHeight: 1.12,
          letterSpacing: '-0.03em', marginBottom: 24, color: '#0f172a',
          whiteSpace: 'nowrap',
        }}>
          Your resume, reviewed<br />
          <span style={{ color: '#4169E1' }}>the way recruiters see it.</span>
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
            padding: '0 28px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: '#fff',
            borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
          }}>
            Try Free Today - No Credit Card Required <ArrowRight size={15} />
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
                <b.icon size={18} color="#94a3b8" style={{ marginBottom: 16 }} />
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

      {/* Stats Bar */}
      <section style={{ background: '#fff', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '40px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 56, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { v: '75%', l: 'of resumes rejected by ATS before a human reads them' },
            { v: '6s', l: 'average recruiter time on a resume before deciding' },
            { v: '40%', l: 'more callbacks with quantified bullets' },
            { v: '$27K', l: 'average salary increase after a strong negotiation' },
          ].map(s => (
            <div key={s.l} style={{ maxWidth: 160 }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section style={{ padding: '72px 24px', background: '#f8fafc', borderBottom: '0.5px solid #e5e7eb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 12 }}>
            Before &amp; after Hayven
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Responsibilities get ignored. Outcomes get interviews. Here&apos;s the difference.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {beforeAfter.map(ex => (
              <div key={ex.label} style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ padding: '10px 24px', background: '#f8fafc', borderBottom: '0.5px solid #e5e7eb', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>
                  {ex.label}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div style={{ padding: 24, borderRight: '0.5px solid #e5e7eb' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#ef4444', marginBottom: 10, letterSpacing: '0.06em' }}>❌ BEFORE</div>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0, background: '#fef2f2', padding: '12px 16px', borderRadius: 8, borderLeft: '3px solid #ef4444' }}>{ex.before}</p>
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#10b981', marginBottom: 10, letterSpacing: '0.06em' }}>✓ AFTER HAYVEN</div>
                    <p style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.7, margin: 0, background: '#ecfdf5', padding: '12px 16px', borderRadius: 8, borderLeft: '3px solid #10b981' }}>{ex.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 12 }}>
            Everything in one analysis
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Most tools give you formatting tips. Hayven gives you the content changes that move the needle.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: '#f8fafc', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: 28 }}>
                <div style={{ fontSize: 24, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to improve your resume with AI — checklist + mockup */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Powered by AI</p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', marginBottom: 12, lineHeight: 1.15 }}>
              How to improve your resume with AI
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Optimize your resume for each application. Whether it&apos;s a full rewrite or a targeted revision, Hayven helps you make improvements strategically — not randomly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {aiFeaturesList.map(f => (
                <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#ecfdf5', border: '1.5px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: '#10b981', fontWeight: 700 }}>✓</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{f.title}:</span>{' '}
                    <span style={{ fontSize: 15, color: '#475569', lineHeight: 1.65 }}>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product mockup */}
          <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 16, padding: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 16 }}>BULLET REWRITER</div>

            {/* Original bullet */}
            <div style={{ background: '#fef2f2', border: '0.5px solid #fca5a5', borderRadius: 10, padding: '14px 16px', marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#ef4444', marginBottom: 6, letterSpacing: '0.05em' }}>ORIGINAL</div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Managed social media and helped increase website traffic through content marketing campaigns.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '10px 0', paddingLeft: 4 }}>
              <div style={{ width: 20, height: 1, background: '#e2e8f0' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981' }}>✦ AI Rewrite</span>
              <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            </div>

            {/* Rewritten bullet */}
            <div style={{ background: '#ecfdf5', border: '0.5px solid #6ee7b7', borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#10b981', marginBottom: 6, letterSpacing: '0.05em' }}>REWRITTEN</div>
              <p style={{ fontSize: 13, color: '#065f46', lineHeight: 1.6, margin: 0 }}>
                Grew website traffic by <strong>30%</strong> in 6 months by launching a short-form content marketing campaign across 3 channels — driving <strong>12K new monthly visitors</strong> and a <strong>22% increase in sign-ups</strong>.
              </p>
            </div>

            {/* Keyword tags */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Keywords matched to job description</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Content marketing', 'SEO', 'Paid marketing', 'Analytics', 'Growth'].map(k => (
                  <span key={k} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: '#eff6ff', color: '#2563eb', border: '0.5px solid #bfdbfe' }}>{k}</span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button style={{ fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 8, background: '#f1f5f9', color: '#475569', border: '0.5px solid #e2e8f0', cursor: 'pointer' }}>Cancel</button>
              <button style={{ fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 8, background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer' }}>Save Bullet</button>
            </div>
          </div>
        </div>
      </section>

      {/* Article + Sidebar */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 56, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', marginBottom: 24 }}>
              How to write a resume that actually gets interviews
            </h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.85, marginBottom: 20 }}>Most people treat resume writing as a formatting exercise. They spend hours tweaking margins and layouts — then wonder why they&apos;re not getting calls. Formatting matters far less than content. Recruiters care whether your resume answers one question in the first six seconds: <em>can this person do the job?</em></p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>The ATS problem most candidates don&apos;t know about</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.85, marginBottom: 20 }}>Before your resume reaches a human, it passes through an Applicant Tracking System. These systems parse your resume for keywords that match the job description and filter out anything below the threshold. 75% of resumes are rejected by ATS before a recruiter ever sees them — not because the candidates aren&apos;t qualified, but because their resume isn&apos;t optimized for the software.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>Accomplishments, not responsibilities</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.85, marginBottom: 20 }}>&quot;Managed social media accounts&quot; describes a job. &quot;Grew Instagram from 12K to 89K followers in 11 months by launching a short-form video strategy&quot; describes an outcome — and outcomes are what get you hired. Every bullet should answer: <em>so what?</em> What changed, improved, grew, or was saved?</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>The top of your resume is the most valuable real estate</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.85, marginBottom: 20 }}>Recruiters stop when they&apos;ve seen enough — usually within the first third of the first page. Your summary, your most recent role title, and your first two or three bullets carry disproportionate weight. Lead with your strongest accomplishment. Don&apos;t save the best for last.</p>
          </div>
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: 28 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>By the numbers</div>
              {[
                { v: '75%', l: 'of resumes rejected by ATS before a human sees them' },
                { v: '6s', l: 'average recruiter attention before moving on' },
                { v: '40%', l: 'more callbacks from resumes with quantified results' },
                { v: '3×', l: 'higher interview rate with tailored vs. generic resumes' },
              ].map(s => (
                <div key={s.l} style={{ padding: '14px 0', borderBottom: '0.5px solid #f1f5f9' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#4169E1' }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
              <Link href="/signup" style={{ display: 'block', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textAlign: 'center', padding: 13, borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', marginTop: 24 }}>
                Analyze My Resume — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 48 }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map(f => (
              <div key={f.q} style={{ background: '#f8fafc', border: '0.5px solid #e5e7eb', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 10 }}>{f.q}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Guides by Role */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center', marginBottom: 12 }}>
            Resume guides by role
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Before you analyze, read the guide for your role. See exactly what metrics and structure hiring managers expect.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { role: 'Software Engineer', color: '#6366f1', bg: '#eef2ff', href: '/blog/software-engineer-resume', desc: 'Tech stack placement, impact bullets, ATS keywords, and GitHub links.' },
              { role: 'Account Executive', color: '#059669', bg: '#ecfdf5', href: '/blog/account-executive-resume', desc: 'Quota attainment, ACV, pipeline metrics, and deal size context.' },
              { role: 'Marketing Manager', color: '#d97706', bg: '#fffbeb', href: '/blog/marketing-manager-resume', desc: 'Campaign results, budget ownership, channel-specific numbers, and ROAS.' },
            ].map(g => (
              <Link key={g.role} href={g.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: '24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: g.bg, color: g.color, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, width: 'fit-content' }}>
                    {g.role}
                  </div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{g.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: g.color, marginTop: 4 }}>
                    Read guide <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
          padding: '0 32px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
          color: '#fff',
          borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
        }}>
          Try Free Today - No Credit Card Required <ArrowRight size={15} />
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
