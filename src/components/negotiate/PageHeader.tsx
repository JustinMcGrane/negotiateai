import Link from 'next/link'
import type React from 'react'

interface Props {
  title: string
  description?: string | React.ReactNode
  userInitial?: string
  plan?: string
}

const planConfig: Record<string, { label: string; bg: string; color: string }> = {
  elite:  { label: 'Elite',  bg: '#ede9fe', color: '#6d28d9' },
  pro:    { label: 'Pro',    bg: '#dbeafe', color: '#1d4ed8' },
  free:   { label: 'Free',   bg: '#f1f5f9', color: '#64748b' },
  report: { label: 'Report', bg: '#dbeafe', color: '#1d4ed8' },
}

export function PageHeader({ title, description, userInitial, plan = 'free' }: Props) {
  const pc = planConfig[plan] ?? planConfig.free
  const initial = userInitial ?? '?'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      height: 58,
      background: '#fff',
      borderBottom: '1px solid #e2e8f0',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      zIndex: 20,
      gap: 16,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </div>
        {description && (
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1, lineHeight: 1.3 }}>{description}</div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <span style={{
          fontSize: 11, fontWeight: 600,
          padding: '3px 10px', borderRadius: 20,
          background: pc.bg, color: pc.color,
          letterSpacing: '0.03em',
        }}>
          {pc.label}
        </span>
        <Link href="/account" style={{ textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#1e3a8a',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700,
            flexShrink: 0,
          }}>
            {initial}
          </div>
        </Link>
      </div>
    </div>
  )
}
