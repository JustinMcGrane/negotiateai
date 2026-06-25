import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient, createServiceClient } from '@/lib/supabase/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const REFRESH_HOURS = 168 // 7 days

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_role, market_alert, market_alert_role, market_alert_updated_at')
      .eq('id', user.id)
      .single()

    const role = profile?.onboarding_role || ''
    if (!role) return NextResponse.json({ alert: null })

    // Return cached alert if fresh and role hasn't changed
    if (profile?.market_alert && profile?.market_alert_role === role && profile?.market_alert_updated_at) {
      const age = Date.now() - new Date(profile.market_alert_updated_at).getTime()
      if (age < REFRESH_HOURS * 3600 * 1000) {
        return NextResponse.json({ alert: profile.market_alert, role, cached: true })
      }
    }

    // Generate fresh alert
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Write a 2-sentence market insight for a ${role}. Include one specific salary trend or demand signal happening right now. Be specific, not generic. Sound like a recruiter sharing real intel, not a report. No headers, no bullets.`,
      }],
    })

    const alert = msg.content[0].type === 'text' ? msg.content[0].text.trim() : ''

    const service = createServiceClient()
    await service.from('profiles').update({
      market_alert: alert,
      market_alert_role: role,
      market_alert_updated_at: new Date().toISOString(),
    }).eq('id', user.id)

    return NextResponse.json({ alert, role })
  } catch (err) {
    console.error('[market-alert]', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
