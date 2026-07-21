'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function EliteGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'blocked'>('loading')

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      if (!data.user) { setStatus('blocked'); return }
      const { data: profile } = await createClient()
        .from('profiles').select('plan').eq('id', data.user.id).single()
      setStatus(profile?.plan === 'elite' ? 'allowed' : 'blocked')
    })
  }, [])

  if (status === 'loading') return (
    <div style={{
      height: 400, background: '#f8fafc', borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--color-text-tertiary)', fontSize: 13,
    }}>
      Loading…
    </div>
  )

  if (status === 'blocked') {
    return (
      <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(102,126,234,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <Lock size={22} color="#667eea" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>Elite feature</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 28px' }}>
          This tool is available on the Elite plan. Upgrade to unlock it along with live call coaching and voice roleplay.
        </p>
        <Link href="/account/billing" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff', textDecoration: 'none',
          borderRadius: 8, padding: '11px 28px',
          fontSize: 14, fontWeight: 600,
        }}>
          Upgrade to Elite
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
