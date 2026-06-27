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
      console.log('[job-search] No RAPIDAPI_KEY found, returning mock data')
      return NextResponse.json({ jobs: getMockJobs(query, location) })
    }

    console.log('[job-search] RAPIDAPI_KEY found, length:', apiKey.length)

    const params = new URLSearchParams({
      query: [query, location].filter(Boolean).join(' '),
      num_pages: '3',
      page: '1',
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

    const url = `https://jsearch.p.rapidapi.com/search?${params}`
    console.log('[job-search] Fetching:', url)

    const res = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    })

    console.log('[job-search] JSearch status:', res.status)
    const data = await res.json()
    console.log('[job-search] JSearch response keys:', Object.keys(data))
    console.log('[job-search] Jobs count:', data.data?.length ?? 0)
    if (data.message) console.log('[job-search] JSearch message:', data.message)

    if (!res.ok || !data.data) {
      console.log('[job-search] Falling back to mock data')
      return NextResponse.json({ jobs: getMockJobs(query, location) })
    }

    const jobs = data.data.map((j: JSearchJob) => ({
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
    return NextResponse.json({ jobs: getMockJobs('', '') }, { status: 200 })
  }
}

function getMockJobs(query: string, location: string) {
  const loc = location || 'Remote'
  const q = query || 'Professional'
  return [
    { title: `Senior ${q}`, company: 'Stripe', location: 'San Francisco, CA', salary: '$160k – $210k', posted: 'Today', description: 'Stripe is looking for a Senior ' + q + ' to join our team. You will work alongside world-class engineers and have a direct impact on products used by millions of businesses worldwide. We value curiosity, ownership, and clear communication.', url: 'https://stripe.com/jobs', source: 'Stripe Careers' },
    { title: q, company: 'Notion', location: loc, salary: '$140k – $185k', posted: '1 day ago', description: 'Notion is building the connected workspace for the world. As a ' + q + ' you will help define how teams work and collaborate. We are a small team with a large impact — everyone ships.', url: 'https://www.notion.so/careers', source: 'Notion Careers' },
    { title: `Staff ${q}`, company: 'Linear', location: 'Remote', salary: '$175k – $220k', posted: '2 days ago', description: 'Linear is the issue tracking tool built for high-performance teams. We are a small team that ships fast. As a Staff ' + q + ' you will lead technical direction and mentor others while staying hands-on.', url: 'https://linear.app/careers', source: 'Linear Careers' },
    { title: `${q} – Platform Team`, company: 'Vercel', location: loc, salary: '$150k – $200k', posted: '3 days ago', description: 'Vercel is the platform for frontend developers. Join our Platform team as a ' + q + ' to help millions of developers ship faster. We offer full remote, competitive comp, and equity.', url: 'https://vercel.com/careers', source: 'Vercel Careers' },
    { title: `Lead ${q}`, company: 'Figma', location: 'New York, NY', salary: '$165k – $215k', posted: '3 days ago', description: 'Figma is a collaborative design tool used by over 4 million people. As Lead ' + q + ' you will own key areas of our platform and work cross-functionally with design, product, and engineering.', url: 'https://www.figma.com/careers', source: 'Figma Careers' },
    { title: q, company: 'Loom', location: 'Remote', salary: '$130k – $170k', posted: '4 days ago', description: 'Loom helps teams communicate faster with async video. We are growing quickly and looking for a talented ' + q + ' to join our remote-first team. Competitive salary plus meaningful equity.', url: 'https://www.loom.com/careers', source: 'Loom Careers' },
    { title: `Senior ${q}`, company: 'Retool', location: loc, salary: '$155k – $195k', posted: '4 days ago', description: 'Retool lets teams build internal tools 10x faster. As Senior ' + q + ' you will work on a product trusted by thousands of engineering and ops teams. We are selective and move fast.', url: 'https://retool.com/careers', source: 'Retool Careers' },
    { title: `${q} – Growth`, company: 'Webflow', location: 'Remote', salary: '$135k – $175k', posted: '5 days ago', description: 'Webflow is empowering designers to build for the web without code. We need a strong ' + q + ' to join our Growth team and help drive the next wave of adoption. Fully remote, great benefits.', url: 'https://webflow.com/careers', source: 'Webflow Careers' },
    { title: `Principal ${q}`, company: 'Airtable', location: 'San Francisco, CA', salary: '$190k – $240k', posted: '5 days ago', description: 'Airtable is the connected app platform that democratizes software creation. As Principal ' + q + ' you will set technical vision, mentor a growing team, and partner with leadership on long-term strategy.', url: 'https://airtable.com/careers', source: 'Airtable Careers' },
    { title: q, company: 'Intercom', location: loc, salary: '$125k – $165k', posted: '1 week ago', description: 'Intercom is the complete customer service solution. We are looking for a ' + q + ' who brings high craft and strong ownership. You will work in a collaborative, fast-paced team that takes pride in quality.', url: 'https://www.intercom.com/careers', source: 'Intercom Careers' },
    { title: `${q} Contractor`, company: 'A16z Portfolio Co.', location: 'Remote', salary: '$80 – $110 / hr', posted: '1 week ago', description: 'Well-funded Series B startup backed by a16z looking for an experienced contractor ' + q + ' for a 6-month engagement with strong potential to convert full-time. Start immediately.', url: 'https://www.linkedin.com/jobs/', source: 'LinkedIn' },
    { title: `Senior ${q}`, company: 'Descript', location: 'Remote', salary: '$145k – $185k', posted: '1 week ago', description: 'Descript is an all-in-one video and podcast editing platform. We are a creative, mission-driven team. You will own large parts of our product as a Senior ' + q + ' and have meaningful impact.', url: 'https://www.descript.com/careers', source: 'Descript Careers' },
    { title: `${q} – Enterprise`, company: 'Rippling', location: 'New York, NY', salary: '$160k – $210k', posted: '2 weeks ago', description: 'Rippling is on a mission to eliminate the friction of running a business. Join our Enterprise team as a ' + q + ' and help us land and expand in the Fortune 500. Strong OTE with uncapped commission.', url: 'https://www.rippling.com/careers', source: 'Rippling Careers' },
    { title: `Associate ${q}`, company: 'Mercury', location: 'Remote', salary: '$105k – $140k', posted: '2 weeks ago', description: 'Mercury is the banking stack for startups. We are looking for an Associate ' + q + ' who is early in their career but thinks and acts like an owner. Clear growth path into senior roles.', url: 'https://mercury.com/careers', source: 'Mercury Careers' },
    { title: `${q} Manager`, company: 'Brex', location: 'Remote', salary: '$170k – $220k', posted: '2 weeks ago', description: 'Brex is the financial stack for growing companies. As a ' + q + ' Manager you will lead a team of 4–6, own a key product surface, and partner closely with our exec team on roadmap and strategy.', url: 'https://www.brex.com/careers', source: 'Brex Careers' },
  ]
}
