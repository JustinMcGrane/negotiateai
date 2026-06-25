import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { type, amount, valuation, strikePrice, vestingSchedule, stage } = await req.json()

    const prompt = `You are a startup equity expert. Return ONLY valid JSON.

Equity details:
- Type: ${type}
- Grant amount: ${amount} shares/units
- Current company valuation: $${valuation}
- Strike price: $${strikePrice || 0}
- Vesting: ${vestingSchedule}
- Stage: ${stage}

Return this JSON (dollar values as integers):
{
  "conservative": 45000,
  "base": 180000,
  "optimistic": 720000,
  "likelihood": "15-25% chance of meaningful return",
  "insight": "2 sentence honest assessment of this equity package",
  "questions": ["Specific question to ask the company about equity 1", "Specific question 2"]
}`

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (msg.content[0] as { type: string; text: string }).text
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Modeling failed' }, { status: 500 })
  }
}
