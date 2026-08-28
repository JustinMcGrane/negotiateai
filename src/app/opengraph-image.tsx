import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Hayven — Get paid what you\'re worth'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent circles */}
        <div style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -100,
          left: -60,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo / brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 52,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
            }} />
          </div>
          <span style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
          }}>
            Hayven
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 72,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: 28,
          maxWidth: 820,
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          Get paid what you&apos;re worth.
        </div>

        {/* Subheading */}
        <div style={{
          fontSize: 26,
          color: '#94a3b8',
          lineHeight: 1.5,
          maxWidth: 660,
          marginBottom: 52,
          display: 'flex',
        }}>
          AI career coach, salary negotiation tools, and market data — free to start.
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: 40,
        }}>
          {[
            { value: '$27K', label: 'avg salary increase' },
            { value: '85%', label: 'of negotiators get more' },
            { value: '10+', label: 'career tools included' },
          ].map((stat) => (
            <div key={stat.label} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <span style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#60a5fa',
                letterSpacing: '-0.02em',
                display: 'flex',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontSize: 16,
                color: '#64748b',
                display: 'flex',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* URL badge */}
        <div style={{
          position: 'absolute',
          bottom: 60,
          right: 100,
          fontSize: 18,
          color: '#475569',
          display: 'flex',
        }}>
          gethayven.com
        </div>
      </div>
    ),
    { ...size }
  )
}
