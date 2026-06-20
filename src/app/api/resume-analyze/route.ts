import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { checkAndIncrementUsage, FREE_LIMITS } from '@/lib/usage'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const isPro = profile?.plan === 'pro'
    const usage = await checkAndIncrementUsage(user.id, 'resume', isPro)

    if (!usage.allowed) {
      return NextResponse.json({
        error: 'limit_reached',
        message: `You've used all ${FREE_LIMITS.resume} free resume analyses this month. Upgrade to Pro for unlimited analyses.`,
        used: usage.used,
        limit: usage.limit,
      }, { status: 429 })
    }

    const { resumeText, targetRole, jobDescription } = await req.json()

    const hasJD = jobDescription && jobDescription.trim().length > 50

    const prompt = `You are a senior technical recruiter and career coach with 15 years of experience reviewing resumes for top-tier companies including Google, Meta, Amazon, McKinsey, and leading startups. You have reviewed over 10,000 resumes and know exactly what gets candidates interviews in 2024-2025.

Analyze this resume with the rigor of a hiring manager who receives 200 applications per role. Be direct, specific, and results-focused. Generic advice helps no one.

RESUME:
${resumeText}

${targetRole ? `TARGET ROLE: ${targetRole}` : ''}
${hasJD ? `\nJOB DESCRIPTION TO MATCH AGAINST:\n${jobDescription}` : ''}

Provide a JSON response with EXACTLY this structure. Be brutally honest and hyper-specific — reference actual content from the resume:

{
  "overallScore": <0-100 score based on how likely this resume is to get interviews for the target role>,
  "atsScore": <0-100 score for ATS/keyword optimization — will it pass automated screening?>,
  "summary": "<3-4 sentence executive assessment. What is the single biggest strength of this resume? What is the single biggest thing holding it back? Be specific — reference actual jobs, companies, or bullets from the resume.>",
  "marketPosition": "<One sentence on where this candidate sits in the market — e.g. 'This resume positions you as a mid-level generalist competing against specialists, which will hurt your chances at Series B+ companies paying $150k+.'>",
  "sections": [
    { "name": "Summary/Headline", "score": <0-100>, "feedback": "<Specific feedback referencing what they wrote or didn't write>" },
    { "name": "Work Experience", "score": <0-100>, "feedback": "<Which roles are strong? Which are weak? What's missing — metrics, scope, impact?>" },
    { "name": "Skills", "score": <0-100>, "feedback": "<Are the right skills listed? Are they organized well? What's missing for the target role?>" },
    { "name": "Education", "score": <0-100>, "feedback": "<Is it positioned correctly? Should it be moved up or down? Any missing credentials?>" },
    { "name": "Overall Format & ATS", "score": <0-100>, "feedback": "<Length, formatting, file type concerns, ATS parse issues>" }
  ],
  "strengths": [
    "<Specific strength 1 — reference actual content>",
    "<Specific strength 2>",
    "<Specific strength 3>"
  ],
  "criticalIssues": [
    "<The most important thing to fix — be specific about what's wrong and why it's hurting them>",
    "<Second most critical issue>",
    "<Third critical issue>"
  ],
  "bulletRewrites": [
    {
      "original": "<Copy a weak bullet EXACTLY as written from the resume>",
      "rewritten": "<Rewrite it with a strong action verb, quantified impact, and clear scope. If you don't have numbers, suggest placeholder formats like [X%] or [$Xk]>",
      "reason": "<One sentence on why the rewrite is stronger>"
    },
    {
      "original": "<Second weak bullet>",
      "rewritten": "<Rewritten version>",
      "reason": "<Why it's better>"
    },
    {
      "original": "<Third weak bullet>",
      "rewritten": "<Rewritten version>",
      "reason": "<Why it's better>"
    }
  ],
  "missingKeywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>", "<keyword 6>"],
  "topPriorities": [
    "<The single most impactful change they should make this week — be specific>",
    "<Second priority change>",
    "<Third priority change>"
  ],
  "interviewReadiness": "<One sentence verdict: e.g. 'Ready to apply at mid-market companies; needs 2-3 hours of work before targeting FAANG or top-tier startups.'>"
}

Return only valid JSON. No markdown code blocks. No commentary outside the JSON.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json({ ...parsed, used: usage.used, limit: usage.limit })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
