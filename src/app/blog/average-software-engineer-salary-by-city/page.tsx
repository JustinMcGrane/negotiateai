import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Average Software Engineer Salary by City (2026) | Hayven',
  description: 'Software engineer salaries vary dramatically by city. Here\'s a breakdown of average software engineer pay in the top US tech hubs for 2026.',
}

const tag = 'Compensation data'
const readTime = '7 min read'

const cities = [
  { city: 'San Francisco, CA', p25: '$148,000', median: '$182,000', p75: '$224,000', note: 'Highest base salaries in the country. Equity upside is significant at top companies.' },
  { city: 'New York, NY', p25: '$138,000', median: '$168,000', p75: '$208,000', note: 'Finance-adjacent tech roles command premiums. Strong fintech and media sector presence.' },
  { city: 'Seattle, WA', p25: '$140,000', median: '$172,000', p75: '$215,000', note: 'Amazon and Microsoft anchor the market. RSU packages are a major part of total comp.' },
  { city: 'Austin, TX', p25: '$115,000', median: '$142,000', p75: '$175,000', note: 'No state income tax offsets the lower base. Growing rapidly with major company relocations.' },
  { city: 'Boston, MA', p25: '$118,000', median: '$148,000', p75: '$182,000', note: 'Strong biotech and fintech presence. MIT and Harvard pipelines keep competition high.' },
  { city: 'Chicago, IL', p25: '$108,000', median: '$135,000', p75: '$165,000', note: 'Growing tech scene with lower cost of living than coastal cities. Good value market.' },
  { city: 'Denver, CO', p25: '$108,000', median: '$132,000', p75: '$160,000', note: 'Popular remote hub. Salaries reflect local rates for in-office, national rates for remote.' },
  { city: 'Atlanta, GA', p25: '$100,000', median: '$125,000', p75: '$152,000', note: 'Fastest growing tech hub in the Southeast. Delta, Home Depot, and startups drive demand.' },
  { city: 'Remote (US)', p25: '$120,000', median: '$155,000', p75: '$192,000', note: 'Wide range depending on company HQ. Top companies pay SF rates regardless of location.' },
]

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          Average software engineer salary by city (2026)
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Where you work matters almost as much as who you work for. Here&apos;s what software engineers are actually earning across the top US tech markets in 2026.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Software engineer compensation varies by as much as $80,000 a year depending on the city — and that gap has gotten wider, not smaller, as remote work has reshuffled the talent market. Whether you&apos;re evaluating a new offer, planning a move, or just trying to figure out if you&apos;re underpaid, knowing your city&apos;s market is the starting point.</p>
        <p style={{ marginBottom: 24 }}>The data below reflects base salary ranges for mid-level software engineers (3–6 years of experience) across major US tech hubs in 2026. Total compensation including equity and bonus will be higher at most companies.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 20, marginTop: 48 }}>Salary ranges by city</h2>

        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '10px 16px 10px 0', fontWeight: 700, color: '#0f172a' }}>City</th>
                <th style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 700, color: '#0f172a' }}>25th %ile</th>
                <th style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 700, color: '#0f172a' }}>Median</th>
                <th style={{ textAlign: 'right', padding: '10px 0 10px 8px', fontWeight: 700, color: '#0f172a' }}>75th %ile</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((row, i) => (
                <tr key={row.city} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                  <td style={{ padding: '12px 16px 12px 0', fontWeight: 500, color: '#0f172a' }}>{row.city}</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', color: '#64748b' }}>{row.p25}</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{row.median}</td>
                  <td style={{ padding: '12px 0 12px 8px', textAlign: 'right', color: '#059669' }}>{row.p75}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginBottom: 32, fontSize: 13, color: '#94a3b8' }}>Data reflects base salary for mid-level software engineers (3–6 years experience). Total compensation including equity and bonus will vary significantly by company and level.</p>

        {cities.map(row => (
          <div key={row.city} style={{ marginBottom: 0 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 6, marginTop: 36 }}>{row.city}</h3>
            <p style={{ marginBottom: 8 }}><strong>Median base:</strong> {row.median} &nbsp;·&nbsp; <strong>Range:</strong> {row.p25} – {row.p75}</p>
            <p style={{ marginBottom: 0, color: '#475569' }}>{row.note}</p>
          </div>
        ))}

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What these numbers don&apos;t tell you</h2>
        <p style={{ marginBottom: 24 }}>City-level data is a starting point, not the full picture. Your specific level, company size, industry, and tech stack all move the number significantly. A senior engineer at a Series B startup in Austin might earn more total comp than a mid-level engineer at a large enterprise in San Francisco. Equity and bonus can double or triple your base salary at the right company.</p>
        <p style={{ marginBottom: 24 }}>Use these ranges to calibrate — not to set a ceiling. If you&apos;re below the 50th percentile for your city and experience level, you almost certainly have room to negotiate.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to use this data in a negotiation</h2>
        <p style={{ marginBottom: 24 }}>When you get an offer, compare it to the 75th percentile for your city — not the median. You want to aim high in the negotiation, and citing specific data gives you credibility. &ldquo;Based on market data for senior engineers in Seattle, the 75th percentile base is around $215,000. I&apos;d like to discuss getting to $200,000&rdquo; is a much stronger position than &ldquo;I was hoping for more.&rdquo;</p>
        <p style={{ marginBottom: 24 }}>If you&apos;re in a remote role, you have more leverage than a local candidate. Push for the national rate or the rate for the city where the company is headquartered — especially if the company has a location-blind pay policy.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>See exactly where your salary stands</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven shows you your precise market percentile and how much you&apos;re leaving on the table — for your specific role, city, and experience level.</div>
        <Link href="/worth" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check my market value →</Link>
      </div>
    </article>
  )
}
