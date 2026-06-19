import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Account — NegotiateAI' }

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const planMap: Record<string, string> = { free: 'Free', pro: 'Pro', report: 'Report' }
  const planLabel = planMap[profile?.plan || 'free'] || 'Free'

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 600 }}>
      <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 24 }}>Account</h1>

      <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>PROFILE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Name</div>
          <div style={{ fontSize: 13 }}>{profile?.name || '—'}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Email</div>
          <div style={{ fontSize: 13 }}>{user.email}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Plan</div>
          <div style={{ fontSize: 12, padding: '2px 8px', background: profile?.plan === 'pro' ? '#141414' : 'var(--color-background-secondary)', color: profile?.plan === 'pro' ? '#fff' : 'var(--color-text-primary)', borderRadius: 4 }}>{planLabel}</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>USAGE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Sessions completed</div>
          <div style={{ fontSize: 13 }}>{profile?.sessions_used || 0}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Tools used</div>
          <div style={{ fontSize: 13 }}>{profile?.tools_used?.length || 0}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <Link href="/account/billing" style={{ height: 38, display: 'inline-flex', alignItems: 'center', padding: '0 16px', background: '#141414', color: '#fff', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>
          Manage billing
        </Link>
      </div>
    </div>
  )
}
