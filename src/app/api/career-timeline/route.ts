import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const { currentRole, currentSalary, experience, goal, location, companyType } = await req.json()

    const prompt = `You are an expert career strategist. Return ONLY valid JSON.

Profile:
- Current role: ${currentRole}
- Current salary: ${currentSalary}
- Experience: ${experience}
- Location: ${location}
- 3-year goal: ${goal}
- Company type preference: ${companyType || 'no preference'}

Return this JSON:
{
  "summary": "3-4 sentence honest assessment of this trajectory — is the goal realistic? What's the biggest factor that will determine success?",
  "milestones": [
    { "year": "Now", "role": "Current role title", "salary": "Current salary", "milestone": "What to focus on immediately to set the trajectory" },
    { "year": "Year 1", "role": "Likely role title", "salary": "Expected salary range", "milestone": "The specific thing that must happen this year — a move, a promotion, a skill, a company change" },
    { "year": "Year 2", "role": "Likely role title", "salary": "Expected salary range", "milestone": "What year 2 looks like if year 1 goes well" },
    { "year": "Year 3", "role": "Target role title", "salary": "Target salary range", "milestone": "What success looks like at the 3-year mark" }
  ],
  "salaryGrowth": "Specific projection — e.g. 'On this path, expect to grow from $120k to $185-210k over 3 years, with the biggest jump coming from a strategic company move in year 1-2.'",
  "keyMoves": [
    "The single most important thing to do in the next 90 days",
    "The career move that will have the biggest leverage on comp",
    "The skill or credential that will separate you from peers at the next level",
    "How to position yourself for the year 3 target role starting now"
  ],
  "risks": [
    "Most likely thing that will slow this trajectory down",
    "A market or industry risk specific to this path",
    "A personal/behavioral pattern that could hold them back"
  ]
}`

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0]?.type === 'text' ? (msg.content[0] as { type: string; text: string }).text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
