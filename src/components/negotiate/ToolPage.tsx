import type { ReactNode } from 'react'

interface Props {
  title: string
  desc: string
  children: ReactNode
}

export function ToolPage({ title, desc, children }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sticky header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
        height: 58,
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.25 }}>{title}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{desc}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 80px', maxWidth: 800 }}>
        <div style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          padding: 28,
          boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}
