import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { resumeText, targetRole } = await req.json()

    const prompt = `You are an expert recruiter and career coach. Analyze this resume${targetRole ? ` for the target role: ${targetRole}` : ''}.

RESUME:
${resumeText}

Provide a JSON response with exactly this structure:
{
  "score": <number 0-100 overall resume quality>,
  "atsScore": <number 0-100 ATS/keyword optimization score>,
  "summary": "<2-3 sentence executive summary of the resume's strengths and biggest opportunity>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3>", "<specific improvement 4>"],
  "keywords": ["<missing keyword 1>", "<missing keyword 2>", "<missing keyword 3>", "<missing keyword 4>", "<missing keyword 5>"]
}

Be specific and actionable. Reference actual content from the resume. Return only valid JSON.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {}

    return NextResponse.json(parsed)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
