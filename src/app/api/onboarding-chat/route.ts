import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are Sarah, a senior recruiter with 12 years of experience. You are meeting a new user for the first time and your job is to quickly learn about them so you can give them tailored advice throughout the platform.

You need to learn four things from them, naturally in conversation:
1. Their primary goal (one of: landing a new job, negotiating an offer, getting a raise/promotion, improving their resume)
2. Their current situation (actively applying, casually exploring, has an offer in hand, currently employed but not looking)
3. Their years of experience (0-2, 3-5, 6-10, or 10+)
4. Their role or field (e.g. Software Engineer, Product Manager, Sales, Marketing, Finance, etc.)

How to run this conversation:
- Be warm but efficient. This should feel like a quick, friendly intake conversation — not an interrogation.
- Ask one or two things at a time, never four at once.
- Listen to what they say and extract the answers naturally. If they volunteer information, acknowledge it and move on — do not ask for it again.
- Once you have all four pieces of information, wrap up warmly and tell them one specific, relevant thing you can help them with based on what they told you. Keep it to 2-3 sentences. Then end your message with exactly this line on its own: [ONBOARDING_COMPLETE]
- Do not use bullet points, headers, or bold text.
- Write short, conversational paragraphs.
- Do not use filler phrases like "Great!", "Absolutely!", or "Of course!".
- Do not pepper them with questions — one thread at a time.`

type ExtractedProfile = {
  goal?: string
  situation?: string
  experience?: string
  role?: string
}

async function extractProfile(
  messages: Array<{ role: string; content: string }>
): Promise<ExtractedProfile> {
  try {
    const transcript = messages
      .map(m => `${m.role === 'user' ? 'User' : 'Sarah'}: ${m.content}`)
      .join('\n')

    const res = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Extract what you know about this user from the conversation. Return ONLY valid JSON with these fields (omit fields you are not confident about):\n{\n  "goal": one of "new_job" | "negotiate" | "raise" | "resume" (only if clearly stated),\n  "situation": one of "actively_looking" | "casually_looking" | "have_offer" | "employed" (only if clearly stated),\n  "experience": one of "0-2" | "3-5" | "6-10" | "10+" (only if clearly stated),\n  "role": string (their job title or field, only if clearly stated)\n}\n\nConversation:\n${transcript}\n\nReturn only the JSON object, nothing else.`,
      }],
    })

    const text = res.content[0].type === 'text' ? res.content[0].text : '{}'
    const match = text.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : {}
  } catch {
    return {}
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Anthropic requires messages to start with 'user'.
    // The opening assistant message is hardcoded UI — strip it before sending.
    const anthropicMessages = messages
      .filter((m: { role: string }) => m.role !== 'system')
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

    // Drop leading assistant messages so the array always starts with 'user'
    while (anthropicMessages.length > 0 && anthropicMessages[0].role === 'assistant') {
      anthropicMessages.shift()
    }

    if (anthropicMessages.length === 0) {
      return NextResponse.json({ error: 'No user message provided' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''
    const complete = content.includes('[ONBOARDING_COMPLETE]')
    const displayContent = content.replace('[ONBOARDING_COMPLETE]', '').trim()

    // Only extract profile on completion to avoid a second API call on every message
    let profile: ExtractedProfile = {}
    if (complete) {
      const allMessages = [...messages, { role: 'assistant', content: displayContent }]
      profile = await extractProfile(allMessages)

      if (Object.keys(profile).length > 0) {
        try {
          const supabase = await createClient()
          const { data: { user } } = await supabase.auth.getUser()
          if (user) {
            await supabase.from('profiles').upsert({
              id: user.id,
              onboarding_goal: profile.goal,
              onboarding_situation: profile.situation,
              onboarding_experience: profile.experience,
              onboarding_role: profile.role,
              onboarded_at: new Date().toISOString(),
            })
          }
        } catch {
          // best-effort, never block the response
        }
      }
    }

    return NextResponse.json({ content: displayContent, complete, profile })
  } catch (err) {
    console.error('[onboarding-chat]', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
