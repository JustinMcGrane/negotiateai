import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { currentRole, currentSalary, competingOffer, competingCompany, preferCurrent, currentManager, timeline } = await req.json()

    const prompt = `You are an expert salary negotiation coach. Return ONLY valid JSON.

Situation:
- Current role: ${currentRole} at ${currentSalary}
- Competing offer: ${competingOffer} from ${competingCompany}
- Decision deadline: ${timeline || 'not specified'}
- Preference: ${preferCurrent === 'yes' ? 'Would prefer to stay if current company matches' : preferCurrent === 'no' ? 'Ready to leave either way' : 'Depends on the counter'}
- Manager relationship: ${currentManager}

Return this JSON:
{
  "leverage": "2-3 sentence analysis of how much real leverage they have and why",
  "strategy": "The specific recommended approach — whether to reveal the offer or not, when, and how aggressively to push",
  "risks": ["Specific risk 1", "Specific risk 2", "Specific risk 3"],
  "script": "A word-for-word script for the conversation with their manager. Should feel natural, not confrontational. Include how to open, how to present the situation, how to make the ask, and 2 responses to likely pushback. 250-300 words.",
  "emailTemplate": "An alternative email approach if they prefer to do this in writing. Include subject line. Professional and warm.",
  "likelyOutcome": "Honest assessment of what will likely happen and what a win looks like in this specific situation"
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
