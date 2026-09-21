import Anthropic from '@anthropic-ai/sdk'

export type SalaryData = {
  p25: number
  p50: number
  p75: number
  p90: number
  insight: string
  negotiationTip: string
  topPayingCities: { city: string; median: number }[]
  topPayingIndustries: { industry: string; median: number }[]
}

let client: Anthropic | null = null
function getClient() {
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  return client
}

export async function fetchSalaryData(role: string, context: string): Promise<SalaryData> {
  const prompt = `You are a compensation data expert. Return ONLY valid JSON, no markdown, no explanation.

Role: ${role}
Context hint: ${context}

Return this exact JSON structure with realistic US compensation data (salaries in USD integers):
{
  "p25": 75000,
  "p50": 95000,
  "p75": 120000,
  "p90": 150000,
  "insight": "2-3 sentence market insight about compensation trends for this role in the current US market",
  "negotiationTip": "1 specific, actionable negotiation tip tailored to this role",
  "topPayingCities": [
    { "city": "San Francisco, CA", "median": 140000 },
    { "city": "New York, NY", "median": 130000 },
    { "city": "Seattle, WA", "median": 125000 },
    { "city": "Boston, MA", "median": 115000 },
    { "city": "Austin, TX", "median": 105000 }
  ],
  "topPayingIndustries": [
    { "industry": "Technology", "median": 140000 },
    { "industry": "Finance", "median": 130000 },
    { "industry": "Healthcare", "median": 110000 },
    { "industry": "Consulting", "median": 120000 },
    { "industry": "Government", "median": 95000 }
  ]
}`

  const msg = await getClient().messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 800,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No JSON in response')
  return JSON.parse(match[0]) as SalaryData
}
