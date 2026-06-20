'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { CheckCircle, LogOut } from 'lucide-react'

export default function AccountPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [profile, setProfile] = useState<{ name?: string; plan?: string; sessions_used?: number; tools_used?: string[] } | null>(null)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(profile)
      setName(profile?.name || '')
      setLoading(false)
    }
    load()
  }, [])

  async function saveName() {
    if (!user || !name.trim()) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('profiles').upsert({ id: user.id, name: name.trim() })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const planLabel = { free: 'Free', pro: 'Pro', report: 'Report' }[profile?.plan || 'free'] || 'Free'
  const isPro = profile?.plan === 'pro'

  const inputStyle = {
    width: '100%', height: 42, padding: '0 14px', fontSize: 14,
    border: '0.5px solid var(--color-border-secondary)',
    borderRadius: 8, background: '#fff',
    color: 'var(--color-text-primary)', outline: 'none',
    boxSizing: 'border-box' as const,
  }

  if (loading) return (
    <div style={{ padding: '32px 24px' }}>
      <div className="skeleton" style={{ height: 24, width: 120, marginBottom: 24 }} />
      <div className="skeleton" style={{ height: 120, borderRadius: 12 }} />
    </div>
  )

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '32px 24px 80px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 28px' }}>Account</h1>

      {/* Plan badge */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: isPro ? '#141414' : 'var(--color-background-secondary)',
        borderRadius: 12, padding: '16px 20px', marginBottom: 20,
      }}>
        <div>
          <div style={{ fontSize: 12, color: isPro ? 'rgba(255,255,255,0.5)' : 'var(--color-text-tertiary)', marginBottom: 2 }}>CURRENT PLAN</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: isPro ? '#fff' : 'var(--color-text-primary)' }}>{planLabel}</div>
        </div>
        {!isPro && (
          <a href="/account/billing" style={{
            background: '#141414', color: '#fff',
            padding: '8px 16px', borderRadius: 8,
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>Upgrade to Pro</a>
        )}
        {isPro && (
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Active</div>
        )}
      </div>

      {/* Profile */}
      <div style={{
        background: '#fff',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 12, padding: 24, marginBottom: 16,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 18, letterSpacing: '0.04em' }}>PROFILE</div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>Name</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveName()}
              placeholder="Your name"
              style={inputStyle}
            />
            <button
              onClick={saveName}
              disabled={saving || !name.trim()}
              style={{
                height: 42, padding: '0 16px', flexShrink: 0,
                background: saved ? '#10b981' : '#141414',
                color: '#fff', border: 'none', borderRadius: 8,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'background 0.2s',
                opacity: saving || !name.trim() ? 0.5 : 1,
              }}
            >
              {saved ? <><CheckCircle size={14} /> Saved</> : saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 0 }}>
          <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>Email</label>
          <input
            value={user?.email || ''}
            disabled
            style={{ ...inputStyle, background: '#f9fafb', color: 'var(--color-text-tertiary)', cursor: 'not-allowed' }}
          />
        </div>
      </div>

      {/* Usage */}
      <div style={{
        background: '#fff',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 12, padding: 24, marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 16, letterSpacing: '0.04em' }}>USAGE</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{profile?.sessions_used || 0}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Sessions completed</div>
          </div>
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{profile?.tools_used?.length || 0}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Tools used</div>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={signOut}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 8, padding: '10px 16px',
          fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer',
        }}
      >
        <LogOut size={14} /> Sign out
      </button>
    </div>
  )
}
