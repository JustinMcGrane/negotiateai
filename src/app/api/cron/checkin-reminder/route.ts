import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Sarah at NegotiateAI <sarah@negotiateai.com>', to, subject, html }),
  })
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://negotiateai.com'

  // Get users who haven't had a check-in in 30+ days, and haven't opted out
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const { data: users } = await supabase
    .from('profiles')
    .select('id, name')
    .neq('checkin_emails', false)
    .or(`last_checkin_at.is.null,last_checkin_at.lt.${thirtyDaysAgo}`)
    .limit(100)

  if (!users?.length) return NextResponse.json({ sent: 0 })

  // Get emails from auth.users
  const { data: authUsers } = await supabase.auth.admin.listUsers()
  const emailMap = new Map(authUsers?.users?.map((u) => [u.id, u.email]) || [])

  let sent = 0
  for (const user of users) {
    const email = emailMap.get(user.id)
    if (!email) continue

    const firstName = (user.name || email).split(' ')[0]
    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #fafafa;">
        <div style="background: #141414; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <span style="color: #fff; font-size: 18px; font-weight: 700; line-height: 40px; text-align: center; display: block; width: 40px;">N</span>
        </div>
        <h1 style="font-size: 20px; font-weight: 700; color: #111; margin: 0 0 8px;">Hey ${firstName}, time for your monthly check-in 👋</h1>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
          It's been a month since we last talked. A lot can change in 30 days — new offers, promotions, comp conversations, market shifts. Let's catch up so I can keep your advice sharp.
        </p>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
          A quick 5-minute session keeps your profile current and unlocks personalized insights on what's changed in your market.
        </p>
        <a href="${appUrl}/recruiter?checkin=true" style="display: inline-block; background: #141414; color: #fff; text-decoration: none; padding: 13px 24px; border-radius: 9px; font-weight: 600; font-size: 14px; margin-bottom: 28px;">Start my check-in with Sarah →</a>
        <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 0;">
          You're receiving this because you signed up for NegotiateAI check-in reminders.
          <a href="${appUrl}/account/notifications" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    `

    await sendEmail(email, `${firstName}, your monthly check-in is ready`, html)
    await supabase.from('profiles').update({ last_checkin_sent_at: new Date().toISOString() }).eq('id', user.id)
    sent++
  }

  return NextResponse.json({ sent })
}
