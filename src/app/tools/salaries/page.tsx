import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { LandingNav } from '@/components/negotiate/LandingNav'
import { SALARY_ROLES } from '@/lib/salaries/roles'

export const metadata: Metadata = {
  title: 'Salary Guides by Role — What You Should Be Earning | Hayven',
  description: 'Explore real salary data for your role. See market percentiles, top-paying cities, and negotiation tips — tailored to your job title.',
  alternates: { canonical: 'https://gethayven.com/tools/salaries' },
  openGraph: {
    title: 'Salary Guides by Role | Hayven',
    description: 'Explore salary data and negotiation tips for dozens of roles.',
  },
}

export default function SalariesIndexPage() {
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

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 40px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', marginBottom: 16 }}>SALARY GUIDES</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: 16, color: '#0f172a' }}>
          Know what you should be earning.
        </h1>
        <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.7, maxWidth: 520, marginBottom: 48 }}>
          Real salary ranges, top-paying cities, and negotiation tips for the roles people actually work.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {SALARY_ROLES.map(role => (
            <Link key={role.slug} href={`/tools/salaries/${role.slug}`} style={{ textDecoration: 'none', border: '0.5px solid #e5e7eb', borderRadius: 12, padding: '20px 20px', background: '#fff', display: 'block', transition: 'border-color 0.15s' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 8 }}>{role.category.toUpperCase()}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{role.title}</div>
              <div style={{ fontSize: 13, color: '#4169E1', display: 'flex', alignItems: 'center', gap: 4, marginTop: 12 }}>View salary data <ArrowRight size={12} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#0f172a', padding: '72px 24px', textAlign: 'center', marginTop: 80 }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Know your number. Then negotiate it.</h2>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto 36px' }}>Hayven helps you understand your market value and negotiate with confidence.</p>
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
