import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase/server'
import { sendMarketAlert } from '@/lib/email'

export const runtime = 'nodejs'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const { data: users } = await supabase
    .from('profiles')
    .select('id, name, email, onboarding_role')
    .not('onboarding_role', 'is', null)
    .not('email', 'is', null)
    .neq('market_alert_emails', false)

  let sent = 0
  const seen = new Set<string>()

  for (const u of users || []) {
    if (!u.email || !u.onboarding_role) continue
    const role = u.onboarding_role

    let alert: string
    if (seen.has(role)) {
      // Reuse already-generated alert for same role (save API calls)
      const { data } = await supabase
        .from('profiles')
        .select('market_alert')
        .eq('onboarding_role', role)
        .not('market_alert', 'is', null)
        .limit(1)
        .single()
      alert = data?.market_alert || ''
    } else {
      try {
        const msg = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 200,
          messages: [{
            role: 'user',
            content: `Write a 2-sentence market insight for a ${role}. Include one specific salary trend or demand signal happening right now. Be specific. Sound like a recruiter sharing real intel. No headers, no bullets.`,
          }],
        })
        alert = msg.content[0].type === 'text' ? msg.content[0].text.trim() : ''
        seen.add(role)
        await supabase.from('profiles').update({
          market_alert: alert,
          market_alert_role: role,
          market_alert_updated_at: new Date().toISOString(),
        }).eq('id', u.id)
      } catch {
        continue
      }
    }

    if (!alert) continue
    try {
      const firstName = (u.name || u.email).split(/[ @]/)[0]
      await sendMarketAlert(u.email, firstName, role, alert)
      sent++
    } catch {}
  }

  return NextResponse.json({ sent })
}
