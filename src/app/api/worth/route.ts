import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const rateLimit = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 60_000 // 1 minute
  const limit = 5
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + window })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 })
  }
  try {
    const { title, location, salary } = await req.json()

    if (!title || !salary) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: `You are Sarah, a sharp and direct AI career coach who specializes in salary negotiation. You have access to aggregated compensation data from LinkedIn, Glassdoor, Levels.fyi, and Payscale.

When given a job title, location, and current salary, respond with a JSON object in this exact shape:
{
  "message": "2-3 sentence conversational response from Sarah — be direct and specific. If they're underpaid, tell them clearly and make it feel urgent. If they're at or above market, acknowledge it but point out there's still room to negotiate. Always end with a hook that makes them want to take action.",
  "underpaid_by": number (positive = underpaid, negative = above market, 0 = at market),
  "market_median": number,
  "market_range": { "min": number, "max": number },
  "percentile": number (0-100)
}

Be realistic and accurate. Use real market data patterns. Return only the JSON object, no extra text.`,
      messages: [{
        role: 'user',
        content: `Job title: ${title}\nLocation: ${location || 'United States'}\nCurrent salary: $${salary}`,
      }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Invalid response')

    const result = JSON.parse(match[0])
    return NextResponse.json(result)
  } catch (err) {
    console.error('[worth]', err)
    return NextResponse.json({ error: 'Failed to analyze salary' }, { status: 500 })
  }
}
