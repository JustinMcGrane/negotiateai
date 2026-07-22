'use client'
import { useState } from 'react'
import { Search, MapPin, Building, ExternalLink, DollarSign, Clock, Bookmark, ChevronDown, ChevronUp } from 'lucide-react'
import { ClientPageHeader } from '@/components/negotiate/ClientPageHeader'

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

type JobType = 'Any' | 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
type DatePosted = 'Any' | 'Past 24h' | 'Past week' | 'Past month'

const JOB_TYPES: JobType[] = ['Any', 'Full-time', 'Part-time', 'Contract', 'Remote']
const DATE_OPTIONS: DatePosted[] = ['Any', 'Past 24h', 'Past week', 'Past month']

function CompanyAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
  const colors = [
    '#e0f2fe', '#fef3c7', '#d1fae5', '#ede9fe', '#fce7f3', '#ffedd5',
  ]
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color: '#374151',
      flexShrink: 0,
    }}>
      {initials || '?'}
    </div>
  )
}

function JobCard({ job, saved, onSave }: { job: Job; saved: boolean; onSave: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const desc = job.description || ''
  const preview = desc.slice(0, 180)
  const hasMore = desc.length > 180

  return (
    <div style={{
      background: 'var(--color-background-secondary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 12, padding: '18px 20px',
      transition: 'box-shadow 0.15s',
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <CompanyAvatar name={job.company} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px', lineHeight: 1.3 }}>{job.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                <Building size={11} style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 500 }}>{job.company}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button
                onClick={onSave}
                title={saved ? 'Unsave' : 'Save job'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: saved ? '#6366f1' : 'var(--color-text-tertiary)',
                  padding: 4, borderRadius: 6,
                }}
              >
                <Bookmark size={15} fill={saved ? '#6366f1' : 'none'} />
              </button>
              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: '#141414', color: '#fff',
                    borderRadius: 7, padding: '6px 11px', fontSize: 12,
                    textDecoration: 'none', fontWeight: 500,
                  }}
                >
                  Apply <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-secondary)' }}>
              <MapPin size={11} /> {job.location}
            </span>
            {job.salary && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#10b981', fontWeight: 500 }}>
                <DollarSign size={11} /> {job.salary}
              </span>
            )}
            {job.posted && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                <Clock size={11} /> {job.posted}
              </span>
            )}
            <span style={{
              fontSize: 10, color: 'var(--color-text-tertiary)',
              background: 'rgba(0,0,0,0.04)', borderRadius: 4, padding: '2px 6px',
            }}>via {job.source}</span>
          </div>

          {desc && (
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                {expanded ? desc : preview}{!expanded && hasMore ? '…' : ''}
              </p>
              {hasMore && (
                <button
                  onClick={() => setExpanded(e => !e)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-text-tertiary)', fontSize: 12,
                    display: 'flex', alignItems: 'center', gap: 3,
                    padding: '4px 0', marginTop: 2,
                  }}
                >
                  {expanded ? <><ChevronUp size={12} /> Less</> : <><ChevronDown size={12} /> More</>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function JobCardSkeleton() {
  return (
    <div style={{
      background: 'var(--color-background-secondary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 12, padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', gap: 14 }}>
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ height: 14, width: '55%', borderRadius: 4, marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 12, width: '30%', borderRadius: 4, marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="skeleton" style={{ height: 12, width: 80, borderRadius: 4 }} />
            <div className="skeleton" style={{ height: 12, width: 100, borderRadius: 4 }} />
            <div className="skeleton" style={{ height: 12, width: 60, borderRadius: 4 }} />
          </div>
          <div style={{ marginTop: 10 }}>
            <div className="skeleton" style={{ height: 11, width: '90%', borderRadius: 4, marginBottom: 6 }} />
            <div className="skeleton" style={{ height: 11, width: '70%', borderRadius: 4 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px', fontSize: 12, fontWeight: 500, borderRadius: 20,
        border: active ? '1.5px solid #141414' : '0.5px solid var(--color-border-tertiary)',
        background: active ? '#141414' : 'var(--color-background-secondary)',
        color: active ? '#fff' : 'var(--color-text-secondary)',
        cursor: 'pointer', transition: 'all 0.12s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

export default function JobsPage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState<JobType>('Any')
  const [datePosted, setDatePosted] = useState<DatePosted>('Any')
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [searched, setSearched] = useState(false)
  const [saved, setSaved] = useState<Set<number>>(new Set())

  async function search() {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch('/api/job-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, location, jobType: jobType === 'Any' ? '' : jobType, datePosted: datePosted === 'Any' ? '' : datePosted }),
      })
      const data = await res.json()
      setJobs(data.jobs || [])
    } catch {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  function toggleSave(i: number) {
    setSaved(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const savedJobs = jobs.filter((_, i) => saved.has(i))
  const unsavedJobs = jobs.filter((_, i) => !saved.has(i))
  const orderedJobs = [...savedJobs, ...unsavedJobs]

  return (
    <div>
      <ClientPageHeader title="Job Search" description="Find roles that match your target" />
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Job Search</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 6, fontSize: 13 }}>
          Search real job listings — click to apply or bookmark for later.
        </p>
      </div>

      {/* Search inputs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 2, position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)', pointerEvents: 'none' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Job title, skill, or company"
            style={{
              width: '100%', padding: '10px 14px 10px 34px', fontSize: 14,
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 8, color: 'var(--color-text-primary)', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <MapPin size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)', pointerEvents: 'none' }} />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Location or Remote"
            style={{
              width: '100%', padding: '10px 14px 10px 34px', fontSize: 14,
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
            opacity: !query.trim() || loading ? 0.4 : 1,
          }}
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 2 }}>Type</span>
        {JOB_TYPES.map(t => (
          <FilterChip key={t} label={t} active={jobType === t} onClick={() => setJobType(t)} />
        ))}
        <div style={{ width: 1, height: 20, background: 'var(--color-border-tertiary)', margin: '0 4px' }} />
        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 2 }}>Posted</span>
        {DATE_OPTIONS.map(d => (
          <FilterChip key={d} label={d} active={datePosted === d} onClick={() => setDatePosted(d)} />
        ))}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...Array(5)].map((_, i) => <JobCardSkeleton key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && searched && jobs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-secondary)' }}>
          <Search size={28} style={{ opacity: 0.3, marginBottom: 12 }} />
          <p style={{ margin: 0, fontSize: 14 }}>No jobs found — try a different search or adjust your filters.</p>
        </div>
      )}

      {/* Results */}
      {!loading && jobs.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: 0 }}>
              {jobs.length} result{jobs.length !== 1 ? 's' : ''}
            </p>
            {saved.size > 0 && (
              <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 500 }}>
                {saved.size} saved
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {orderedJobs.map((job, i) => (
              <JobCard
                key={`${job.company}-${job.title}-${i}`}
                job={job}
                saved={saved.has(jobs.indexOf(job))}
                onSave={() => toggleSave(jobs.indexOf(job))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
