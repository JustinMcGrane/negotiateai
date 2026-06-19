import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { role, company, offer, counter, leverage } = await req.json()

    const prompt = `You are a salary negotiation expert. Return ONLY valid JSON.

Counter-offer details:
- Role: ${role}
- Company: ${company}
- Their offer: $${offer}
- My counter: $${counter}
- Context/leverage: ${leverage}

Return this JSON:
{
  "email": "Full professional email text (no JSON escaping needed, use \\n for newlines). Subject line on first line starting with Subject:. Then blank line, then body.",
  "script": "Verbal script for the phone call conversation, 3-4 sentences of what to actually say",
  "tip": "One specific delivery tip for this situation"
}`

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (msg.content[0] as { type: string; text: string }).text
    return NextResponse.json(JSON.parse(text))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Builder failed' }, { status: 500 })
  }
}
