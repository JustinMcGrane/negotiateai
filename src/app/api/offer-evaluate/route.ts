import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { role, baseSalary, bonus, equity, location, stage } = body

    const prompt = `You are a compensation expert. Return ONLY valid JSON.

Offer details:
- Role: ${role}
- Base salary: $${baseSalary}
- Annual bonus: $${bonus || 0}
- Equity (4yr estimated): $${equity || 0}
- Location: ${location}
- Company stage: ${stage}

Return this exact JSON (score 0-100, verdict one of: "below market"|"at market"|"above market"):
{
  "score": 72,
  "verdict": "below market",
  "totalComp4yr": 520000,
  "marketMedian": 145000,
  "gap": 15000,
  "analysis": "2-3 sentence analysis of this offer",
  "negotiate": ["specific thing 1 to negotiate", "specific thing 2", "specific thing 3"]
}`

    const msg = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0]?.type === 'text' ? (msg.content[0] as {type:string;text:string}).text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
  }
}
