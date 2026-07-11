import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'NegotiateAI <pulse@negotiateai.com>', to, subject, html }),
  })
}

async function getMarketData(role: string, location: string): Promise<{ avg: string; range: string; trend: string } | null> {
  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) return null

  try {
    const params = new URLSearchParams({
      query: `${role} ${location}`,
      num_pages: '1',
      country: 'us',
    })
    const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params}`, {
      headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' },
    })
    const data = await res.json()
    const jobs = (data.data || []).filter((j: { job_min_salary?: number; job_max_salary?: number }) => j.job_min_salary || j.job_max_salary)

    if (!jobs.length) return null

    const salaries = jobs.flatMap((j: { job_min_salary?: number; job_max_salary?: number }) => [j.job_min_salary, j.job_max_salary].filter(Boolean) as number[])
    const avg = Math.round(salaries.reduce((a: number, b: number) => a + b, 0) / salaries.length)
    const min = Math.round(Math.min(...salaries) / 1000) * 1000
    const max = Math.round(Math.max(...salaries) / 1000) * 1000

    const fmt = (n: number) => `$${Math.round(n / 1000)}k`
    return {
      avg: fmt(avg),
      range: `${fmt(min)} – ${fmt(max)}`,
      trend: jobs.length >= 5 ? 'strong demand' : 'moderate demand',
    }
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://negotiateai.com'

  const { data: users } = await supabase
    .from('profiles')
    .select('id, name, current_role, location')
    .neq('market_alert_emails', false)
    .not('current_role', 'is', null)
    .limit(200)

  if (!users?.length) return NextResponse.json({ sent: 0 })

  const { data: authUsers } = await supabase.auth.admin.listUsers()
  const emailMap = new Map(authUsers?.users?.map((u) => [u.id, u.email]) || [])

  let sent = 0
  for (const user of users) {
    const email = emailMap.get(user.id)
    if (!email) continue

    const firstName = (user.name || email).split(' ')[0]
    const role = user.current_role || 'your role'
    const location = user.location || 'your area'
    const market = await getMarketData(role, location)

    const marketSection = market
      ? `
        <div style="background: #f0fdf4; border-radius: 10px; padding: 20px; margin: 0 0 24px;">
          <div style="font-size: 12px; color: #166534; font-weight: 600; margin-bottom: 8px; letter-spacing: 0.04em;">THIS WEEK'S MARKET DATA · ${role.toUpperCase()}</div>
          <div style="font-size: 28px; font-weight: 700; color: #15803d; margin-bottom: 4px;">${market.avg}</div>
          <div style="font-size: 14px; color: #166534;">Range: ${market.range} · ${market.trend}</div>
        </div>`
      : `
        <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin: 0 0 24px;">
          <div style="font-size: 14px; color: #555;">Market data is being updated. Check the app for your latest salary intel.</div>
        </div>`

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #fafafa;">
        <div style="background: #141414; width: 40px; height: 40px; border-radius: 10px; margin-bottom: 24px;">
          <span style="color: #fff; font-size: 18px; font-weight: 700; line-height: 40px; text-align: center; display: block;">N</span>
        </div>
        <h1 style="font-size: 20px; font-weight: 700; color: #111; margin: 0 0 8px;">Your weekly salary pulse</h1>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          Here's what the market looks like for ${role} roles in ${location} this week.
        </p>
        ${marketSection}
        <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
          Knowing your market rate is the single most important thing you can do before any salary conversation. If you're more than 10% below market, it may be time to act.
        </p>
        <a href="${appUrl}/tools/comp-analyzer" style="display: inline-block; background: #141414; color: #fff; text-decoration: none; padding: 13px 24px; border-radius: 9px; font-weight: 600; font-size: 14px; margin-bottom: 28px;">Run a full comp analysis →</a>
        <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 0;">
          You're receiving this because you signed up for NegotiateAI market alerts.
          <a href="${appUrl}/account/notifications" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    `

    await sendEmail(email, `Your salary pulse: ${role} in ${location}`, html)
    sent++
  }

  return NextResponse.json({ sent })
}
