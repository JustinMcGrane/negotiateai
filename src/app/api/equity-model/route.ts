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
    const { type, amount, valuation, strikePrice, vestingSchedule, stage } = await req.json()

    const prompt = `You are a startup equity expert. Return ONLY valid JSON.

Equity details:
- Type: ${type}
- Grant amount: ${amount} shares/units
- Current company valuation: $${valuation}
- Strike price: $${strikePrice || 0}
- Vesting: ${vestingSchedule}
- Stage: ${stage}

Return this JSON (dollar values as integers):
{
  "conservative": 45000,
  "base": 180000,
  "optimistic": 720000,
  "likelihood": "15-25% chance of meaningful return",
  "insight": "2 sentence honest assessment of this equity package",
  "questions": ["Specific question to ask the company about equity 1", "Specific question 2"]
}`

    const msg = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0]?.type === 'text' ? (msg.content[0] as {type:string;text:string}).text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    trackUsage('equity-model')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Modeling failed' }, { status: 500 })
  }
}
