import Link from 'next/link'

type BlogCTAProps = {
  heading: string
  subtext: string
  buttonLabel: string
  href: string
}

export function BlogCTA({ heading, subtext, buttonLabel, href }: BlogCTAProps) {
  return (
    <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{heading}</div>
      <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>{subtext}</div>
      <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
        {buttonLabel} →
      </Link>
    </div>
  )
}
