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

export default function ResumeBuilderPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap');

        .rb-wrap { font-family: 'Inter', system-ui, sans-serif; color: #0f172a; }

        /* NAV */
        .rb-nav {
          background: #0f2240; display: flex; align-items: center;
          justify-content: space-between; padding: 0 48px; height: 60px;
        }
        .rb-nav-logo {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 22px; color: #fff; text-decoration: none;
        }
        .rb-nav-cta {
          background: #2563eb; color: #fff; padding: 8px 20px;
          border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;
        }

        /* HERO */
        .rb-hero {
          background: #0f2240; padding: 80px 48px 0;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: flex-end; overflow: hidden;
        }
        .rb-hero-text { padding-bottom: 80px; }
        .rb-eyebrow-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(37,99,235,0.25); color: #93c5fd;
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
          padding: 5px 12px; border-radius: 20px; margin-bottom: 28px;
          border: 1px solid rgba(147,197,253,0.2);
        }
        .rb-h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(38px, 4.5vw, 58px); line-height: 1.08;
          color: #fff; letter-spacing: -0.02em; margin-bottom: 24px;
        }
        .rb-h1 em { font-style: italic; color: #93c5fd; }
        .rb-hero-sub {
          font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.6);
          max-width: 440px; margin-bottom: 40px;
        }
        .rb-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #2563eb; color: #fff; padding: 15px 32px;
          border-radius: 10px; font-size: 16px; font-weight: 700;
          text-decoration: none; box-shadow: 0 4px 20px rgba(37,99,235,0.45);
        }
        .rb-fine { font-size: 13px; color: rgba(255,255,255,0.35); margin-top: 12px; }

        /* MOCKUP */
        .rb-mockup-wrap { display: flex; gap: 16px; align-items: flex-end; }
        .rb-mockup-resume {
          flex: 1; background: #fff; border-radius: 12px 12px 0 0;
          padding: 20px; box-shadow: 0 -4px 40px rgba(0,0,0,0.4); min-height: 420px;
        }
        .rb-mock-logo {
          display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
          padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;
        }
        .rb-mock-logo-box {
          width: 28px; height: 28px; border-radius: 6px; background: #1e3a5f;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: #fff;
        }
        .rb-mock-co { font-size: 13px; font-weight: 700; color: #0f172a; }
        .rb-mock-title { font-size: 11px; color: #64748b; }
        .rb-mock-date { font-size: 10px; color: #94a3b8; margin-bottom: 10px; }
        .rb-mock-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          padding: 2px 6px; border-radius: 4px; margin-bottom: 6px;
          letter-spacing: 0.04em; background: #eff6ff; color: #2563eb;
        }
        .rb-mock-bullet {
          font-size: 11px; color: #334155; line-height: 1.5;
          padding: 8px 10px; border-radius: 6px; margin-bottom: 6px;
          background: #eff6ff; border-left: 2px solid #2563eb; color: #1e40af;
        }
        .rb-mock-bullet-rewritten {
          font-size: 11px; line-height: 1.5; padding: 8px 10px;
          border-radius: 6px; margin-bottom: 6px;
          background: #ecfdf5; border-left: 2px solid #10b981; color: #065f46;
        }
        .rb-shimmer {
          height: 8px; border-radius: 4px; background: #e2e8f0; margin-bottom: 6px;
        }
        .rb-mockup-score {
          width: 180px; background: #fff; border-radius: 12px 12px 0 0;
          padding: 18px; box-shadow: 0 -4px 40px rgba(0,0,0,0.35);
          display: flex; flex-direction: column; gap: 14px;
        }
        .rb-score-donut {
          width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 8px;
          background: conic-gradient(#f59e0b 0deg, #f59e0b 115deg, #e2e8f0 115deg);
          display: flex; align-items: center; justify-content: center;
        }
        .rb-score-donut-inner {
          width: 54px; height: 54px; border-radius: 50%; background: #fff;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .rb-score-num { font-size: 18px; font-weight: 800; color: #f59e0b; line-height: 1; }
        .rb-score-lbl { font-size: 8px; color: #94a3b8; font-weight: 500; }
        .rb-score-label { font-size: 11px; font-weight: 600; color: #475569; text-align: center; }
        .rb-score-bar-name { font-size: 10px; color: #64748b; margin-bottom: 4px; }
        .rb-score-bar-track { height: 5px; background: #e2e8f0; border-radius: 3px; overflow: hidden; margin-bottom: 10px; }
        .rb-score-bar-fill { height: 100%; border-radius: 3px; }
        .rb-kw-label { font-size: 10px; font-weight: 600; color: #475569; margin-bottom: 6px; }
        .rb-kw-tag {
          font-size: 9px; font-weight: 600; padding: 3px 7px; border-radius: 4px;
          display: inline-block; margin: 2px;
        }
        .rb-kw-missing { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; }
        .rb-kw-present { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }

        /* STATS */
        .rb-stats {
          background: #fff; border-bottom: 1px solid #e2e8f0;
          padding: 36px 48px; display: flex; justify-content: center;
          gap: 72px; flex-wrap: wrap; text-align: center;
        }
        .rb-stat-val {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 40px; color: #0f2240; letter-spacing: -0.02em; line-height: 1; margin-bottom: 6px;
        }
        .rb-stat-label { font-size: 13px; color: #475569; max-width: 140px; line-height: 1.4; }

        /* SHARED SECTION */
        .rb-section { padding: 88px 48px; }
        .rb-section-alt { background: #f7f8fa; }
        .rb-inner { max-width: 1080px; margin: 0 auto; }
        .rb-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          color: #2563eb; text-transform: uppercase; margin-bottom: 14px;
        }
        .rb-h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(30px, 3vw, 44px); line-height: 1.1;
          letter-spacing: -0.02em; margin-bottom: 16px; color: #0f172a;
        }
        .rb-section-sub {
          font-size: 17px; color: #475569; line-height: 1.7;
          max-width: 540px; margin-bottom: 52px;
        }

        /* STEPS */
        .rb-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 32px; }
        .rb-step {
          background: #fff; border-radius: 14px; border: 1px solid #e2e8f0;
          padding: 32px 28px; position: relative;
        }
        .rb-step-num {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 52px; color: #e2e8f0; line-height: 1; margin-bottom: 20px; letter-spacing: -0.03em;
        }
        .rb-step-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
        .rb-step-desc { font-size: 14px; color: #475569; line-height: 1.7; }
        .rb-step-arrow {
          position: absolute; right: -17px; top: 50%;
          transform: translateY(-50%); font-size: 20px; color: #e2e8f0; z-index: 1;
        }

        /* BEFORE/AFTER */
        .rb-ba-grid { display: flex; flex-direction: column; gap: 24px; }
        .rb-ba-card {
          background: #f7f8fa; border-radius: 14px;
          border: 1px solid #e2e8f0; overflow: hidden;
        }
        .rb-ba-label {
          padding: 10px 24px; background: #fff; border-bottom: 1px solid #e2e8f0;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #94a3b8;
        }
        .rb-ba-cols { display: grid; grid-template-columns: 1fr 1fr; }
        .rb-ba-col { padding: 24px; }
        .rb-ba-col-left { border-right: 1px solid #e2e8f0; }
        .rb-ba-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
          padding: 3px 10px; border-radius: 4px; margin-bottom: 12px; display: inline-block;
        }
        .rb-ba-before { background: #fef2f2; color: #ef4444; }
        .rb-ba-after { background: #ecfdf5; color: #10b981; }
        .rb-ba-text { font-size: 14px; line-height: 1.75; padding: 14px 16px; border-radius: 8px; }
        .rb-ba-text-before { background: #fef2f2; color: #475569; border-left: 3px solid #ef4444; }
        .rb-ba-text-after { background: #ecfdf5; color: #0f172a; border-left: 3px solid #10b981; }

        /* FEATURES */
        .rb-features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .rb-feature-card {
          border: 1px solid #e2e8f0; border-radius: 14px;
          padding: 28px; background: #f7f8fa;
        }
        .rb-feature-icon {
          width: 44px; height: 44px; border-radius: 10px; background: #eff6ff;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; margin-bottom: 18px;
        }
        .rb-feature-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
        .rb-feature-desc { font-size: 14px; color: #475569; line-height: 1.65; }

        /* ARTICLE */
        .rb-article-grid { display: grid; grid-template-columns: 1fr 340px; gap: 64px; align-items: start; }
        .rb-article-body h3 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 22px; margin: 36px 0 12px; color: #0f172a; letter-spacing: -0.01em;
        }
        .rb-article-body p { font-size: 15px; color: #475569; line-height: 1.85; margin-bottom: 20px; }
        .rb-article-body ul { padding-left: 20px; margin-bottom: 20px; }
        .rb-article-body li { font-size: 15px; color: #475569; line-height: 1.8; margin-bottom: 8px; }
        .rb-sidebar-card {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 14px; padding: 28px; position: sticky; top: 80px;
        }
        .rb-sidebar-title { font-weight: 700; font-size: 15px; margin-bottom: 16px; }
        .rb-sidebar-stat { padding: 14px 0; border-bottom: 1px solid #f1f5f9; }
        .rb-sidebar-stat:last-of-type { border-bottom: none; }
        .rb-sidebar-val { font-size: 26px; font-weight: 800; color: #2563eb; }
        .rb-sidebar-lbl { font-size: 12px; color: #475569; margin-top: 2px; }
        .rb-sidebar-btn {
          display: block; background: #2563eb; color: #fff; text-align: center;
          padding: 13px; border-radius: 9px; font-size: 14px; font-weight: 700;
          text-decoration: none; margin-top: 24px;
        }

        /* FAQ */
        .rb-faq-grid { display: flex; flex-direction: column; gap: 12px; max-width: 760px; margin: 0 auto; }
        .rb-faq-item {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 12px; padding: 24px 28px;
        }
        .rb-faq-q { font-weight: 700; font-size: 15px; margin-bottom: 10px; }
        .rb-faq-a { font-size: 14px; color: #475569; line-height: 1.7; }

        /* FINAL CTA */
        .rb-cta {
          background: #0f2240; padding: 96px 48px; text-align: center;
        }
        .rb-cta h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(34px, 4vw, 52px); color: #fff;
          letter-spacing: -0.02em; margin-bottom: 18px; line-height: 1.1;
        }
        .rb-cta h2 em { font-style: italic; color: #93c5fd; }
        .rb-cta-sub { font-size: 17px; color: rgba(255,255,255,0.55); margin-bottom: 40px; }
        .rb-btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #0f2240; padding: 15px 36px; border-radius: 10px;
          font-size: 16px; font-weight: 700; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
        }
        .rb-cta-fine { font-size: 13px; color: rgba(255,255,255,0.3); margin-top: 14px; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .rb-nav { padding: 0 24px; }
          .rb-hero { grid-template-columns: 1fr; padding: 60px 24px 0; }
          .rb-mockup-wrap { display: none; }
          .rb-hero-text { padding-bottom: 60px; }
          .rb-section { padding: 64px 24px; }
          .rb-stats { padding: 32px 24px; gap: 40px; }
          .rb-steps { grid-template-columns: 1fr; }
          .rb-step-arrow { display: none; }
          .rb-ba-cols { grid-template-columns: 1fr; }
          .rb-ba-col-left { border-right: none; border-bottom: 1px solid #e2e8f0; }
          .rb-features-grid { grid-template-columns: 1fr 1fr; }
          .rb-article-grid { grid-template-columns: 1fr; }
          .rb-sidebar-card { position: static; }
        }
        @media (max-width: 600px) {
          .rb-features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rb-wrap">
        {/* NAV */}
        <nav className="rb-nav">
          <Link href="/" className="rb-nav-logo">Hayven</Link>
          <Link href="/signup" className="rb-nav-cta">Get started free</Link>
        </nav>

        {/* HERO */}
        <section className="rb-hero">
          <div className="rb-hero-text">
            <div className="rb-eyebrow-pill">✦ AI Resume Builder & Analyzer</div>
            <h1 className="rb-h1">Your resume is<br />losing you <em>interviews</em></h1>
            <p className="rb-hero-sub">
              Paste your resume and get an ATS score, rewritten bullets, keyword gaps, and a section-by-section action plan — in under 60 seconds.
            </p>
            <Link href="/signup" className="rb-btn-primary">
              Analyze My Resume — Free <span>→</span>
            </Link>
            <p className="rb-fine">No credit card · Results in 60 seconds</p>
          </div>

          {/* CSS Product Mockup */}
          <div className="rb-mockup-wrap">
            <div className="rb-mockup-resume">
              <div className="rb-mock-logo">
                <div className="rb-mock-logo-box">G</div>
                <div>
                  <div className="rb-mock-co">Google</div>
                  <div className="rb-mock-title">Senior Product Manager</div>
                </div>
              </div>
              <div className="rb-mock-date">Jan 2022 – Present</div>
              <span className="rb-mock-tag">✦ AI Rewrite</span>
              <div className="rb-mock-bullet">
                Helped grow the product team and worked on various features across the platform.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0 4px 8px' }}>
                <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>↓ Rewritten</span>
              </div>
              <div className="rb-mock-bullet-rewritten">
                Led cross-functional roadmap for 3 core products, shipping 14 features that drove 38% DAU growth and reduced churn by $2.4M ARR in 2023.
              </div>
              <div style={{ marginTop: 14 }}>
                <div className="rb-shimmer" style={{ width: '90%' }} />
                <div className="rb-shimmer" style={{ width: '80%' }} />
                <div className="rb-shimmer" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="rb-mockup-score">
              <div style={{ textAlign: 'center' }}>
                <div className="rb-score-donut">
                  <div className="rb-score-donut-inner">
                    <span className="rb-score-num">32</span>
                    <span className="rb-score-lbl">ATS Score</span>
                  </div>
                </div>
                <div className="rb-score-label">Needs Work</div>
              </div>
              <div>
                {[
                  { label: 'Resume Structure', pct: 45, color: '#f59e0b' },
                  { label: 'Measurable Results', pct: 20, color: '#ef4444' },
                  { label: 'Keyword Usage', pct: 35, color: '#f59e0b' },
                  { label: 'Action Verbs', pct: 60, color: '#10b981' },
                ].map(b => (
                  <div key={b.label}>
                    <div className="rb-score-bar-name">{b.label}</div>
                    <div className="rb-score-bar-track">
                      <div className="rb-score-bar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="rb-kw-label">Missing Keywords</div>
                <div>
                  {['OKRs', 'GTM', 'ARR'].map(k => <span key={k} className="rb-kw-tag rb-kw-missing">{k}</span>)}
                  <span className="rb-kw-tag rb-kw-present">Roadmap</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="rb-stats">
          {[
            { v: '75%', l: 'of resumes rejected by ATS before a human reads them' },
            { v: '6s', l: 'average recruiter time on a resume before deciding' },
            { v: '40%', l: 'more interview callbacks with quantified bullets' },
            { v: '$27K', l: 'average salary increase after negotiating a strong offer' },
          ].map(s => (
            <div key={s.l}>
              <div className="rb-stat-val">{s.v}</div>
              <div className="rb-stat-label">{s.l}</div>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <section className="rb-section rb-section-alt">
          <div className="rb-inner">
            <div className="rb-eyebrow">How it works</div>
            <h2 className="rb-h2">From paste to action plan in 60 seconds</h2>
            <p className="rb-section-sub">No forms to fill out, no account setup. Paste your resume and get real feedback immediately.</p>
            <div className="rb-steps">
              {[
                { n: '01', title: 'Paste your resume', desc: 'Copy from Word, Google Docs, or PDF. Plain text works perfectly — we read the content, not the formatting.' },
                { n: '02', title: 'Add a job description (optional)', desc: 'Paste the posting you\'re targeting and we\'ll run a keyword gap analysis against your resume — exactly what ATS does.' },
                { n: '03', title: 'Get your action plan', desc: 'ATS score, section scores, rewritten bullets, missing keywords, and your top 3 priorities — ranked by impact.' },
              ].map((s, i) => (
                <div key={s.n} className="rb-step">
                  <div className="rb-step-num">{s.n}</div>
                  <div className="rb-step-title">{s.title}</div>
                  <div className="rb-step-desc">{s.desc}</div>
                  {i < 2 && <div className="rb-step-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="rb-section">
          <div className="rb-inner">
            <div className="rb-eyebrow">Before &amp; After</div>
            <h2 className="rb-h2">The difference that gets you interviews</h2>
            <p className="rb-section-sub">Responsibilities get ignored. Outcomes get interviews. Here&apos;s what Hayven does to your bullets.</p>
            <div className="rb-ba-grid">
              {[
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
              ].map(ex => (
                <div key={ex.label} className="rb-ba-card">
                  <div className="rb-ba-label">{ex.label}</div>
                  <div className="rb-ba-cols">
                    <div className="rb-ba-col rb-ba-col-left">
                      <span className="rb-ba-tag rb-ba-before">❌ Before</span>
                      <div className="rb-ba-text rb-ba-text-before">{ex.before}</div>
                    </div>
                    <div className="rb-ba-col">
                      <span className="rb-ba-tag rb-ba-after">✓ After Hayven</span>
                      <div className="rb-ba-text rb-ba-text-after">{ex.after}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="rb-section rb-section-alt">
          <div className="rb-inner">
            <div className="rb-eyebrow">What you get</div>
            <h2 className="rb-h2">Everything in one analysis</h2>
            <p className="rb-section-sub">Most tools give you formatting tips. Hayven gives you the content changes that actually move the needle.</p>
            <div className="rb-features-grid">
              {[
                { icon: '🎯', title: 'ATS Score', desc: 'Your resume scored 0–100 against applicant tracking systems — the software that filters 75% of applications before a human sees them.' },
                { icon: '✍️', title: 'Bullet Rewrites', desc: 'We identify your weakest bullets and rewrite them from vague responsibilities to quantified, action-led outcomes that recruiters actually stop to read.' },
                { icon: '🔍', title: 'Keyword Gap Analysis', desc: 'Paste a job description and see exactly which keywords are missing from your resume — and where to add them without sounding robotic.' },
                { icon: '📊', title: 'Section-by-Section Score', desc: 'Every section scored independently: summary, experience, skills, education. Drill into each one for specific feedback on what to fix first.' },
                { icon: '⚡', title: 'Top 3 Priority Actions', desc: 'We don\'t overwhelm you with 40 suggestions. We rank your most impactful fixes and tell you exactly what to work on first.' },
                { icon: '💬', title: 'Interview Readiness', desc: 'A plain-language assessment of whether your resume will generate calls — and if not, specifically what\'s holding it back.' },
              ].map(f => (
                <div key={f.title} className="rb-feature-card">
                  <div className="rb-feature-icon">{f.icon}</div>
                  <div className="rb-feature-title">{f.title}</div>
                  <div className="rb-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLE + SIDEBAR */}
        <section className="rb-section">
          <div className="rb-inner">
            <div className="rb-article-grid">
              <div className="rb-article-body">
                <div className="rb-eyebrow">The guide</div>
                <h2 className="rb-h2">How to write a resume that actually gets interviews</h2>
                <p>Most people treat resume writing as a formatting exercise. They spend hours tweaking margins, fonts, and layouts — then wonder why they&apos;re not getting calls. Formatting matters far less than content. Recruiters don&apos;t care about your template; they care whether your resume answers one question in the first six seconds: <em>can this person do the job?</em></p>

                <h3>The ATS problem most candidates don&apos;t know about</h3>
                <p>Before your resume reaches a human, it passes through an Applicant Tracking System. These systems parse your resume for keywords that match the job description, score it, and filter out anything below the threshold. Studies consistently show that 75% of resumes are rejected by ATS before a recruiter ever sees them — not because the candidates aren&apos;t qualified, but because their resume isn&apos;t optimized for the software.</p>
                <p>The fix is straightforward: match the language in the job description. If the posting says &quot;cross-functional collaboration,&quot; use that phrase. If it says &quot;P&amp;L ownership,&quot; don&apos;t write &quot;budget responsibility.&quot; ATS systems do exact or near-exact keyword matching, not semantic understanding.</p>

                <h3>Accomplishments, not responsibilities</h3>
                <p>The single biggest improvement most resumes need is shifting from responsibility-based bullets to accomplishment-based bullets. &quot;Managed social media accounts&quot; describes a job. &quot;Grew Instagram from 12K to 89K followers in 11 months by launching a short-form video strategy&quot; describes an outcome — and outcomes are what get you hired.</p>
                <p>Every bullet point should answer: <em>so what?</em> What happened as a result of what you did? What changed, improved, grew, or was saved? If you can&apos;t answer that, the bullet is describing a responsibility, not an accomplishment.</p>

                <h3>How to quantify experience when you don&apos;t have hard numbers</h3>
                <p>Not every role generates clean metrics — and that&apos;s fine. You can quantify scope (team size, budget managed, number of clients), time (delivered in 3 weeks vs. expected 8), frequency (ran 40+ customer interviews per quarter), or scale (launched in 12 markets across 4 countries). The goal isn&apos;t to manufacture numbers — it&apos;s to give recruiters a sense of the size and impact of your work.</p>

                <h3>The top of your resume is the most valuable real estate</h3>
                <p>Recruiters read top-to-bottom and left-to-right, and they stop when they&apos;ve seen enough. That decision usually happens within the first third of the first page. Your summary, your most recent role title, and your first two or three bullets carry disproportionate weight. Lead with your strongest accomplishment — don&apos;t save the best for last.</p>

                <h3>Why tailoring for each role matters more than you think</h3>
                <ul>
                  <li>ATS keyword filters are role-specific — a generic resume may pass for one role and fail for another</li>
                  <li>Recruiters who read the same resume 50 times a day notice immediately when a summary was written for a different job</li>
                  <li>Tailored resumes signal effort and genuine interest — soft signals that compound when the rest of the application is competitive</li>
                  <li>Hayven&apos;s job description matching makes tailoring fast — paste the posting and we show you exactly what to change</li>
                </ul>
              </div>

              <div>
                <div className="rb-sidebar-card">
                  <div className="rb-sidebar-title">By the numbers</div>
                  {[
                    { v: '75%', l: 'of resumes rejected by ATS before a human sees them' },
                    { v: '6s', l: 'average recruiter attention before moving on' },
                    { v: '40%', l: 'more callbacks from resumes with quantified results' },
                    { v: '3×', l: 'higher interview rate with tailored vs. generic resumes' },
                  ].map(s => (
                    <div key={s.l} className="rb-sidebar-stat">
                      <div className="rb-sidebar-val">{s.v}</div>
                      <div className="rb-sidebar-lbl">{s.l}</div>
                    </div>
                  ))}
                  <Link href="/signup" className="rb-sidebar-btn">Analyze My Resume — Free</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="rb-section rb-section-alt">
          <div className="rb-inner">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="rb-eyebrow">FAQ</div>
              <h2 className="rb-h2">Common questions</h2>
            </div>
            <div className="rb-faq-grid">
              {[
                {
                  q: 'Is Hayven\'s resume builder really free?',
                  a: 'Yes — signing up is free and you can analyze your resume immediately. No credit card required to get started. Pro features like unlimited analyses and PDF export are available on the paid plan.',
                },
                {
                  q: 'What format should I paste my resume in?',
                  a: 'Plain text works best. Copy your resume directly from Word, Google Docs, or a PDF reader and paste it in. The AI reads the content, not the visual formatting, so don\'t worry about losing layout.',
                },
                {
                  q: 'Will this work for any industry?',
                  a: 'Yes. Hayven has analyzed resumes across tech, finance, marketing, sales, healthcare, operations, law, and more. The AI adjusts its feedback based on your target role and industry context.',
                },
                {
                  q: 'How does the ATS scoring work?',
                  a: 'We analyze keyword density, section structure, formatting compatibility, and job-description alignment — the same signals that ATS systems use to rank candidates. A score above 75 means you\'re likely to pass automated filters for most roles.',
                },
                {
                  q: 'Can I use this to tailor my resume for different jobs?',
                  a: 'Yes — paste a specific job description alongside your resume and we\'ll show you exactly which keywords to add, which bullets to strengthen, and how to reframe your experience for that role.',
                },
                {
                  q: 'How is this different from a resume template builder?',
                  a: 'Template builders help you format a document. Hayven focuses on content — the words, bullets, and framing that actually get you interviews. A beautiful template with weak bullets still gets ignored. Strong content on a simple template gets callbacks.',
                },
              ].map(f => (
                <div key={f.q} className="rb-faq-item">
                  <div className="rb-faq-q">{f.q}</div>
                  <div className="rb-faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="rb-cta">
          <h2>Stop losing jobs to a <em>weak resume</em></h2>
          <p className="rb-cta-sub">Get your ATS score, bullet rewrites, and action plan in under 60 seconds — free.</p>
          <Link href="/signup" className="rb-btn-white">
            Analyze My Resume — Free →
          </Link>
          <p className="rb-cta-fine">No credit card required</p>
        </div>
      </div>
    </>
  )
}
