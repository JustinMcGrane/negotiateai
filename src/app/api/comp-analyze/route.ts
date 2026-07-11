import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getUserProfile, formatProfileContext } from '@/lib/profile-context'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

async function trackUsage(feature: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const period = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    const svc = createServiceClient()
    const { data } = await svc.from('usage_tracking').select('count').eq('user_id', user.id).eq('feature', feature).eq('period', period).single()
    await svc.from('usage_tracking').upsert({ user_id: user.id, feature, period, count: (data?.count ?? 0) + 1 }, { onConflict: 'user_id,feature,period' })
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { role, experience, location, companySize, industry } = body

    const profile = await getUserProfile().catch(() => null)
    const profileContext = formatProfileContext(profile)
    const contextBlock = profileContext ? `\n\n${profileContext}\n` : ''

    const prompt = `You are a compensation data expert. Return ONLY valid JSON, no markdown, no explanation.${contextBlock}
Role: ${role}
Experience: ${experience}
Location: ${location}
Company size: ${companySize}
Industry: ${industry}

Return this exact JSON structure with realistic US compensation data (salary in USD integers):
{
  "p25": 95000,
  "p50": 120000,
  "p75": 145000,
  "p90": 175000,
  "insight": "2 sentence market insight about this role/location combo",
  "tip": "1 specific negotiation tip for this exact role and location",
  "recommendedTarget": 130000
}`

    const msg = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    trackUsage('comp-analyze')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
