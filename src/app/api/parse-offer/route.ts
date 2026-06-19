import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    const prompt = `Extract compensation details from this offer letter text. Return ONLY valid JSON.

Text: """
${text}
"""

Return this JSON (use null for fields not found):
{
  "role": "Job title or null",
  "baseSalary": 120000,
  "bonus": 10000,
  "equity": "Description of equity or null",
  "startDate": "Start date string or null"
}`

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    })

    const responseText = (msg.content[0] as { type: string; text: string }).text
    return NextResponse.json(JSON.parse(responseText))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Parse failed' }, { status: 500 })
  }
}
