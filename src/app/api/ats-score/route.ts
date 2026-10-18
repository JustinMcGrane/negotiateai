import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const maxDuration = 30

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { resumeText, jobDescription } = await req.json()
    if (!resumeText) return NextResponse.json({ error: 'No resume text provided' }, { status: 400 })

    const jobSection = jobDescription
      ? `\n\nJOB DESCRIPTION TO MATCH AGAINST:\n---\n${jobDescription}\n---\nScore keyword match based on how well the resume matches this specific job.`
      : '\n\nNo job description provided — score based on general ATS best practices.'

    const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume and return ONLY valid JSON.${jobSection}

RESUME:
---
${resumeText.slice(0, 6000)}
---

Return this exact JSON:
{
  "overallScore": <0-100 integer>,
  "sections": {
    "keywords": { "score": <0-100>, "label": "Keyword Match", "issue": "<one specific issue or null>" },
    "formatting": { "score": <0-100>, "label": "ATS Formatting", "issue": "<one specific issue or null>" },
    "impact": { "score": <0-100>, "label": "Impact & Metrics", "issue": "<one specific issue or null>" },
    "length": { "score": <0-100>, "label": "Length & Density", "issue": "<one specific issue or null>" }
  },
  "topIssues": ["<most critical fix>", "<second most critical fix>", "<third most critical fix>"],
  "missingKeywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>"]
}`

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    console.error('[ats-score]', e)
    return NextResponse.json({ error: 'Failed to score resume' }, { status: 500 })
  }
}
