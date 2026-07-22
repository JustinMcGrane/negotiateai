import type { ReactNode } from 'react'

interface Props {
  title: string
  desc: string
  children: ReactNode
}

export function ToolPage({ title, desc, children }: Props) {
  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 780 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 18, fontWeight: 600 }}>{title}</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>{desc}</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {children}
      </div>
    </div>
  )
}
