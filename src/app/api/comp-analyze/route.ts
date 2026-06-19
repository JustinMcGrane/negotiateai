import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { role, experience, location, companySize, industry } = body

    const prompt = `You are a compensation data expert. Return ONLY valid JSON, no markdown, no explanation.

Role: ${role}
Experience: ${experience}
Location: ${location}
Company size: ${companySize}
Industry: ${industry}

Return this exact JSON structure with realistic US compensation data (salary in USD integers):
{
  "p25": 95000,
  "p50": 120000,
  "p75": 145000,
  "p90": 175000,
  "insight": "2 sentence market insight about this role/location combo",
  "tip": "1 specific negotiation tip for this exact role and location",
  "recommendedTarget": 130000
}`

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (msg.content[0] as { type: string; text: string }).text
    const data = JSON.parse(text)
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
