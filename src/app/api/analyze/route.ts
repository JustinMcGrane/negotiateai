import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { offerText } = await req.json()
    if (!offerText?.trim()) {
      return NextResponse.json({ error: 'No offer text provided' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: `You are a senior compensation analyst. The user will paste raw offer details in plain text. Extract the information and return ONLY a valid JSON object with this exact structure:
{
  "score": number (0-100 offer strength score),
  "verdict": "below market" | "at market" | "above market",
  "role": string,
  "company": string,
  "location": string,
  "baseSalary": number (annual, in USD),
  "totalComp4yr": number (base + bonus + equity over 4 years),
  "marketMedian": number (market median base salary for this role and location),
  "gap": number (marketMedian minus baseSalary — positive means underpaid),
  "analysis": string (2-3 sentences summarizing the offer strength and key insight),
  "negotiate": string[] (3-4 specific, actionable things to push back on),
  "strengths": string[] (2-3 genuine positives about this offer)
}

If a value is not mentioned in the offer text, make a reasonable estimate based on role, location, and company stage. Return only the JSON object.`,
      messages: [{ role: 'user', content: offerText }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Invalid response')

    const result = JSON.parse(match[0])
    return NextResponse.json(result)
  } catch (err) {
    console.error('[analyze]', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
