import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

const SCENARIO_TEMPLATES = [
  'A recruiter just gave you a verbal offer that is 15% below your target. You have 24 hours to respond.',
  'Your manager says the budget is frozen and there are no raises this cycle — but you\'ve consistently outperformed.',
  'You have a competing offer and want to use it to negotiate with your current employer without burning bridges.',
  'A recruiter asks "what are your salary expectations?" before you have any details about the role.',
  'After three rounds of interviews, the offer comes in at the bottom of the range they quoted.',
  'You\'ve been in your role for 2 years without a raise and your market value has risen 25%.',
  'The company says the role is "non-negotiable" on salary but is flexible on everything else.',
  'You\'re counter-offering and the recruiter says "that\'s the best we can do" — but you\'re not sure if it\'s true.',
  'A startup offers you equity in lieu of a higher salary. You need to evaluate the trade-off.',
  'You receive a promotion but the raise is only 5% — far below the market rate for the new title.',
]

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const idx = Math.floor(Math.random() * SCENARIO_TEMPLATES.length)
    return NextResponse.json({ scenario: SCENARIO_TEMPLATES[idx], scenarioIndex: idx })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { scenario, response } = await req.json()

    const prompt = `You are an expert negotiation coach giving feedback on how someone handled a real-world scenario.

SCENARIO: ${scenario}

THEIR RESPONSE: "${response}"

Give a sharp, honest 3-part assessment. Return ONLY valid JSON:
{
  "score": <number 1-100>,
  "verdict": "<one punchy sentence — was this response strong, weak, or mixed?>",
  "whatWorked": "<1-2 sentences on the strongest element of their response>",
  "whatToImprove": "<1-2 sentences on the biggest weakness or missed opportunity>",
  "betterResponse": "<a concrete rewrite of what they should have said — 2-4 sentences, in first person, conversational>"
}`

    const msg = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0]?.type === 'text' ? (msg.content[0] as { type: string; text: string }).text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')

    const feedback = JSON.parse(match[0])

    // Track streak in profiles
    const today = new Date().toISOString().slice(0, 10)
    const { data: profile } = await supabase.from('profiles').select('last_prep_date, prep_streak').eq('id', user.id).single()
    const lastDate = profile?.last_prep_date
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const currentStreak = profile?.prep_streak || 0
    const newStreak = lastDate === today ? currentStreak : lastDate === yesterday ? currentStreak + 1 : 1
    await supabase.from('profiles').update({ last_prep_date: today, prep_streak: newStreak }).eq('id', user.id)

    return NextResponse.json({ ...feedback, streak: newStreak })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
