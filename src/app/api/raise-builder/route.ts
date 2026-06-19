import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { role, currentSalary, targetSalary, timeInRole, wins } = await req.json()

    const prompt = `You are a salary negotiation expert. Return ONLY valid JSON.

Details:
- Role: ${role}
- Current salary: $${currentSalary}
- Target salary: $${targetSalary}
- Time in role: ${timeInRole}
- Key wins: ${wins}

Return this JSON (use \\n for newlines in email):
{
  "subject": "Email subject line",
  "email": "Full raise request email body",
  "talkingPoints": ["Point 1 for the in-person conversation", "Point 2", "Point 3"],
  "timing": "1-2 sentences of advice on when and how to have this conversation"
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
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
