import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import s from './page.module.css'
import {
  TrendingUp, BookOpen, Play, FileSearch,
  Calculator, DollarSign, Mail, Shield, PenLine, MessageSquare,
  UserCircle, FileText, Search, ClipboardList, PenSquare, ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'
import { FAQ } from '@/components/negotiate/FAQ'
import { LandingSarahWidget } from '@/components/negotiate/LandingSarahWidget'
import { HeroWidget } from '@/components/negotiate/HeroWidget'

export const metadata: Metadata = {
  title: 'Hayven — Salary Negotiation Coach & Career Tools',
  description: 'Know your market rate, build your counter-offer, and negotiate with confidence. Free salary negotiation tools, AI career coaching, and resume feedback — start in 60 seconds.',
  alternates: { canonical: 'https://gethayven.com' },
  openGraph: {
    title: 'Hayven — Salary Negotiation Coach & Career Tools',
    description: 'Know your market rate, build your counter-offer, and negotiate with confidence. Free salary negotiation tools and AI career coaching.',
    url: 'https://gethayven.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayven — Salary Negotiation Coach & Career Tools',
    description: 'Know your market rate, counter any offer, and negotiate your next raise. Free to start.',
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hayven',
  url: 'https://gethayven.com',
  logo: { '@type': 'ImageObject', url: 'https://gethayven.com/logo.svg' },
  description: 'AI-powered salary negotiation and career coaching platform.',
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hayven',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows, macOS, iOS, Android',
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', price: '20', priceCurrency: 'USD' },
  ],
  description: 'Know your market rate, negotiate your salary, and build your career with AI coaching.',
  url: 'https://gethayven.com',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I know if my job offer is competitive?',
      acceptedAnswer: { '@type': 'Answer', text: 'Enter your offer details into Hayven\'s Offer Evaluator to get a 0–100 score comparing your offer against market benchmarks for your role, level, and city. It breaks down salary, equity, bonus, and benefits so you know exactly what\'s below market and what to push on before you sign.' },
    },
    {
      '@type': 'Question',
      name: 'How much should I negotiate my salary by?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most candidates should counter at the 75th percentile for their role and market, which typically means asking for 10–20% more than the initial offer. Use Hayven\'s Compensation Analyzer to get the exact market rate for your role and city, then anchor your counter to that number.' },
    },
    {
      '@type': 'Question',
      name: 'Will negotiating my salary hurt my chances of getting the offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Almost never. Studies show that 85% of people who negotiate their salary get more money, and employers rarely rescind offers because a candidate negotiated professionally. Companies build negotiation room into their initial offers — accepting without countering means leaving money the company already budgeted for you on the table.' },
    },
    {
      '@type': 'Question',
      name: 'What do I say when a recruiter asks my current salary?',
      acceptedAnswer: { '@type': 'Answer', text: 'You are not required to share your current salary in most US states. A safe response: "I\'d prefer to focus on what the role is worth and what I can bring to it — what\'s the budgeted range for this position?" Sharing your current salary anchors the negotiation to your past pay rather than your market value.' },
    },
    {
      '@type': 'Question',
      name: 'How do I ask my manager for a raise?',
      acceptedAnswer: { '@type': 'Answer', text: 'Come prepared with three things: your market rate compared to your current salary, a list of concrete contributions since your last review, and a specific dollar ask. Hayven\'s Raise Request Builder generates a ready-to-present document covering all three, including talking points for common manager objections.' },
    },
  ],
}

export default function LandingPage() {
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Top announcement bar */}
      <div className={s.announcementBar}>
        <div className={s.announcementText}>
          <span className={s.announcementEmoji}>🏆 </span>
          <span className={s.announcementBold}>85% of people who negotiate their salary get more money</span>
          <span className={s.announcementSub}> — are you leaving money on the table?</span>
        </div>
        <Link href="/signup" className="landing-announcement-cta" style={{ fontSize: 13, fontWeight: 600, color: '#7AB8E8', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Find out →
        </Link>
      </div>

      {/* Header */}
      <header className={`landing-header ${s.header}`}>
        <Link href="/" className={s.headerLogo}>
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
        <LandingNav />
        <div className={s.headerActions}>
          <Link href="/login" prefetch={true} className={s.signIn}>Sign in</Link>
          <Link href="/signup" className={s.getStarted}>
            Get Started Free <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <main>
      {/* Hero */}
      <section className={`landing-hero landing-section-pad ${s.heroSection}`}>
        <div className={s.heroHeadline}>
          <h1 className={s.heroH1}>Are You Underpaid?</h1>
          <p className={s.heroSubtitle}>Find out in 30 seconds — free.</p>
        </div>
        <div className={s.heroWidgetWrap}>
          <HeroWidget />
        </div>
      </section>

      {/* Testimonial — Israel */}
      <section className={s.testimonialSection}>
        <div className={s.testimonialInner}>
          <div className="landing-testimonial-card landing-testimonial-card-inner">
            <div className="landing-testimonial-quote landing-testimonial-quote-mark">&ldquo;</div>
            <div className="testimonial-stars">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#F59E0B"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <p className="testimonial-quote-text">
              &ldquo;I really like that Sarah made my resume analysis experience personalized — it felt like I was actually talking to a real human being and that&apos;s unique. She even created a tailored plan for me to get to my salary goal with outlined steps and a specific plan. This truly helped me feel confident for my next interview. Thanks Hayven!&rdquo;
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">I</div>
              <div>
                <div className="testimonial-name">Israel</div>
                <div className="testimonial-role">Software Engineer &mdash; Hayven user</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .landing-hero-grid { grid-template-columns: 1fr !important; }
          .landing-sarah { grid-template-columns: 1fr !important; gap: 40px !important; }
          .landing-tools-grid { grid-template-columns: 1fr !important; }
          .landing-sarah-chat { grid-template-columns: 1fr !important; }
          .landing-section-pad { padding: 64px 20px !important; }
          .landing-hero { padding: 48px 20px 64px !important; }
          .landing-logo-strip { padding: 20px 20px !important; }
          .landing-nav { display: none !important; }
          .landing-header { padding: 0 16px !important; }
          .landing-footer { padding: 40px 20px !important; }
          .landing-footer-links { gap: 32px !important; flex-direction: column !important; }
          .landing-testimonial-card { padding: 28px 20px !important; }
          .landing-testimonial-quote { left: 16px !important; font-size: 56px !important; top: 16px !important; }
          .landing-resume-grid { grid-template-columns: 1fr !important; }
          .landing-announcement-cta { display: none !important; }
          .landing-sarah-widget { min-height: 280px !important; }
        }
        @media (max-width: 480px) {
          .tool-page-header { padding: 0 16px !important; }
          .tool-page-h1 { white-space: normal !important; }
        }
      `}</style>

      {/* Logo strip */}
      <div className={s.logoStrip}>
        <div className={s.logoStripInner}>
          <div className={s.logoStripLabel}>USED BY PROFESSIONALS AT</div>
          <div className={s.logoStripRow}>
            {LOGOS.map(({ name, color }) => (
              <div key={name} className={s.logoItem} style={{ color }}>{name}</div>
            ))}
          </div>
        </div>
      </div>

      <LandingSarahWidget />

      {/* Career Hub */}
      <section id="features" className={s.careerHubSection}>
        <div className={s.careerHubInner}>
          <div className={s.sectionHeader}>
            <div className={s.sectionBadge}>CAREER HUB</div>
            <h2 className={s.sectionTitle}>Everything you need to land the job</h2>
            <p className={s.sectionDesc}>From finding the right roles to submitting a polished application — all in one place.</p>
          </div>
          <div className={s.featureGrid}>
            {careerFeatures.map(({ icon: Icon, color, name, desc }) => (
              <div key={name} className={s.featureRow}>
                <div className={s.featureIconWrap}>
                  <Icon size={26} color={color} />
                </div>
                <div className={s.featureContent}>
                  <div className={s.featureName}>{name}</div>
                  <div className={s.featureDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Negotiation tools */}
      <section className={s.toolsSection}>
        <div className={s.toolsInner}>
          <div className={s.sectionHeader}>
            <div className={s.sectionBadge}>NEGOTIATION SUITE</div>
            <h2 className={s.sectionTitle}>Get paid what you&apos;re worth</h2>
            <p className={s.sectionDesc}>10 tools to know your market rate, build your strategy, and practice until you&apos;re ready.</p>
          </div>
          <div className={s.featureGrid}>
            {negotiationTools.map(({ icon: Icon, name, desc }) => (
              <div key={name} className={s.toolRow}>
                <div className={s.toolIconWrap}>
                  <Icon size={26} color="#475569" />
                </div>
                <div className={s.featureContent}>
                  <div className={s.featureName}>{name}</div>
                  <div className={s.featureDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={s.pricingSection}>
        <div className={s.pricingInner}>
          <div className={s.pricingBadge}>PRICING</div>
          <h2 className={s.pricingTitle}>Simple, transparent pricing</h2>

          <div className={s.pricingCard}>
            <div className={s.pricingPlan}>PRO PLAN</div>
            <div className={s.pricingAmount}>$20 <span className={s.pricingAmountSuffix}>/month</span></div>
            <div className={s.pricingSubtitle}>Full unlimited access to everything.</div>
            <div className={s.pricingNote}>Free to start · Cancel anytime.</div>

            <div className={s.pricingFeatures}>
              {proFeatures.map(f => (
                <div key={f} className={s.pricingFeatureItem}>
                  <CheckCircle size={15} color="#16a34a" style={{ flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>

            <Link href="/signup" className={s.pricingCta}>Get Started Free</Link>
            <div className={s.pricingCtaNote}>Cancel anytime. No commitment.</div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Resume Cards Section */}
      <section className={s.resumeSection}>
        <div className={s.resumeInner}>
          <div className={s.resumeHeader}>
            <h2 className={s.resumeTitle}>Resume guides by role</h2>
            <p className={s.resumeDesc}>
              Step-by-step resume breakdowns for the roles that matter most — with real examples and the exact metrics hiring managers want to see.
            </p>
          </div>
          <div className="landing-resume-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 24 }}>

            {/* Software Engineer */}
            <Link href="/blog/software-engineer-resume" className={s.resumeCard}>
              <div className={s.resumeCardMockup}>
                <div className={s.resumeCardMockupInner}>
                  <div className={s.mockName}>Jordan Lee</div>
                  <div className={s.mockMeta}>jordan@email.com · github.com/jlee · linkedin.com/in/jlee</div>
                  <div className={s.mockDivider}>
                    <div className={s.mockLabel}>Skills</div>
                    <div className={s.mockText}>Python · TypeScript · React · Node.js · AWS · Docker · Postgres</div>
                  </div>
                  <div className={s.mockDivider}>
                    <div className={s.mockLabel}>Experience</div>
                    <div className={s.mockJobTitle}>Senior Software Engineer · Stripe</div>
                    <div className={s.mockDate}>2022 – Present</div>
                    <div className={s.mockText}>• Reduced API latency by 40%, cutting p99 from 800ms to 480ms</div>
                    <div className={s.mockText}>• Built real-time pipeline processing 2M events/day with Kafka</div>
                  </div>
                  <div className={s.mockDivider}>
                    <div className={s.mockLabel}>Education</div>
                    <div className={s.mockText}>B.S. Computer Science · UC Berkeley · 2020</div>
                  </div>
                </div>
                <div className={s.resumeCardBadge} style={{ background: '#6366f1' }}>ATS ✓</div>
              </div>
              <div className={s.resumeCardBody}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', marginBottom: 6 }}>Software Engineer</div>
                <div className={s.resumeCardTitle}>Resume guide &amp; examples</div>
                <div className={s.resumeCardDesc}>How to structure your tech stack, write impact-driven bullets, and pass ATS screening.</div>
                <div className={s.resumeCardLink} style={{ color: '#6366f1' }}>Read guide <ArrowRight size={14} /></div>
              </div>
            </Link>

            {/* Account Executive */}
            <Link href="/blog/account-executive-resume" className={s.resumeCard}>
              <div className={s.resumeCardMockup}>
                <div className={s.resumeCardMockupInner}>
                  <div className={s.mockName}>Morgan Chen</div>
                  <div className={s.mockMeta}>morgan@email.com · linkedin.com/in/mchen</div>
                  <div className={s.mockHighlightGreen}>Mid-market SaaS AE · 5 yrs · Avg 118% quota · $30K–$150K ACV</div>
                  <div className={s.mockDivider}>
                    <div className={s.mockLabel}>Experience</div>
                    <div className={s.mockJobTitle}>Account Executive · Salesforce</div>
                    <div className={s.mockDate}>2021 – Present</div>
                    <div className={s.mockText}>• Closed $2.4M ARR in FY2024 at 127% quota — #2 of 18 AEs</div>
                    <div className={s.mockText}>• Self-sourced 60% of pipeline, averaging 4 SQLs/week</div>
                  </div>
                  <div className={s.mockDivider}>
                    <div className={s.mockLabel}>Tools</div>
                    <div className={s.mockText}>Salesforce · Outreach · Gong · MEDDIC · LinkedIn SN</div>
                  </div>
                </div>
                <div className={s.resumeCardBadge} style={{ background: '#059669' }}>127% ✓</div>
              </div>
              <div className={s.resumeCardBody}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#059669', marginBottom: 6 }}>Account Executive</div>
                <div className={s.resumeCardTitle}>Resume guide &amp; examples</div>
                <div className={s.resumeCardDesc}>How to show quota attainment, deal size, and pipeline metrics in a way that lands interviews.</div>
                <div className={s.resumeCardLink} style={{ color: '#059669' }}>Read guide <ArrowRight size={14} /></div>
              </div>
            </Link>

            {/* Marketing Manager */}
            <Link href="/blog/marketing-manager-resume" className={s.resumeCard}>
              <div className={s.resumeCardMockup}>
                <div className={s.resumeCardMockupInner}>
                  <div className={s.mockName}>Alex Rivera</div>
                  <div className={s.mockMeta}>alex@email.com · linkedin.com/in/arivera</div>
                  <div className={s.mockHighlightYellow}>Demand gen · B2B SaaS · 6 yrs · $800K budget ownership</div>
                  <div className={s.mockDivider}>
                    <div className={s.mockLabel}>Experience</div>
                    <div className={s.mockJobTitle}>Marketing Manager · HubSpot</div>
                    <div className={s.mockDate}>2020 – Present</div>
                    <div className={s.mockText}>• Drove $4.2M in pipeline via 6-channel demand gen program</div>
                    <div className={s.mockText}>• Grew organic traffic 8K → 47K/mo in 14 months via SEO</div>
                  </div>
                  <div className={s.mockDivider}>
                    <div className={s.mockLabel}>Tools</div>
                    <div className={s.mockText}>HubSpot · Marketo · GA4 · Semrush · LinkedIn Ads</div>
                  </div>
                </div>
                <div className={s.resumeCardBadge} style={{ background: '#d97706' }}>3.4x ROAS ✓</div>
              </div>
              <div className={s.resumeCardBody}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#d97706', marginBottom: 6 }}>Marketing Manager</div>
                <div className={s.resumeCardTitle}>Resume guide &amp; examples</div>
                <div className={s.resumeCardDesc}>How to show campaign results, budget ownership, and channel impact — not just buzzwords.</div>
                <div className={s.resumeCardLink} style={{ color: '#d97706' }}>Read guide <ArrowRight size={14} /></div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaSection}>
        <div className={s.ctaInner}>
          <h2 className={s.ctaTitle}>Find out what you&apos;re worth.</h2>
          <p className={s.ctaDesc}>
            Sarah will tell you your market rate, what&apos;s holding you back, and exactly what to do next.
          </p>
          <Link href="#check-market-value" className={s.ctaBtn}>
            See my market value <ArrowRight size={16} />
          </Link>
          <div className={s.ctaSmallNote}>Free to start · $20/month after · Cancel anytime.</div>
        </div>
      </section>

      </main>
      {/* Footer */}
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerTop}>
            <div className={s.footerBrand}>
              <Image src="/logo.svg" alt="Hayven" width={130} height={36} style={{ objectFit: 'contain', marginBottom: 12 }} />
              <div>AI-powered career and salary negotiation tools for professionals who want to get paid what they&apos;re worth.</div>
            </div>
            <div className={s.footerLinks}>
              <div className={s.footerCol}>
                <div className={s.footerColTitle}>PRODUCT</div>
                <div className={s.footerColLinks}>
                  {[{ href: '/signup', label: 'Get started' }, { href: '/login', label: 'Sign in' }, { href: '/#features', label: 'Features' }, { href: '/sarah', label: 'Career Coach' }].map(({ href, label }) => (
                    <Link key={href} href={href} className={s.footerLink}>{label}</Link>
                  ))}
                </div>
              </div>
              <div className={s.footerCol}>
                <div className={s.footerColTitle}>TOOLS</div>
                <div className={s.footerColLinks}>
                  {[
                    { href: '/compensation-analyzer', label: 'Compensation Analyzer' },
                    { href: '/negotiation-simulator', label: 'Negotiation Simulator' },
                    { href: '/interview-salary-coach', label: 'Interview Salary Coach' },
                    { href: '/raise-request-builder', label: 'Raise Request Builder' },
                    { href: '/raise-calculator', label: 'Raise Calculator' },
                    { href: '/negotiation-playbook', label: 'Negotiation Playbook' },
                    { href: '/equity-calculator', label: 'Equity Calculator' },
                    { href: '/offer-evaluator', label: 'Offer Evaluator' },
                    { href: '/counter-offer-builder', label: 'Counter-Offer Builder' },
                    { href: '/objection-handler', label: 'Objection Handler' },
                    { href: '/salary-calculator', label: 'Salary Calculator' },
                    { href: '/salary-to-hourly-calculator', label: 'Salary to Hourly' },
                    { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                    { href: '/resume-builder', label: 'Resume Builder' },
                    { href: '/resume-coach', label: 'Resume Coach' },
                    { href: '/resume-templates', label: 'Resume Templates' },
                    { href: '/resume-skills', label: 'Resume Skills' },
                    { href: '/tools/salaries', label: 'Salary Guides' },
                  ].map(({ href, label }) => (
                    <Link key={href} href={href} className={s.footerLink}>{label}</Link>
                  ))}
                </div>
              </div>
              <div className={s.footerCol}>
                <div className={s.footerColTitle}>GUIDES</div>
                <div className={s.footerColLinks}>
                  {[
                    { href: '/salary-negotiation', label: 'Salary Negotiation' },
                    { href: '/how-to-ask-for-a-raise', label: 'How to Ask for a Raise' },
                    { href: '/blog/how-to-negotiate-salary-offer', label: 'Negotiate a Job Offer' },
                    { href: '/blog/salary-negotiation-email-template', label: 'Negotiation Email Template' },
                    { href: '/blog/how-to-evaluate-a-job-offer', label: 'Evaluate a Job Offer' },
                    { href: '/blog/what-your-equity-is-actually-worth', label: 'What Your Equity Is Worth' },
                    { href: '/blog/software-engineer-resume', label: 'Software Engineer Resume' },
                    { href: '/blog/product-manager-resume', label: 'Product Manager Resume' },
                  ].map(({ href, label }) => (
                    <Link key={href} href={href} className={s.footerLink}>{label}</Link>
                  ))}
                </div>
              </div>
              <div className={s.footerCol}>
                <div className={s.footerColTitle}>LEGAL</div>
                <div className={s.footerColLinks}>
                  {[{ href: '/privacy', label: 'Privacy Policy' }, { href: '/terms', label: 'Terms of Service' }].map(({ href, label }) => (
                    <Link key={href} href={href} className={s.footerLink}>{label}</Link>
                  ))}
                </div>
              </div>
              <div className={s.footerCol}>
                <div className={s.footerColTitle}>SUPPORT</div>
                <a href="mailto:GetHayven@gmail.com" className={s.footerLink}>GetHayven@gmail.com</a>
              </div>
            </div>
          </div>
          <div className={s.footerBottom}>
            <div className={s.footerCopy}>© {new Date().getFullYear()} Hayven. All rights reserved.</div>
            <div className={s.footerCopy}>AI-generated guidance for informational purposes only. Results may vary.</div>
            <a href="https://launchaf.com/" target="_blank" rel="noopener" data-launchaf-badge="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://launchaf.com/api/badge/light?v=launchaf-blue-2026-2" alt="Featured on LaunchAF" width={200} height={56} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
