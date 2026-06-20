import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, company, jobDesc, resume, tone } = await req.json()

    const toneGuide = {
      professional: 'formal, polished, and confident — like a seasoned executive',
      warm: 'personable, genuine, and enthusiastic — like someone who truly cares about the company mission',
      bold: 'direct, punchy, and memorable — the candidate who stands out',
    }[tone as string] || 'professional'

    const prompt = `Write a compelling cover letter for this application.

Role: ${jobTitle} at ${company}
Tone: ${toneGuide}
${jobDesc ? `\nJob Description:\n${jobDesc}` : ''}
${resume ? `\nCandidate Background:\n${resume}` : ''}

Instructions:
- 3-4 paragraphs, no more than 400 words
- Opening hook that isn't "I am writing to apply..."
- Second paragraph: specific value the candidate brings (use details from the job description and background if provided)
- Third paragraph: why THIS company specifically (research-informed, not generic)
- Closing: confident call to action
- Do NOT include placeholder text in brackets — write it as a complete, ready-to-send letter
- Sign off as [Your Name]

Return only the letter text, no additional commentary.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const letter = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ letter })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
