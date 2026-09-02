import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type ArbeitnowJob = {
  title?: string
  company_name?: string
  location?: string
  remote?: boolean
  salary?: string
  created_at?: number
  description?: string
  url?: string
  tags?: string[]
}

function formatPosted(timestamp?: number): string {
  if (!timestamp) return ''
  const posted = new Date(timestamp * 1000)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { query, location, jobType, datePosted } = await req.json()

    const params = new URLSearchParams({ search: query || '' })
    if (location) params.set('location', location)
    if (jobType === 'Remote') params.set('remote', 'true')

    // Fetch multiple pages in parallel for more results
    const pages = [1, 2, 3]
    const results = await Promise.allSettled(
      pages.map(page => {
        const p = new URLSearchParams(params)
        p.set('page', String(page))
        return fetch(`https://www.arbeitnow.com/api/job-board-api?${p}`, {
          headers: { 'Accept': 'application/json' },
        }).then(r => r.json())
      })
    )

    let allJobs: ArbeitnowJob[] = []
    for (const result of results) {
      if (result.status === 'fulfilled' && Array.isArray(result.value?.data)) {
        allJobs.push(...result.value.data)
      }
    }

    // Filter by date if requested
    if (datePosted) {
      const cutoffDays: Record<string, number> = { 'Past 24h': 1, 'Past week': 7, 'Past month': 30 }
      const days = cutoffDays[datePosted]
      if (days) {
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
        allJobs = allJobs.filter(j => j.created_at && j.created_at * 1000 >= cutoff)
      }
    }

    const jobs = allJobs.map((j: ArbeitnowJob) => ({
      title: j.title || '',
      company: j.company_name || '',
      location: j.remote ? 'Remote' : (j.location || ''),
      salary: j.salary || '',
      posted: formatPosted(j.created_at),
      description: stripHtml(j.description || '').slice(0, 600),
      url: j.url || '',
      source: 'Arbeitnow',
    }))

    return NextResponse.json({ jobs })
  } catch (err) {
    console.error('[job-search] Error:', err)
    return NextResponse.json({ jobs: [], debugError: String(err) }, { status: 200 })
  }
}
