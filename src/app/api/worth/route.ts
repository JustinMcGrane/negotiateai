import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { title, company, location, salary } = await req.json()

    if (!title || !location || !salary) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: `You are a compensation data analyst with access to aggregated salary data from LinkedIn, Glassdoor, Levels.fyi, and Payscale. When given a job title, company, location, and current salary, return ONLY a valid JSON object with these exact fields:
{
  "underpaid_by": number (positive = underpaid, negative = above market, 0 = at market; this is market_median minus current_salary),
  "percentile": number (0-100, where the current salary sits in the market distribution),
  "market_range": { "min": number, "max": number } (25th to 75th percentile range for this role/location)
}
Base your estimates on real market data patterns. Be accurate and realistic. Return only the JSON object, no explanation.`,
      messages: [{
        role: 'user',
        content: `Job title: ${title}\nCompany: ${company}\nLocation: ${location}\nCurrent salary: $${salary}`,
      }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Invalid response from AI')

    const result = JSON.parse(match[0])
    return NextResponse.json(result)
  } catch (err) {
    console.error('[worth]', err)
    return NextResponse.json({ error: 'Failed to analyze salary' }, { status: 500 })
  }
}
