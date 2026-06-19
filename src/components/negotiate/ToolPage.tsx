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
        <h1 style={{ fontSize: 18, fontWeight: 500 }}>{title}</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>{desc}</p>
      </div>
      <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24 }}>
        {children}
      </div>
    </div>
  )
}
