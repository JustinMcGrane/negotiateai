import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient, createServiceClient } from '@/lib/supabase/server'

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
    const { negotiationType, currentOffer, target, leverage } = await req.json()

    const prompt = `You are a salary negotiation expert. Return ONLY valid JSON.

Situation:
- Negotiating: ${negotiationType}
- Current offer/salary: $${currentOffer}
- Target: $${target}
- Leverage: ${leverage}

Return a 5-6 step personalized negotiation playbook as JSON:
{
  "steps": [
    {
      "title": "Step title",
      "body": "2-3 sentences of specific instruction including exact language to use in quotes"
    }
  ]
}`

    const msg = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0]?.type === 'text' ? (msg.content[0] as {type:string;text:string}).text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    trackUsage('playbook')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Playbook generation failed' }, { status: 500 })
  }
}
