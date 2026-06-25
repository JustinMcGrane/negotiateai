'use client'
import { useEffect, useState } from 'react'
import { TrendingUp, RefreshCw } from 'lucide-react'

export function MarketAlertCard({ role }: { role: string }) {
  const [alert, setAlert] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/market-alert')
      .then(r => r.json())
      .then(d => { setAlert(d.alert || null); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (!role && !loading) return null

  return (
    <div style={{
      background: '#fff',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 12, padding: 20,
      marginBottom: 28,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: '#eef2ff', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={13} color="#6366f1" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)' }}>Market Alert</div>
            {role && <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{role}</div>}
          </div>
        </div>
        <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {loading && <RefreshCw size={10} style={{ animation: 'spin 1s linear infinite' }} />}
          {loading ? 'Loading…' : 'Updated weekly'}
        </div>
      </div>
      {loading ? (
        <div style={{ height: 36, background: 'var(--color-background-secondary)', borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite' }} />
      ) : alert ? (
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{alert}</p>
      ) : null}
    </div>
  )
}
