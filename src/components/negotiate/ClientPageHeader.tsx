'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { PageHeader } from './PageHeader'

interface Props {
  title: string
  description?: string
}

const planConfig: Record<string, { label: string; bg: string; color: string }> = {
  elite:  { label: 'Pro',  bg: '#ede9fe', color: '#6d28d9' },
  pro:    { label: 'Pro',  bg: '#EBF5FB', color: '#2D6EA8' },
  free:   { label: 'Free', bg: '#f1f5f9', color: '#64748b' },
  report: { label: 'Report', bg: '#EBF5FB', color: '#2D6EA8' },
}

export function ClientPageHeader({ title, description }: Props) {
  const [userInitial, setUserInitial] = useState('?')
  const [plan, setPlan] = useState('free')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const { data: profile } = await supabase.from('profiles').select('name, plan').eq('id', data.user.id).single()
      setUserInitial((profile?.name || data.user.email || '?')[0].toUpperCase())
      setPlan(profile?.plan ?? 'free')
    })
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    await createClient().auth.signOut()
    router.push('/')
  }

  const pc = planConfig[plan] ?? planConfig.free

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', height: 58,
      background: '#fff', borderBottom: '1px solid #e2e8f0',
      flexShrink: 0, position: 'sticky', top: 0, zIndex: 20, gap: 16,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </div>
        {description && (
          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 1, lineHeight: 1.3 }}>{description}</div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: pc.bg, color: pc.color, letterSpacing: '0.03em' }}>
          {pc.label}
        </span>

        {/* Avatar + dropdown */}
        <div ref={ref} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#2D6EA8', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', flexShrink: 0,
            }}
          >
            {userInitial}
          </button>

          {open && (
            <div style={{
              position: 'absolute', right: 0, top: 40,
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: 160, zIndex: 100, overflow: 'hidden',
            }}>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '10px 14px', fontSize: 13, color: '#374151', textDecoration: 'none' }}
              >
                Account
              </Link>
              <Link
                href="/account/billing"
                onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '10px 14px', fontSize: 13, color: '#374151', textDecoration: 'none' }}
              >
                Billing
              </Link>
              <div style={{ height: 1, background: '#f1f5f9', margin: '2px 0' }} />
              <button
                onClick={handleLogout}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 14px', fontSize: 13, color: '#ef4444',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Keep PageHeader export for any non-client usages
export { PageHeader }
