import { NextRequest, NextResponse } from 'next/server'

type SerpJob = {
  title?: string
  company_name?: string
  location?: string
  salary?: string
  detected_extensions?: { posted_at?: string; salary?: string }
  description?: string
  apply_link?: string
  link?: string
}

const DATE_FILTER_MAP: Record<string, string> = {
  'Past 24h': 'today',
  'Past week': 'week',
  'Past month': 'month',
}

export async function POST(req: NextRequest) {
  try {
    const { query, location, jobType, datePosted } = await req.json()
    const apiKey = process.env.SERPAPI_KEY

    if (!apiKey) {
      return NextResponse.json({ jobs: getMockJobs(query, location) })
    }

    const terms = [query, jobType, location].filter(Boolean).join(' ')
    const params = new URLSearchParams({
      engine: 'google_jobs',
      q: terms,
      api_key: apiKey,
      num: '20',
    })
    if (DATE_FILTER_MAP[datePosted]) {
      params.set('chips', `date_posted:${DATE_FILTER_MAP[datePosted]}`)
    }

    const res = await fetch(`https://serpapi.com/search.json?${params}`)
    const data = await res.json()

    const jobs = (data.jobs_results || []).map((j: SerpJob) => ({
      title: j.title || '',
      company: j.company_name || '',
      location: j.location || '',
      salary: j.detected_extensions?.salary || j.salary || '',
      posted: j.detected_extensions?.posted_at || '',
      description: j.description || '',
      url: j.apply_link || j.link || '',
      source: 'Google Jobs',
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
      salary: '$140,000 – $180,000',
      posted: '2 days ago',
      description: 'We are looking for an experienced professional to join our growing team. You will work on challenging problems and collaborate with world-class engineers across a fast-paced, mission-driven environment. Strong communication skills and a track record of shipping are required.',
      url: 'https://www.linkedin.com/jobs/',
      source: 'LinkedIn',
    },
    {
      title: query,
      company: 'TechStartup Inc',
      location: location || 'Remote',
      salary: '$120,000 – $160,000',
      posted: '1 week ago',
      description: 'Join our fast-growing startup and help shape the future of our product. Competitive salary, equity, and great benefits. We move fast and value autonomy — you will own entire features from spec to production.',
      url: 'https://www.indeed.com/jobs',
      source: 'Indeed',
    },
    {
      title: `${query} – Growth Track`,
      company: 'Enterprise Solutions LLC',
      location: location || 'New York, NY',
      salary: '$130,000 – $170,000',
      posted: '3 days ago',
      description: 'Exciting opportunity for a motivated professional ready to make an impact. Strong culture, mentorship program, and a clear advancement path into leadership. Benefits include 401k match, unlimited PTO, and annual learning stipend.',
      url: 'https://www.glassdoor.com/Job/',
      source: 'Glassdoor',
    },
    {
      title: `${query} Contractor`,
      company: 'Bright Consulting Group',
      location: location || 'Austin, TX (Hybrid)',
      salary: '$75 – $95 / hr',
      posted: '5 days ago',
      description: 'Short-term contract role with potential to convert to full-time. Ideal for someone available to start immediately and comfortable working across multiple client engagements simultaneously.',
      url: 'https://www.linkedin.com/jobs/',
      source: 'LinkedIn',
    },
    {
      title: `Associate ${query}`,
      company: 'NextLevel Finance',
      location: location || 'Chicago, IL',
      salary: '$90,000 – $115,000',
      posted: '1 day ago',
      description: 'Great entry point for someone looking to grow quickly. We offer structured mentorship, internal mobility, and a team that genuinely invests in your development.',
      url: 'https://www.indeed.com/jobs',
      source: 'Indeed',
    },
  ]
}
