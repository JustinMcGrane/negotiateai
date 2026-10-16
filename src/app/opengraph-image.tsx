import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Hayven — AI Career Coaching & Salary Negotiation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Accent bar top */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
          display: 'flex',
        }} />

        {/* Logo / brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 40,
        }}>
          <div style={{
            width: 48, height: 48,
            borderRadius: 12,
            background: 'rgba(99,102,241,0.2)',
            border: '1px solid rgba(99,102,241,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: 24, height: 24, background: '#6366f1', borderRadius: 4, display: 'flex' }} />
          </div>
          <span style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Hayven</span>
        </div>

        {/* Headline */}
        <div style={{
          color: '#f1f5f9',
          fontSize: 62,
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 24,
          maxWidth: 800,
        }}>
          Get paid what you&apos;re worth.
        </div>

        {/* Sub */}
        <div style={{
          color: '#94a3b8',
          fontSize: 26,
          lineHeight: 1.5,
          maxWidth: 700,
          marginBottom: 48,
        }}>
          AI career coaching for salary negotiation, raises, and total comp.
        </div>

        {/* CTA pill */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          fontSize: 20,
          fontWeight: 700,
          padding: '14px 32px',
          borderRadius: 100,
          display: 'flex',
        }}>
          gethayven.com
        </div>
      </div>
    ),
    { ...size }
  )
}
