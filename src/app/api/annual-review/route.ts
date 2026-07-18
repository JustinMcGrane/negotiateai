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

    const { role, currentSalary, lastRaise, accomplishments, metrics, marketRate, managerRelationship } = await req.json()

    const prompt = `You are an expert career coach specializing in salary negotiation and annual reviews. Return ONLY valid JSON.

Employee details:
- Role: ${role}
- Current salary: ${currentSalary}
- Last raise: ${lastRaise || 'Not specified'}
- Market rate: ${marketRate || 'Not specified'}
- Manager relationship: ${managerRelationship}
- Accomplishments: ${accomplishments}
- Metrics/Impact: ${metrics || 'Not provided'}

Return this JSON:
{
  "summary": "3-4 sentence honest assessment of their position and leverage for this review",
  "accomplishments": ["Most compelling point to lead with", "Second strongest point", "Third strong point"],
  "gaps": ["Potential objection manager might raise and how to preempt it", "Area to acknowledge proactively"],
  "askAmount": "Specific salary or percentage to request with brief rationale (e.g. '$135,000 — 12.5% increase based on market data and impact')",
  "script": "A natural, conversational script for the actual review meeting. Include exact phrases to use when opening the conversation, presenting the ask, and handling initial pushback. 250-350 words.",
  "emailDraft": "A follow-up email to send after the meeting confirming the conversation and next steps. Professional but warm. Include subject line."
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
