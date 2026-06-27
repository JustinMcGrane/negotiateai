import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { objection, context } = await req.json()

    const prompt = `You are a salary negotiation coach. Return ONLY valid JSON.

The recruiter said: "${objection}"
${context ? `Additional context: ${context}` : ''}

Return three responses to this objection:
{
  "objection": "${objection}",
  "responses": [
    { "label": "Assertive", "text": "What to say if you want to hold firm confidently" },
    { "label": "Collaborative", "text": "What to say to find middle ground" },
    { "label": "Reframe", "text": "What to say to change the frame of the conversation" }
  ],
  "insight": "1 sentence explaining why they likely said this and what it signals"
}`

    const msg = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0]?.type === 'text' ? (msg.content[0] as {type:string;text:string}).text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
