import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendCheckinReminder } from '@/lib/email'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 3600 * 1000).toISOString()

  // Users who have never had a check-in (and signed up 90+ days ago) or whose last check-in was 90+ days ago
  const { data: users } = await supabase
    .from('profiles')
    .select('id, name, email, plan, last_checkin_at, created_at, checkin_emails')
    .in('plan', ['pro', 'elite'])
    .neq('checkin_emails', false)
    .or(`last_checkin_at.is.null,last_checkin_at.lte.${ninetyDaysAgo}`)

  let sent = 0
  for (const u of users || []) {
    if (!u.email) continue
    // If never had check-in, only remind if account is 90+ days old
    if (!u.last_checkin_at && u.created_at > ninetyDaysAgo) continue
    try {
      const firstName = (u.name || u.email).split(/[ @]/)[0]
      await sendCheckinReminder(u.email, firstName)
      sent++
    } catch {}
  }

  return NextResponse.json({ sent })
}
