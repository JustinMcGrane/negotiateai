import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function buildSystemPrompt(context: {
  targetRange: string
  walkAway: string
  currentOffers: string
  strategySummary: string
  leveragePoints: string
}) {
  return `You are Sarah, a real-time negotiation coach. The user is currently IN a live negotiation call, interview, or conversation right now. They will send you short updates about what the other party just said. Your job is to give them ONE thing to say or do next.

CRITICAL RULES:
- Maximum 2 sentences. Ideally 1.
- No explanations, no reasoning, no "because" — just the move.
- Format as either:
  SAY: "[exact phrase they should say]"
  or
  DO: [one short action, e.g. "Pause. Let the silence sit."]
- Never break character to explain negotiation theory — that happens after the call.
- If the situation is genuinely ambiguous or you need more info, ask ONE short clarifying question instead of guessing.
- Match the tone/register the user has established in practice mode (confident, calm, not aggressive) unless their situation calls for a clear pivot.

CONTEXT:
- Target range: ${context.targetRange}
- Walk-away point: ${context.walkAway}
- Offer(s) on the table: ${context.currentOffers}
- Strategy: ${context.strategySummary}
- Known leverage points: ${context.leveragePoints}

The user is under real-time pressure. Speed and clarity matter more than completeness. When in doubt, favor the shorter, more actionable response.`
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const isElite = profile?.plan === 'elite'
    if (!isElite) {
      return NextResponse.json({ error: 'elite_required', message: 'Live coaching is an Elite feature.' }, { status: 403 })
    }

    const { messages, context } = await req.json()

    const systemPrompt = buildSystemPrompt(context)

    const anthropicMessages = messages
      .filter((m: { role: string }) => m.role !== 'system')
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

    while (anthropicMessages.length > 0 && anthropicMessages[0].role === 'assistant') {
      anthropicMessages.shift()
    }

    if (anthropicMessages.length === 0) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 200,
      system: systemPrompt,
      messages: anthropicMessages,
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ content })
  } catch (err) {
    console.error('[live-coach] error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
