import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, TrendingUp, MapPin, Briefcase, DollarSign } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'
import { SALARY_ROLES, getRoleBySlug } from '@/lib/salaries/roles'
import { fetchSalaryData, type SalaryData } from '@/lib/salaries/data'

export const revalidate = 86400

export async function generateStaticParams() {
  return SALARY_ROLES.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const role = getRoleBySlug(slug)
  if (!role) return {}
  return {
    title: `${role.title} Salary — What You Should Earn in 2025 | Hayven`,
    description: `See real ${role.title} salary data: 25th to 90th percentile ranges, top-paying cities, and expert negotiation tips to help you earn more.`,
    alternates: { canonical: `https://gethayven.com/tools/salaries/${slug}` },
    openGraph: {
      title: `${role.title} Salary Guide | Hayven`,
      description: `Real ${role.title} salary ranges, top-paying markets, and negotiation tips.`,
    },
  }
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US')
}

export default async function SalaryRolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const role = getRoleBySlug(slug)
  if (!role) notFound()

  let data: SalaryData
  try {
    data = await fetchSalaryData(role.title, role.context)
  } catch {
    notFound()
  }

  const percentiles = [
    { label: '25th percentile', value: data.p25, desc: 'Entry-level or lower cost-of-living markets' },
    { label: '50th percentile', value: data.p50, desc: 'Median — most roles fall here' },
    { label: '75th percentile', value: data.p75, desc: 'Experienced, larger market or company' },
    { label: '90th percentile', value: data.p90, desc: 'Top earners, premium markets' },
  ]

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}><Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority /></Link>
        <LandingNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" prefetch={true} style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free <ArrowRight size={14} /></Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '52px 24px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Link href="/tools/salaries" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Salary Guides</Link>
          <span style={{ color: '#cbd5e1', fontSize: 13 }}>/</span>
          <span style={{ fontSize: 13, color: '#0f172a' }}>{role.title}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: 16, color: '#0f172a' }}>
          {role.title} Salary Guide
        </h1>
        <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.7, maxWidth: 560, marginBottom: 0 }}>
          Real salary ranges for {role.title}s in the US market — what you should expect, and what you can negotiate.
        </p>
      </section>

      {/* Salary percentiles */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '52px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <DollarSign size={18} color="#4169E1" />
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>Salary Ranges</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
            {percentiles.map(p => (
              <div key={p.label} style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 12, padding: '20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 8 }}>{p.label.toUpperCase()}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>{fmt(p.value)}</div>
                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ fontSize: 14, color: '#1e40af', lineHeight: 1.65, margin: 0 }}>{data.insight}</p>
          </div>
        </div>
      </section>

      {/* Top paying cities */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '52px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <MapPin size={16} color="#4169E1" />
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Top-Paying Cities</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {data.topPayingCities.map((c, i) => (
                <div key={c.city} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < data.topPayingCities.length - 1 ? '0.5px solid #f1f5f9' : 'none' }}>
                  <span style={{ fontSize: 14, color: '#374151' }}>{c.city}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>{fmt(c.median)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <Briefcase size={16} color="#4169E1" />
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Top-Paying Industries</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {data.topPayingIndustries.map((ind, i) => (
                <div key={ind.industry} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < data.topPayingIndustries.length - 1 ? '0.5px solid #f1f5f9' : 'none' }}>
                  <span style={{ fontSize: 14, color: '#374151' }}>{ind.industry}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>{fmt(ind.median)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Negotiation tip */}
      <section style={{ background: '#f8fafc', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb', padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <TrendingUp size={16} color="#4169E1" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Negotiation Tip for {role.title}s</h2>
          </div>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 24 }}>{data.negotiationTip}</p>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 2px 8px rgba(239,68,68,0.25)' }}>
            Practice your negotiation <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* Related tools */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Related tools</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { href: '/compensation-analyzer', label: 'Compensation Analyzer' },
            { href: '/counter-offer-builder', label: 'Counter-Offer Builder' },
            { href: '/negotiation-simulator', label: 'Negotiation Simulator' },
            { href: '/raise-request-builder', label: 'Raise Request Builder' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: '#4169E1', textDecoration: 'none', border: '1px solid #dbeafe', borderRadius: 8, padding: '6px 14px', background: '#eff6ff' }}>{label}</Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Know your worth. Negotiate with confidence.</h2>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto 36px' }}>Get your personalized salary analysis and negotiation coaching — free to start.</p>
        <Link href="/signup" style={{ height: 50, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 32px', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free <ArrowRight size={15} /></Link>
      </section>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24 }}>
        {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(({ href, label }) => (
          <Link key={href} href={href} prefetch={true} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
        ))}
      </footer>
    </div>
  )
}
