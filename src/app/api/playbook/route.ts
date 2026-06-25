import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

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
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (msg.content[0] as { type: string; text: string }).text
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Playbook generation failed' }, { status: 500 })
  }
}
