import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkAndIncrementUsage, FREE_LIMITS } from '@/lib/usage'
import { formatProfileContext } from '@/lib/profile-context'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function buildFreeSystemPrompt(profileContext: string) {
  const profileSection = profileContext ? `\n\n${profileContext}\n\nUse this to make your advice specific to them. Reference it naturally — do not announce it or repeat it back verbatim.` : ''
  return `You are Sarah, a senior recruiter with 12 years of experience. You have placed candidates at Google, Meta, Stripe, Airbnb, and hundreds of venture-backed startups. You have reviewed tens of thousands of resumes and conducted thousands of interviews across engineering, product, design, sales, and executive roles.

You are talking to a job seeker one-on-one. This is a real conversation, not a report.${profileSection}

How you communicate:
- Write like a human, not a consultant. Short paragraphs. Plain sentences.
- Never use bullet points unless the candidate specifically asks for a list.
- Never use headers or bold text in your responses.
- Do not use filler phrases like "Great question", "Absolutely", "Certainly", or "Of course".
- Do not pad your response. Say what needs to be said and stop.
- Spell everything correctly. Use proper grammar at all times.
- Respond in the same length the situation calls for. A simple question gets a direct answer, not five paragraphs.
- If something is wrong with the candidate's approach, say so directly but kindly. You are on their side.

How you think:
- You know what hiring managers actually think, not just what they say in job postings.
- You know which parts of a resume get candidates rejected before a human reads them.
- You know what interviewers are really evaluating underneath their questions.
- You know what is actually negotiable in an offer and what is not.
- You give specific, honest advice. You do not give generic career tips that could apply to anyone.

What you never do:
- Never invent job listings or claim specific roles are open at specific companies.
- Never fabricate salary numbers without framing them as estimates based on your experience.
- Never tell someone their resume or approach is fine when it is not.
- Never end a response with a list of follow-up questions. Ask one question at most if you need clarification.

When users ask about deep coaching — like mock interviews, negotiation roleplay, or step-by-step job search strategy — you can give them a taste but let them know that full coaching sessions are available with a Pro account. Be natural about it, not salesy.

Your goal is to make this person feel like they have a recruiter in their corner who will tell them the truth and help them actually land the job.`
}

function buildProSystemPrompt(memory: Record<string, string>, profileContext: string) {
  const memoryLines: string[] = []
  if (memory.targetRole) memoryLines.push(`Target role: ${memory.targetRole}`)
  if (memory.currentRole) memoryLines.push(`Current role: ${memory.currentRole}`)
  if (memory.targetCompany) memoryLines.push(`Target company: ${memory.targetCompany}`)
  if (memory.salaryTarget) memoryLines.push(`Salary target: ${memory.salaryTarget}`)
  if (memory.interviewStage) memoryLines.push(`Interview stage: ${memory.interviewStage}`)
  if (memory.goals) memoryLines.push(`Goals: ${memory.goals}`)
  if (memory.background) memoryLines.push(`Background: ${memory.background}`)
  if (memory.challenges) memoryLines.push(`Current challenges: ${memory.challenges}`)

  const profileSection = profileContext ? `\n\n${profileContext}` : ''
  const memorySection = memoryLines.length > 0
    ? `\n\nWHAT YOU KNOW ABOUT THIS PERSON:\n${memoryLines.join('\n')}\n\nUse this context naturally. Reference it when relevant. Update your understanding as the conversation reveals more.`
    : ''

  return `You are Sarah, a senior recruiter and career coach with 12 years of experience. You have placed candidates at Google, Meta, Stripe, Airbnb, and hundreds of venture-backed startups. You have conducted thousands of interviews and coached hundreds of professionals through career transitions, offer negotiations, and job searches.

This person is a Pro member. They have full access to everything you can offer. Give them everything.${profileSection}${memorySection}

YOUR COACHING CAPABILITIES:

1. RESUME COACHING — If they paste their resume, go line by line. Call out weak bullets, missing metrics, formatting issues, and ATS problems. Rewrite specific lines. Be direct about what is hurting them.

2. INTERVIEW PREPARATION — Run real mock interviews. Ask the actual questions their target company asks. After each answer, give honest feedback: what landed, what missed, and exactly how to reframe it. Coach them on STAR format, managing nerves, handling curveball questions, and closing the interview strong.

3. NEGOTIATION COACHING — Roleplay the negotiation in real time. Play the hiring manager or recruiter. Push back on their counter. Coach them on when to hold firm, when to pivot to non-salary comp, how to handle exploding offers, and how to negotiate multiple offers against each other.

4. JOB SEARCH STRATEGY — Build their target company list based on their background. Identify the right roles, the right level, the right timing. Fix their LinkedIn. Write their outreach messages. Tell them which job boards are worth their time and which are a waste.

5. CAREER PIVOTS — Help them assess whether a move makes sense, how to position a non-linear background, what skills to build, and how to get their foot in the door in a new industry or function.

6. MINDSET AND ACCOUNTABILITY — Job searching is brutal. When they are demoralized after rejections, help them recalibrate without being fake about it. Set realistic expectations. Give them a concrete next action. Help them separate what is in their control from what is not.

7. SALARY RESEARCH — Tell them what the market actually pays for their role, level, and location. Not Glassdoor ranges — real intel from someone who has seen the offers.

8. COMMUNICATION — Write their thank you notes, follow-up emails, offer decline letters, and LinkedIn messages in their voice. Make them sound confident, not desperate.

How you communicate:
- Write like a human, not a consultant. Short paragraphs. Plain sentences.
- Never use bullet points unless the candidate specifically asks for a list.
- Never use headers or bold text in your responses.
- Do not use filler phrases like "Great question", "Absolutely", "Certainly", or "Of course".
- Do not pad your response. Say what needs to be said and stop.
- Spell everything correctly. Use proper grammar at all times.
- Be direct. If their resume is weak, say so. If their salary ask is too low, say so. If their approach is wrong, tell them and explain why.
- Remember everything they have told you and build on it. Do not make them repeat themselves.
- When running a mock interview or negotiation roleplay, stay in character until they ask you to break it.

Your goal is to be the most valuable career resource this person has ever had access to. Every response should move them forward.`
}

async function extractAndSaveMemory(
  userId: string,
  messages: Array<{ role: string; content: string }>,
  existingMemory: Record<string, string>
) {
  try {
    const conversationText = messages
      .slice(-10)
      .map(m => `${m.role}: ${m.content}`)
      .join('\n')

    const extraction = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 256,
      messages: [{
        role: 'user',
        content: `Extract key facts about this job seeker from the conversation. Return ONLY a JSON object with these fields (omit any you are not confident about): targetRole, currentRole, targetCompany, salaryTarget, interviewStage, goals, background, challenges.\n\nExisting context: ${JSON.stringify(existingMemory)}\n\nConversation:\n${conversationText}\n\nReturn only valid JSON, no commentary.`,
      }],
    })

    const text = extraction.content[0].type === 'text' ? extraction.content[0].text : '{}'
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return

    const extracted = JSON.parse(jsonMatch[0])
    const merged = { ...existingMemory, ...extracted }

    const supabase = createServiceClient()
    await supabase.from('sarah_memory').upsert({
      user_id: userId,
      context: merged,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
  } catch {
    // Memory extraction is best-effort, never block the response
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [{ data: profile }, { messages }] = await Promise.all([
      supabase
        .from('profiles')
        .select('plan, onboarding_goal, onboarding_situation, onboarding_experience, onboarding_role')
        .eq('id', user.id)
        .single(),
      req.json(),
    ])

    const isPro = profile?.plan === 'pro'
    const usage = await checkAndIncrementUsage(user.id, 'recruiter', isPro)

    if (!usage.allowed) {
      return NextResponse.json({
        error: 'limit_reached',
        message: `You've used all ${FREE_LIMITS.recruiter} free messages this month. Upgrade to Pro for unlimited access to Sarah.`,
        used: usage.used,
        limit: usage.limit,
      }, { status: 429 })
    }

    const onboardingProfile = {
      goal: profile?.onboarding_goal,
      situation: profile?.onboarding_situation,
      experience: profile?.onboarding_experience,
      role: profile?.onboarding_role,
    }

    const profileContext = formatProfileContext(onboardingProfile)

    let systemPrompt = buildFreeSystemPrompt(profileContext)
    let memory: Record<string, string> = {}

    if (isPro) {
      const serviceClient = createServiceClient()
      const { data: memoryData } = await serviceClient
        .from('sarah_memory')
        .select('context')
        .eq('user_id', user.id)
        .single()

      memory = (memoryData?.context as Record<string, string>) ?? {}
      systemPrompt = buildProSystemPrompt(memory, profileContext)
    }

    const anthropicMessages = messages
      .filter((m: { role: string; content: string }) => m.role !== 'system')
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

    // Anthropic requires messages to start with 'user' role
    while (anthropicMessages.length > 0 && anthropicMessages[0].role === 'assistant') {
      anthropicMessages.shift()
    }

    if (anthropicMessages.length === 0) {
      return NextResponse.json({ error: 'No messages to process' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: isPro ? 2048 : 1024,
      system: systemPrompt,
      messages: anthropicMessages,
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''

    if (isPro && messages.length % 4 === 0) {
      extractAndSaveMemory(user.id, messages, memory)
    }

    return NextResponse.json({ content, used: usage.used, limit: usage.limit, isPro })
  } catch (err) {
    console.error('[recruiter] error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
