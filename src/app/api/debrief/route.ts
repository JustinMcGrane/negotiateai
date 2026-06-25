import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase/server'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { transcript, role, offer, target, personaLabel, userId } = await req.json()

    const prompt = `You are a salary negotiation coach. Analyze this negotiation transcript and return ONLY valid JSON.

Role: ${role}
Initial offer: $${offer}
Candidate's target: $${target}
Recruiter persona: ${personaLabel}

Transcript:
${transcript}

Return this JSON:
{
  "overallScore": 74,
  "confidenceScore": 68,
  "tacticsScore": 80,
  "outcome": "1-2 sentence description of how the negotiation ended",
  "strengths": ["What the candidate did well 1", "Strength 2", "Strength 3"],
  "improvements": ["What to improve 1", "Improvement 2", "Improvement 3"],
  "emailDraft": "A ready-to-send follow-up counter-offer email based on the negotiation"
}`

    const msg = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (msg.content[0] as { type: string; text: string }).text
    const debrief = JSON.parse(text)

    if (userId) {
      const supabase = createServiceClient()
      await supabase.from('sessions').insert({
        user_id: userId,
        role,
        offer: String(offer),
        target: String(target),
        persona_name: personaLabel,
        overall_score: debrief.overallScore,
        confidence_score: debrief.confidenceScore,
        tactics_score: debrief.tacticsScore,
        outcome: debrief.outcome,
        email_draft: debrief.emailDraft,
        strengths: debrief.strengths,
        improvements: debrief.improvements,
      })
      try { await supabase.rpc('increment_sessions_used', { user_id: userId }) } catch {}
    }

    return NextResponse.json(debrief)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Debrief failed' }, { status: 500 })
  }
}
