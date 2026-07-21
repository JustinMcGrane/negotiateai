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
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteMsg, setDeleteMsg] = useState('')
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

  async function changePassword() {
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordMsg({ text: 'Passwords do not match.', ok: false })
      return
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ text: 'Password must be at least 6 characters.', ok: false })
      return
    }
    setPasswordSaving(true)
    setPasswordMsg(null)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPasswordSaving(false)
    if (error) {
      setPasswordMsg({ text: error.message, ok: false })
    } else {
      setPasswordMsg({ text: 'Password updated successfully.', ok: true })
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => { setShowPasswordForm(false); setPasswordMsg(null) }, 2000)
    }
  }

  async function deleteAccount() {
    setDeleteLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    setDeleteLoading(false)
    setDeleteMsg('To complete account deletion, email GetHayven@gmail.com')
  }

  const planLabel = { free: 'Free', pro: 'Professional', elite: 'Elite', report: 'Report' }[profile?.plan || 'free'] || 'Free'
  const isPro = profile?.plan === 'pro' || profile?.plan === 'elite'

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

      {/* Notifications */}
      <div style={{ marginBottom: 16 }}>
        <a href="/account/notifications" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#fff', border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 12, padding: '16px 20px', textDecoration: 'none',
          color: 'var(--color-text-primary)',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Email notifications</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Manage check-in reminders and market alerts</div>
          </div>
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 18 }}>›</span>
        </a>
      </div>

      {/* Change Password */}
      <div style={{
        background: '#fff',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 12, padding: 24, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showPasswordForm ? 18 : 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>CHANGE PASSWORD</div>
          <button
            onClick={() => { setShowPasswordForm(v => !v); setPasswordMsg(null) }}
            style={{ background: 'transparent', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 7, padding: '6px 12px', fontSize: 12, cursor: 'pointer', color: 'var(--color-text-secondary)' }}
          >
            {showPasswordForm ? 'Cancel' : 'Change'}
          </button>
        </div>
        {showPasswordForm && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                style={inputStyle}
              />
            </div>
            {passwordMsg && (
              <div style={{ fontSize: 12, marginBottom: 12, padding: '8px 12px', borderRadius: 7, background: passwordMsg.ok ? '#f0fdf4' : '#fef2f2', color: passwordMsg.ok ? '#15803d' : '#dc2626' }}>
                {passwordMsg.text}
              </div>
            )}
            <button
              onClick={changePassword}
              disabled={passwordSaving}
              style={{ height: 38, padding: '0 18px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: passwordSaving ? 0.6 : 1 }}
            >
              {passwordSaving ? 'Saving…' : 'Update Password'}
            </button>
          </div>
        )}
      </div>

      {/* Sign out */}
      <button
        onClick={signOut}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 8, padding: '10px 16px', marginBottom: 32,
          fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer',
        }}
      >
        <LogOut size={14} /> Sign out
      </button>

      {/* Danger Zone */}
      <div style={{
        border: '1px solid #fca5a5',
        borderRadius: 12, padding: 24,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#dc2626', letterSpacing: '0.04em', marginBottom: 12 }}>DANGER ZONE</div>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        {deleteMsg ? (
          <div style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '0.5px solid #fca5a5', borderRadius: 8, padding: '12px 16px' }}>{deleteMsg}</div>
        ) : showDeleteConfirm ? (
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#dc2626', marginBottom: 12 }}>Are you sure? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={deleteAccount}
                disabled={deleteLoading}
                style={{ height: 36, padding: '0 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: deleteLoading ? 0.6 : 1 }}
              >
                {deleteLoading ? 'Processing…' : 'Yes, delete my account'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{ height: 36, padding: '0 14px', background: 'transparent', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 7, fontSize: 13, cursor: 'pointer', color: 'var(--color-text-secondary)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{ height: 36, padding: '0 16px', background: 'transparent', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  )
}
