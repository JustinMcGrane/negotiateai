'use client'
import { useState } from 'react'
import { Search, MapPin, Building, ExternalLink, DollarSign, Clock } from 'lucide-react'

type Job = {
  title: string
  company: string
  location: string
  salary?: string
  posted?: string
  description: string
  url?: string
  source: string
}

export default function JobsPage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [searched, setSearched] = useState(false)

  async function search() {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch('/api/job-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, location }),
      })
      const data = await res.json()
      setJobs(data.jobs || [])
    } catch {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Job Search</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, fontSize: 14 }}>
          Search real job listings. Click any role to apply, or save it to your tracker.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <div style={{ flex: 2, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Job title, skill, or company"
            style={{
              width: '100%', padding: '11px 14px 11px 36px', fontSize: 14,
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 8, color: 'var(--color-text-primary)', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <MapPin size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Location or Remote"
            style={{
              width: '100%', padding: '11px 14px 11px 36px', fontSize: 14,
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 8, color: 'var(--color-text-primary)', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          onClick={search}
          disabled={!query.trim() || loading}
          style={{
            background: '#141414', color: '#fff', border: 'none',
            borderRadius: 8, padding: '0 20px', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', whiteSpace: 'nowrap',
            opacity: !query.trim() || loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-secondary)' }}>
          Finding the best matches for you…
        </div>
      )}

      {!loading && searched && jobs.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-secondary)' }}>
          No jobs found. Try a different search.
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>
            {jobs.length} results
          </p>
          {jobs.map((job, i) => (
            <div key={i} style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 20,
              transition: 'border-color 0.15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px' }}>{job.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      <Building size={12} /> {job.company}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      <MapPin size={12} /> {job.location}
                    </span>
                    {job.salary && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#10b981' }}>
                        <DollarSign size={12} /> {job.salary}
                      </span>
                    )}
                    {job.posted && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                        <Clock size={12} /> {job.posted}
                      </span>
                    )}
                  </div>
                </div>
                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: '#141414', color: '#fff',
                      borderRadius: 7, padding: '7px 12px', fontSize: 12,
                      textDecoration: 'none', fontWeight: 500, flexShrink: 0, marginLeft: 12,
                    }}
                  >
                    Apply <ExternalLink size={11} />
                  </a>
                )}
              </div>
              {job.description && (
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
                  {job.description.slice(0, 200)}{job.description.length > 200 ? '…' : ''}
                </p>
              )}
              <div style={{ marginTop: 8 }}>
                <span style={{
                  fontSize: 10, color: 'var(--color-text-tertiary)',
                  background: 'rgba(0,0,0,0.04)', borderRadius: 4, padding: '2px 6px',
                }}>via {job.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
