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
      max_tokens: 1200,
      system: `You are a senior compensation analyst. The user will paste raw offer details in plain text. Extract the information and return ONLY a valid JSON object with this exact structure:
{
  "score": number (0-10 offer strength score),
  "verdict": "below market" | "at market" | "above market",
  "role": string,
  "company": string,
  "location": string,
  "baseSalary": number,
  "marketMedian": number,
  "gap": number (marketMedian minus baseSalary — positive means underpaid),
  "totalComp4yr": number,
  "moneyLeftOnTable": number (realistic additional comp achievable through negotiation),
  "components": [
    {
      "title": "Market Rate Breakdown",
      "type": "market",
      "summary": string (2-3 sentences on how this offer compares to market),
      "dataPoints": [
        { "label": string, "value": string }
      ]
    },
    {
      "title": "Negotiation Playbook",
      "type": "negotiate",
      "summary": string (1-2 sentences framing the negotiation opportunity),
      "items": [
        { "lever": string, "script": string, "potential": string }
      ]
    },
    {
      "title": "Offer Strengths",
      "type": "strengths",
      "items": string[]
    },
    {
      "title": "Red Flags",
      "type": "redflags",
      "items": string[]
    }
  ]
}

For the negotiation playbook, each item should have: lever (what to push on), script (a one-line opener to use in the conversation), and potential (e.g. "+$10k base"). If no red flags exist, return an empty items array. If a value is not mentioned, estimate from role/location/company stage. Return only the JSON object.`,
      messages: [{ role: 'user', content: offerText }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Invalid response')

    return NextResponse.json(JSON.parse(match[0]))
  } catch (err) {
    console.error('[analyze]', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
