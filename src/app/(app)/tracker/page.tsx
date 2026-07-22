'use client'
import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ClientPageHeader } from '@/components/negotiate/ClientPageHeader'

type Status = 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected'
type Application = {
  id: string
  company: string
  title: string
  url?: string
  status: Status
  salary?: string
  notes?: string
  createdAt: string
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  saved:        { label: 'Saved',        color: '#6b7280', bg: '#f3f4f6' },
  applied:      { label: 'Applied',      color: '#2563eb', bg: '#eff6ff' },
  interviewing: { label: 'Interviewing', color: '#d97706', bg: '#fffbeb' },
  offer:        { label: 'Offer',        color: '#059669', bg: '#ecfdf5' },
  rejected:     { label: 'Rejected',     color: '#dc2626', bg: '#fef2f2' },
}

export default function TrackerPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ company: '', title: '', url: '', salary: '', notes: '', status: 'saved' as Status })
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (data) {
        setApps(data.map(r => ({
          id: r.id,
          company: r.company,
          title: r.title,
          url: r.url,
          status: r.status,
          salary: r.salary,
          notes: r.notes,
          createdAt: r.created_at,
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  const add = useCallback(async () => {
    if (!form.company || !form.title || !userId) return
    const supabase = createClient()
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        user_id: userId,
        company: form.company,
        title: form.title,
        url: form.url || null,
        status: form.status,
        salary: form.salary || null,
        notes: form.notes || null,
      })
      .select()
      .single()
    if (error || !data) return
    setApps(prev => [{
      id: data.id, company: data.company, title: data.title,
      url: data.url, status: data.status, salary: data.salary,
      notes: data.notes, createdAt: data.created_at,
    }, ...prev])
    setForm({ company: '', title: '', url: '', salary: '', notes: '', status: 'saved' })
    setShowForm(false)
  }, [form, userId])

  const updateStatus = useCallback(async (id: string, status: Status) => {
    const supabase = createClient()
    await supabase.from('job_applications').update({ status }).eq('id', id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }, [])

  const remove = useCallback(async (id: string) => {
    const supabase = createClient()
    await supabase.from('job_applications').delete().eq('id', id)
    setApps(prev => prev.filter(a => a.id !== id))
    setConfirmDeleteId(null)
  }, [])

  function requestDelete(id: string) {
    setConfirmDeleteId(id)
    setTimeout(() => setConfirmDeleteId(prev => prev === id ? null : prev), 3000)
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px', fontSize: 13,
    background: 'var(--color-background-secondary)',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 7, color: 'var(--color-text-primary)', outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const counts = Object.keys(STATUS_CONFIG).reduce((acc, s) => {
    acc[s as Status] = apps.filter(a => a.status === s).length
    return acc
  }, {} as Record<Status, number>)

  return (
    <div>
      <ClientPageHeader title="Application Tracker" description="Track every role from saved to offer" />
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Application Tracker</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 6, fontSize: 14, margin: '6px 0 0' }}>
            Track every application in one place. Never lose track of where you stand.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#141414', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <Plus size={14} /> Add Application
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        {(Object.entries(STATUS_CONFIG) as [Status, typeof STATUS_CONFIG[Status]][]).map(([s, cfg]) => (
          <div key={s} style={{ background: cfg.bg, borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: cfg.color }}>{counts[s]}</span>
            <span style={{ fontSize: 12, color: cfg.color, fontWeight: 500 }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px' }}>Add Application</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Company *</label>
              <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Stripe" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Job Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Product Manager" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Job URL</label>
              <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Salary Range</label>
              <input value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} placeholder="$130k – $160k" style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))} style={{ ...inputStyle, cursor: 'pointer' }}>
              {(Object.entries(STATUS_CONFIG) as [Status, typeof STATUS_CONFIG[Status]][]).map(([s, cfg]) => (
                <option key={s} value={s}>{cfg.label}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Recruiter name, next steps, impressions..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={add} disabled={!form.company || !form.title} style={{ background: '#141414', color: '#fff', border: 'none', borderRadius: 7, padding: '9px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer', opacity: !form.company || !form.title ? 0.5 : 1 }}>Save</button>
            <button onClick={() => setShowForm(false)} style={{ background: 'transparent', color: 'var(--color-text-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 7, padding: '9px 18px', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 60, borderRadius: 10 }} />)}
        </div>
      ) : apps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12 }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, margin: 0 }}>No applications yet. Add your first one above.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {apps.map(app => {
            const cfg = STATUS_CONFIG[app.status]
            return (
              <div key={app.id} style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{app.company}</span>
                    <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>·</span>
                    <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{app.title}</span>
                    {app.url && <a href={app.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={12} color="var(--color-text-tertiary)" /></a>}
                  </div>
                  {app.salary && <span style={{ fontSize: 12, color: '#10b981' }}>{app.salary}</span>}
                  {app.notes && <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: '4px 0 0' }}>{app.notes}</p>}
                </div>
                <select value={app.status} onChange={e => updateStatus(app.id, e.target.value as Status)} style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}33`, borderRadius: 6, padding: '5px 10px', fontSize: 12, fontWeight: 500, cursor: 'pointer', outline: 'none' }}>
                  {(Object.entries(STATUS_CONFIG) as [Status, typeof STATUS_CONFIG[Status]][]).map(([s, c]) => (
                    <option key={s} value={s}>{c.label}</option>
                  ))}
                </select>
                {confirmDeleteId === app.id ? (
                  <button onClick={() => remove(app.id)} style={{ background: '#dc2626', border: 'none', cursor: 'pointer', padding: '4px 10px', borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                    Confirm?
                  </button>
                ) : (
                  <button onClick={() => requestDelete(app.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
    </div>
  )
}
