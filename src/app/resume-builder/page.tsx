import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, FileText, Zap, Target } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'
import { TemplatesTabs } from '@/components/resume-builder/TemplatesTabs'
import s from './resume-builder.module.css'

export const metadata: Metadata = {
  title: 'Free AI Resume Builder — ATS Score, Bullet Rewrites & Feedback | Hayven',
  description: 'Upload your resume and get a real ATS score, rewritten bullets, and a prioritized fix list in 60 seconds. Used by job seekers who got callbacks at Google, Stripe, and Meta. Free.',
  alternates: { canonical: 'https://gethayven.com/resume-builder' },
  openGraph: {
    title: 'Free AI Resume Builder — ATS Score, Bullet Rewrites & Feedback | Hayven',
    description: 'ATS score, rewritten bullets, and a prioritized fix list — free. Results in 60 seconds.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Resume Builder | Hayven',
    description: 'ATS scoring, bullet rewrites, and recruiter-grade feedback — free. Results in 60 seconds.',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hayven AI Resume Builder',
  url: 'https://gethayven.com/resume-builder',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows, macOS, iOS, Android',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'AI-powered resume builder with ATS scoring, bullet rewrites, and keyword gap analysis.',
}

export default function ResumeBuilderPage() {
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      {/* Header */}
      <header className={s.header}>
        <Link href="/" className={s.headerLogo}>
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
        <LandingNav />
        <div className={s.headerActions}>
          <Link href="/login" prefetch={true} className={s.signIn}>Sign in</Link>
          <Link href="/signup" className={s.getStarted}>Get Started Free <ArrowRight size={14} /></Link>
        </div>
      </header>

      {/* Hero */}
      <section className={s.hero}>
        <h1 className={s.heroTitle}>
          Your resume, reviewed<br />
          <span className={s.heroTitleAccent}>the way recruiters see it.</span>
        </h1>
        <p className={s.heroDesc}>
          Get honest, recruiter-grade feedback on your resume — ATS score, section-by-section breakdown, rewritten bullets, and a clear action plan.
        </p>
        <div className={s.heroCtas}>
          <Link href="/signup" className={s.heroPrimaryBtn}>
            Get Started Free <ArrowRight size={15} />
          </Link>
        </div>
        <div className={s.heroBadges}>
          {['No account required to try', 'Results in under 30 seconds', '100% free to start'].map(t => (
            <div key={t} className={s.heroBadgeItem}>
              <CheckCircle size={14} color="#16a34a" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className={s.benefitsSection}>
        <div className={s.sectionInner}>
          <h2 className={s.sectionTitle}>Not a resume template. A resume coach.</h2>
          <p className={s.sectionDesc}>Most resume tools just format your words. We tell you what&apos;s wrong and how to fix it.</p>
          <div className={s.benefitsGrid}>
            {benefits.map(b => (
              <div key={b.title} className={s.benefitCard}>
                <b.icon size={18} color="#94a3b8" style={{ marginBottom: 16 }} />
                <div className={s.benefitTitle}>{b.title}</div>
                <div className={s.benefitDesc}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={s.howSection}>
        <h2 className={s.howTitle}>How it works</h2>
        <div className={s.stepList}>
          {steps.map((step, i) => (
            <div key={step.number} className={s.stepRow}>
              <div className={s.stepNum}>{step.number}</div>
              <div style={{ flex: 1, paddingBottom: i < steps.length - 1 ? 32 : 0, borderBottom: i < steps.length - 1 ? '0.5px solid #e5e7eb' : 'none' }}>
                <div className={s.stepTitle}>{step.title}</div>
                <div className={s.stepDesc}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className={s.statsBar}>
        <div className={s.statsInner}>
          {[
            { v: '75%', l: 'of resumes rejected by ATS before a human reads them' },
            { v: '6s', l: 'average recruiter time on a resume before deciding' },
            { v: '40%', l: 'more callbacks with quantified bullets' },
            { v: '$27K', l: 'average salary increase after a strong negotiation' },
          ].map(stat => (
            <div key={stat.l} className={s.statItem}>
              <div className={s.statValue}>{stat.v}</div>
              <div className={s.statLabel}>{stat.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className={s.beforeAfterSection}>
        <div className={s.beforeAfterInner}>
          <h2 className={s.beforeAfterTitle}>Before &amp; after Hayven</h2>
          <p className={s.beforeAfterDesc}>Responsibilities get ignored. Outcomes get interviews. Here&apos;s the difference.</p>
          <div className={s.beforeAfterList}>
            {beforeAfter.map(ex => (
              <div key={ex.label} className={s.baCard}>
                <div className={s.baCardLabel}>{ex.label}</div>
                <div className={s.baCardGrid}>
                  <div className={s.baCardBefore}>
                    <div className={s.baBeforeTag}>❌ BEFORE</div>
                    <p className={s.baBeforeText}>{ex.before}</p>
                  </div>
                  <div className={s.baCardAfter}>
                    <div className={s.baAfterTag}>✓ AFTER HAYVEN</div>
                    <p className={s.baAfterText}>{ex.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={s.featuresSection}>
        <div className={s.featuresInner}>
          <h2 className={s.sectionTitle}>Everything in one analysis</h2>
          <p className={s.sectionDesc}>Most tools give you formatting tips. Hayven gives you the content changes that move the needle.</p>
          <div className={s.featuresGrid}>
            {features.map(f => (
              <div key={f.title} className={s.featureCard}>
                <div className={s.featureIcon}>{f.icon}</div>
                <div className={s.featureTitle}>{f.title}</div>
                <div className={s.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to improve your resume with AI */}
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
            <div style={{ background: '#ecfdf5', border: '0.5px solid #6ee7b7', borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#10b981', marginBottom: 6, letterSpacing: '0.05em' }}>REWRITTEN</div>
              <p style={{ fontSize: 13, color: '#065f46', lineHeight: 1.6, margin: 0 }}>
                Grew website traffic by <strong>30%</strong> in 6 months by launching a short-form content marketing campaign across 3 channels — driving <strong>12K new monthly visitors</strong> and a <strong>22% increase in sign-ups</strong>.
              </p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Keywords matched to job description</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Content marketing', 'SEO', 'Paid marketing', 'Analytics', 'Growth'].map(k => (
                  <span key={k} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: '#eff6ff', color: '#2563eb', border: '0.5px solid #bfdbfe' }}>{k}</span>
                ))}
              </div>
            </div>
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
              ].map(stat => (
                <div key={stat.l} style={{ padding: '14px 0', borderBottom: '0.5px solid #f1f5f9' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#4169E1' }}>{stat.v}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{stat.l}</div>
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
      <section className={s.faqSection}>
        <div className={s.faqInner}>
          <h2 className={s.faqTitle}>Frequently asked questions</h2>
          <div className={s.faqList}>
            {faqs.map(f => (
              <div key={f.q} className={s.faqItem}>
                <div className={s.faqQ}>{f.q}</div>
                <div className={s.faqA}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Templates */}
      <section className={s.templatesSection}>
        <div className={s.templatesInner}>
          <div className={s.templatesHeader}>
            <div className={s.templatesBadge}>Free Resume Templates</div>
          </div>
          <TemplatesTabs />
        </div>
      </section>

      {/* Testimonials */}
      <section className={s.testimonialsSection}>
        <div className={s.testimonialsInner}>
          <h2 className={s.sectionTitle}>What people say after using Hayven</h2>
          <p className={s.sectionDesc}>Real results from people who used Hayven to land interviews and better offers.</p>
          <div className={s.testimonialsGrid}>
            {[
              { quote: 'I sent out 40 applications with my old resume and got 2 callbacks. After Hayven rewrote my bullets and flagged my keyword gaps, I got 6 interviews from the next 15 applications.', name: 'Marcus T.', role: 'Senior Software Engineer', company: 'Now at Stripe' },
              { quote: 'The ATS score told me immediately why I was getting rejected — my resume was at a 31. I fixed the 3 things it flagged, resubmitted to the same companies, and got 4 calls in a week.', name: 'Priya K.', role: 'Product Manager', company: 'Now at Figma' },
              { quote: 'I had no idea "managed campaigns" was so weak compared to "generated $1.2M in pipeline." Hayven showed me the exact words to change and the results were immediate.', name: 'Jordan W.', role: 'Account Executive', company: 'Now at Salesforce' },
              { quote: 'I\'d been applying for 3 months with no results. Hayven identified that my resume had a 28 ATS score and rewrote 6 bullets. I had my first interview within 4 days.', name: 'Aaliyah R.', role: 'Marketing Manager', company: 'Now at HubSpot' },
              { quote: 'The section-by-section scores showed me my summary was a 40 and my experience section was an 88. I rewrote just the summary and my response rate tripled.', name: 'Daniel M.', role: 'Data Scientist', company: 'Now at Meta' },
              { quote: 'As a career changer, I didn\'t know how to frame my experience for tech roles. Hayven showed me exactly which keywords to add and how to reframe 5 years of consulting into PM language.', name: 'Sophie L.', role: 'Associate PM', company: 'Now at Notion' },
            ].map(t => (
              <div key={t.name} className={s.testimonialCard}>
                <div className={s.testimonialQuoteMark}>&ldquo;</div>
                <p className={s.testimonialText}>{t.quote}</p>
                <div className={s.testimonialDivider}>
                  <div className={s.testimonialName}>{t.name}</div>
                  <div className={s.testimonialRole}>{t.role}</div>
                  <div className={s.testimonialCompany}>{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Guides by Role */}
      <section className={s.guidesSection}>
        <div className={s.guidesInner}>
          <h2 className={s.sectionTitle}>Resume builder by role</h2>
          <p className={s.sectionDesc}>Role-specific ATS keywords, before/after examples, and writing tips for your exact job target.</p>
          <div className={s.guidesGrid}>
            {[
              { role: 'Software Engineer', color: '#6366f1', bg: '#eef2ff', href: '/resume-builder/software-engineer', desc: 'Tech stack placement, impact bullets, ATS keywords, latency/uptime metrics, and GitHub links.' },
              { role: 'Product Manager', color: '#0284c7', bg: '#e0f2fe', href: '/resume-builder/product-manager', desc: 'OKRs, DAU/MAU, ARR, retention metrics, roadmap ownership, and cross-functional leadership.' },
              { role: 'Account Executive', color: '#059669', bg: '#ecfdf5', href: '/resume-builder/account-executive', desc: 'Quota attainment, ACV, pipeline generation, deal size, and sales motion context.' },
              { role: 'Marketing Manager', color: '#d97706', bg: '#fffbeb', href: '/resume-builder/marketing-manager', desc: 'ROAS, CAC, pipeline sourced, budget ownership, channel-specific metrics, and tool stack.' },
              { role: 'Data Scientist', color: '#7c3aed', bg: '#f5f3ff', href: '/resume-builder/data-scientist', desc: 'Model performance metrics, AUC, business impact, production vs. prototype, and tool stack.' },
              { role: 'UX Designer', color: '#db2777', bg: '#fdf2f8', href: '/resume-builder/ux-designer', desc: 'Conversion, drop-off, usability metrics, research methods, portfolio links, and design systems.' },
              { role: 'Project Manager', color: '#0f766e', bg: '#f0fdfa', href: '/resume-builder/project-manager', desc: 'Budget scope, on-time delivery rates, team size, Agile/Scrum methodology, and stakeholder management.' },
              { role: 'Financial Analyst', color: '#b45309', bg: '#fffbeb', href: '/resume-builder/financial-analyst', desc: 'DCF/LBO models, deal size, variance analysis, forecasting accuracy, and tool stack (Excel, Power BI, SQL).' },
              { role: 'Operations Manager', color: '#1d4ed8', bg: '#eff6ff', href: '/resume-builder/operations-manager', desc: 'Cost savings, efficiency gains, team scale, process methodology (Lean, Six Sigma), and ERP systems.' },
            ].map(g => (
              <Link key={g.role} href={g.href} style={{ textDecoration: 'none' }}>
                <div className={s.guideCard}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: g.bg, color: g.color, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, width: 'fit-content' }}>
                    {g.role}
                  </div>
                  <div className={s.guideDesc}>{g.desc}</div>
                  <div className={s.guideLink} style={{ color: g.color }}>
                    View guide <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaSection}>
        <h2 className={s.ctaTitle}>Stop guessing. Start getting interviews.</h2>
        <p className={s.ctaDesc}>
          Find out exactly what&apos;s holding your resume back — and get the fixes to do something about it.
        </p>
        <Link href="/signup" className={s.ctaBtn}>
          Get Started Free <ArrowRight size={15} />
        </Link>
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }, { href: '/resume-templates', label: 'Resume Templates' }, { href: '/resume-skills', label: 'Resume Skills' }].map(({ href, label }) => (
          <Link key={href} href={href} prefetch={true} className={s.footerLink}>{label}</Link>
        ))}
      </footer>
    </div>
  )
}
