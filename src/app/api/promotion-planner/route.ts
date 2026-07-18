import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
    if (profile?.plan !== 'elite') return NextResponse.json({ error: 'elite_required' }, { status: 403 })

    const { currentRole, targetRole, tenure, strengths, gaps, companySize, timeframe } = await req.json()

    const prompt = `You are an expert career coach. Return ONLY valid JSON.

Career details:
- Current role: ${currentRole}
- Target role: ${targetRole}
- Time in current role: ${tenure}
- Target timeframe: ${timeframe} months
- Company size: ${companySize || 'not specified'}
- Strengths: ${strengths}
- Perceived gaps: ${gaps || 'not specified'}

Return this JSON:
{
  "assessment": "2-3 sentence honest assessment of their promotion readiness and what will make or break it",
  "timeline": "Realistic timeline with a specific reason (e.g. '12-14 months is realistic IF you close the cross-team collaboration gap in the next 6 months')",
  "gaps": [
    { "area": "Gap name", "action": "Specific, actionable steps to close this gap with concrete examples" },
    { "area": "Gap name 2", "action": "Specific steps" }
  ],
  "milestones": [
    { "month": "Month 1-2", "goal": "Specific milestone to hit" },
    { "month": "Month 3-4", "goal": "Specific milestone" },
    { "month": "Month 5-6", "goal": "Specific milestone" },
    { "month": "Month 7-9", "goal": "Specific milestone" },
    { "month": "Month 10-12", "goal": "Final push milestone before asking" }
  ],
  "script": "A script for a 1:1 conversation with your manager to align on the promotion path. Include how to open the conversation, how to ask for clarity on what they need to see, and how to get a commitment on timeline. 200-250 words."
}`

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0]?.type === 'text' ? (msg.content[0] as { type: string; text: string }).text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
