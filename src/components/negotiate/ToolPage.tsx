import type { ReactNode } from 'react'

interface Props {
  title: string
  desc: string
  children: ReactNode
}

export function ToolPage({ title, desc, children }: Props) {
  return (
    <div>
      {/* Page header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        height: 56,
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{title}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{desc}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px 32px 80px', maxWidth: 780 }}>
        <div style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}
