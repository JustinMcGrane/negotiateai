import { NextRequest, NextResponse } from 'next/server'

type JSearchJob = {
  job_title?: string
  employer_name?: string
  job_city?: string
  job_state?: string
  job_country?: string
  job_is_remote?: boolean
  job_min_salary?: number
  job_max_salary?: number
  job_salary_currency?: string
  job_salary_period?: string
  job_posted_at_datetime_utc?: string
  job_description?: string
  job_apply_link?: string
  job_publisher?: string
}

const DATE_FILTER_MAP: Record<string, string> = {
  'Past 24h': 'today',
  'Past week': 'week',
  'Past month': 'month',
}

function formatSalary(job: JSearchJob): string {
  if (!job.job_min_salary && !job.job_max_salary) return ''
  const currency = job.job_salary_currency === 'USD' ? '$' : (job.job_salary_currency ?? '$')
  const period = job.job_salary_period === 'HOUR' ? ' / hr' : ''
  const fmt = (n: number) => n >= 1000 ? `${currency}${Math.round(n / 1000)}k` : `${currency}${n}`
  if (job.job_min_salary && job.job_max_salary) {
    return `${fmt(job.job_min_salary)} – ${fmt(job.job_max_salary)}${period}`
  }
  return `${fmt(job.job_min_salary ?? job.job_max_salary ?? 0)}${period}`
}

function formatLocation(job: JSearchJob): string {
  if (job.job_is_remote) return 'Remote'
  return [job.job_city, job.job_state].filter(Boolean).join(', ') || job.job_country || ''
}

function formatPosted(dateStr?: string): string {
  if (!dateStr) return ''
  const posted = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - posted.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

export async function POST(req: NextRequest) {
  try {
    const { query, location, jobType, datePosted } = await req.json()
    const apiKey = process.env.RAPIDAPI_KEY

    if (!apiKey) {
      console.log('[job-search] No RAPIDAPI_KEY configured')
      return NextResponse.json({ jobs: [], noApiKey: true })
    }

    console.log('[job-search] RAPIDAPI_KEY found, length:', apiKey.length)

    const baseParams: Record<string, string> = {
      query: [query, location].filter(Boolean).join(' '),
      num_pages: '1',
      country: 'us',
    }
    if (DATE_FILTER_MAP[datePosted]) baseParams.date_posted = DATE_FILTER_MAP[datePosted]
    if (jobType === 'Remote') baseParams.remote_jobs_only = 'true'
    if (jobType && jobType !== 'Any' && jobType !== 'Remote') {
      const typeMap: Record<string, string> = { 'Full-time': 'FULLTIME', 'Part-time': 'PARTTIME', 'Contract': 'CONTRACTOR' }
      if (typeMap[jobType]) baseParams.employment_types = typeMap[jobType]
    }

    const headers = { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' }

    const pageResults = await Promise.allSettled(
      [1, 2, 3].map(page => {
        const params = new URLSearchParams({ ...baseParams, page: String(page) })
        return fetch(`https://jsearch.p.rapidapi.com/search?${params}`, { headers }).then(r => r.json())
      })
    )

    const allJobs: JSearchJob[] = []
    for (const result of pageResults) {
      if (result.status === 'fulfilled' && result.value?.data) {
        allJobs.push(...result.value.data)
      }
    }

    console.log('[job-search] Total jobs fetched:', allJobs.length)

    if (allJobs.length === 0) {
      return NextResponse.json({ jobs: [] })
    }

    const jobs = allJobs.map((j: JSearchJob) => ({
      title: j.job_title || '',
      company: j.employer_name || '',
      location: formatLocation(j),
      salary: formatSalary(j),
      posted: formatPosted(j.job_posted_at_datetime_utc),
      description: j.job_description || '',
      url: j.job_apply_link || '',
      source: j.job_publisher || 'JSearch',
    }))

    return NextResponse.json({ jobs })
  } catch (err) {
    console.error('[job-search] Error:', err)
    return NextResponse.json({ jobs: [] }, { status: 200 })
  }
}
