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
      return NextResponse.json({ jobs: getMockJobs(query, location) })
    }

    const params = new URLSearchParams({
      query: [query, jobType, location].filter(Boolean).join(' '),
      num_pages: '1',
      country: 'us',
    })
    if (DATE_FILTER_MAP[datePosted]) {
      params.set('date_posted', DATE_FILTER_MAP[datePosted])
    }
    if (jobType === 'Remote') {
      params.set('remote_jobs_only', 'true')
    }
    if (jobType && jobType !== 'Any' && jobType !== 'Remote') {
      const typeMap: Record<string, string> = {
        'Full-time': 'FULLTIME',
        'Part-time': 'PARTTIME',
        'Contract': 'CONTRACTOR',
      }
      if (typeMap[jobType]) params.set('employment_types', typeMap[jobType])
    }

    const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params}`, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    })
    const data = await res.json()

    const jobs = (data.data || []).map((j: JSearchJob) => ({
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
    console.error(err)
    return NextResponse.json({ jobs: [] }, { status: 500 })
  }
}

function getMockJobs(query: string, location: string) {
  return [
    {
      title: `Senior ${query}`,
      company: 'Acme Corp',
      location: location || 'San Francisco, CA',
      salary: '$140k – $180k',
      posted: '2 days ago',
      description: 'We are looking for an experienced professional to join our growing team. You will work on challenging problems and collaborate with world-class engineers across a fast-paced, mission-driven environment.',
      url: 'https://www.linkedin.com/jobs/',
      source: 'LinkedIn',
    },
    {
      title: query,
      company: 'TechStartup Inc',
      location: location || 'Remote',
      salary: '$120k – $160k',
      posted: '1 week ago',
      description: 'Join our fast-growing startup and help shape the future of our product. Competitive salary, equity, and great benefits.',
      url: 'https://www.indeed.com/jobs',
      source: 'Indeed',
    },
    {
      title: `${query} – Growth Track`,
      company: 'Enterprise Solutions LLC',
      location: location || 'New York, NY',
      salary: '$130k – $170k',
      posted: '3 days ago',
      description: 'Exciting opportunity for a motivated professional ready to make an impact. Strong culture, mentorship program, and clear advancement path.',
      url: 'https://www.glassdoor.com/Job/',
      source: 'Glassdoor',
    },
    {
      title: `${query} Contractor`,
      company: 'Bright Consulting Group',
      location: location || 'Austin, TX',
      salary: '$75 – $95 / hr',
      posted: '5 days ago',
      description: 'Short-term contract role with potential to convert full-time. Ideal for someone available to start immediately.',
      url: 'https://www.linkedin.com/jobs/',
      source: 'LinkedIn',
    },
    {
      title: `Associate ${query}`,
      company: 'NextLevel Finance',
      location: location || 'Chicago, IL',
      salary: '$90k – $115k',
      posted: '1 day ago',
      description: 'Great entry point for someone looking to grow quickly. Structured mentorship and clear internal mobility.',
      url: 'https://www.indeed.com/jobs',
      source: 'Indeed',
    },
  ]
}
