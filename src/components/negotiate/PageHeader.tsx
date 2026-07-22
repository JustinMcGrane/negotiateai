import Link from 'next/link'
import type React from 'react'

interface Props {
  title: string
  description?: string | React.ReactNode
  userName?: string
  userInitial?: string
  plan?: string
}

const planLabel: Record<string, string> = {
  elite: 'Elite',
  pro: 'Pro',
  free: 'Free',
  report: 'Report',
}

const planColors: Record<string, { bg: string; color: string }> = {
  elite: { bg: 'rgba(139,92,246,0.12)', color: '#7c3aed' },
  pro: { bg: 'rgba(37,99,235,0.1)', color: '#2563eb' },
  free: { bg: 'rgba(0,0,0,0.06)', color: '#6b7280' },
  report: { bg: 'rgba(37,99,235,0.1)', color: '#2563eb' },
}

export function PageHeader({ title, description, userName, userInitial, plan = 'free' }: Props) {
  const colors = planColors[plan] ?? planColors.free
  const initial = userInitial || (userName ? userName[0].toUpperCase() : '?')

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: 56,
      borderBottom: '1px solid rgba(0,0,0,0.07)',
      background: '#fff',
      flexShrink: 0,
      gap: 16,
    }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>{title}</div>
        {description && (
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{description}</div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {plan && (
          <span style={{
            fontSize: 11, fontWeight: 600, padding: '3px 9px',
            borderRadius: 20, background: colors.bg, color: colors.color,
            letterSpacing: '0.02em',
          }}>
            {planLabel[plan] ?? plan}
          </span>
        )}
        <Link href="/account" style={{ textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#0f172a', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700,
          }}>
            {initial}
          </div>
        </Link>
      </div>
    </div>
  )
}
