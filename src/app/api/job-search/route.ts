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

export async function POST(req: NextRequest) {
  try {
    const { query, location } = await req.json()
    const apiKey = process.env.SERPAPI_KEY

    if (!apiKey) {
      return NextResponse.json({ jobs: getMockJobs(query, location) })
    }

    const q = encodeURIComponent(`${query}${location ? ' ' + location : ''}`)
    const url = `https://serpapi.com/search.json?engine=google_jobs&q=${q}&api_key=${apiKey}&num=20`
    const res = await fetch(url)
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
      description: 'We are looking for an experienced professional to join our growing team. You will work on challenging problems and collaborate with world-class engineers.',
      url: 'https://www.linkedin.com/jobs/',
      source: 'LinkedIn',
    },
    {
      title: query,
      company: 'TechStartup Inc',
      location: location || 'Remote',
      salary: '$120,000 – $160,000',
      posted: '1 week ago',
      description: 'Join our fast-growing startup and help shape the future of our product. Competitive salary, equity, and great benefits.',
      url: 'https://www.indeed.com/jobs',
      source: 'Indeed',
    },
    {
      title: `${query} – Growth Track`,
      company: 'Enterprise Solutions LLC',
      location: location || 'New York, NY',
      salary: '$130,000 – $170,000',
      posted: '3 days ago',
      description: 'Exciting opportunity for a motivated professional ready to make an impact. Strong culture, mentorship program, and clear advancement path.',
      url: 'https://www.glassdoor.com/Job/',
      source: 'Glassdoor',
    },
  ]
}
