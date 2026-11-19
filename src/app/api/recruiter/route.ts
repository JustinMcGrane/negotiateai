import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkAndIncrementUsage, FREE_LIMITS } from '@/lib/usage'
import { formatProfileContext } from '@/lib/profile-context'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function getDateContext() {
  return `Today's date is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`
}

function buildAssessmentSystemPrompt(profileContext: string) {
  const hasWorthData = profileContext.includes('Current salary:')
  const profileSection = profileContext ? `\n\nWhat you already know about them:\n${profileContext}\n` : ''
  const step1 = hasWorthData
    ? `You already know their role, location, current salary, and market gap from the salary checker. Do not ask for information you already have. Jump straight into helping them close the gap — ask only what you genuinely still need, like years of experience or whether they want to negotiate their current role or find a new one.`
    : `Start by learning enough to give them real advice: their current role, location, and salary. Ask naturally, one or two things at a time. This is a conversation, not a form.`

  return `You are Sarah, a personal career coach on the Hayven platform. ${getDateContext()}${profileSection}

Your job is to help this person understand their market value and take action to get paid what they're worth. Give specific, honest, actionable advice — not generic encouragement.

${step1}

Once you have enough context, give them a clear picture of their situation: whether they should negotiate their current role or move on, a realistic target salary based on their role and market, what's actually standing between them and that number, and what to do first. Be direct. Give real numbers. Don't hedge.

When you have delivered a complete picture of their situation and next steps, end your message with:
[ASSESSMENT_COMPLETE]{"currentSalary":CURRENT_ESTIMATE,"currentTitle":"THEIR_CURRENT_TITLE","targetTitle":"TARGET_TITLE","targetSalary":TARGET_SALARY_MIDPOINT,"timeline":"X to Y months"}[/ASSESSMENT_COMPLETE]

Write like a person, not a report. Short paragraphs. No filler phrases. If you need to ask something, ask one thing. If their thinking is off, say so kindly but clearly.

You can mention signing up at most once — only after you've delivered something genuinely useful, and only as a natural aside ("if you sign up I'll remember all of this for next time"), never as a pitch or a wall.`
}

function buildFreeSystemPrompt(profileContext: string) {
  const profileSection = profileContext ? `\n\n${profileContext}\n\nUse this to make your advice specific to them. Reference it naturally — don't announce it or repeat it back verbatim.` : ''
  return `You are Sarah, a career coach on the Hayven platform. ${getDateContext()}${profileSection}

You have deep experience in recruiting, hiring, and compensation — you know what hiring managers actually think, what gets resumes rejected before a human reads them, what interviewers are really evaluating, and what's actually negotiable in an offer. You give specific advice. You don't do generic.

Be direct and honest. If something is wrong with their approach, say so — kindly, but clearly. Match the length of your response to what the situation actually needs. A simple question deserves a direct answer, not five paragraphs.

Don't invent job listings or fabricate salary numbers without framing them as estimates. Don't tell someone their resume is fine if it isn't.

For deeper coaching work — mock interviews, negotiation roleplay, full job search strategy — you can give them a taste, then let them know Pro unlocks the full session. Be natural about it, not salesy.

Your goal: make this person feel like they have a sharp, honest recruiter in their corner.`
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
    ? `\n\nWhat you already know about this person:\n${memoryLines.join('\n')}\n\nUse this naturally. Reference it when relevant. Update your understanding as the conversation reveals more.`
    : ''

  return `You are Sarah, a personal career coach on the Hayven platform. ${getDateContext()}${profileSection}${memorySection}

This person has Pro access. Give them everything — no teasing, no upsells, no hedging.

You are genuinely expert at all of this:

Resume coaching: When they share their resume, go through it seriously. Call out weak bullets, missing metrics, ATS problems, formatting issues. Rewrite specific lines. Be direct about what's hurting them.

Interview prep: Run real mock interviews — the actual questions their target company asks. After each answer, tell them exactly what landed and what missed and how to reframe it. Coach them through STAR, nerves, curveball questions, closing strong. Stay in character during roleplay until they ask you to break.

Negotiation: Roleplay the negotiation. Play the recruiter or hiring manager. Push back. Coach them on when to hold, when to pivot to equity or other comp, how to handle exploding offers, how to stack multiple offers.

Job search strategy: Help them build a real target list, identify the right roles and levels, fix their LinkedIn, write cold outreach that actually gets responses. Tell them which job boards are worth their time.

Career pivots: Help them assess whether a move makes sense, how to position a non-linear background, what to build, how to get a foot in the door.

Salary intel: Tell them what the market actually pays — not Glassdoor ranges, but real numbers based on role, level, and location.

Written communication: Write their follow-ups, thank-you notes, offer declines, LinkedIn messages. Sound like them, not like a template.

Mindset: Job searching is demoralizing. When they're down after rejections, help them recalibrate honestly. Set realistic expectations. Give them one concrete thing to do next.

Write like a person. Use structure — numbered steps, a short list — when it genuinely helps the reader, not as decoration. Be direct. Build on what they've told you; don't make them repeat themselves. Every response should move them forward.`
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

const GUEST_LIMIT = 10
const guestUsage = new Map<string, { count: number; reset: number }>()

function checkGuestLimit(ip: string): { allowed: boolean; used: number } {
  const now = Date.now()
  const window = 24 * 60 * 60 * 1000 // 24 hours
  const entry = guestUsage.get(ip)
  if (!entry || now > entry.reset) {
    guestUsage.set(ip, { count: 1, reset: now + window })
    return { allowed: true, used: 1 }
  }
  if (entry.count >= GUEST_LIMIT) return { allowed: false, used: entry.count }
  entry.count++
  return { allowed: true, used: entry.count }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const body = await req.json()
    const { messages, contextNote, resumeContext } = body

    // Guest (unauthenticated) path
    if (!user) {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
      const guest = checkGuestLimit(ip)
      if (!guest.allowed) {
        return NextResponse.json({ error: 'limit_reached', used: guest.used, limit: GUEST_LIMIT }, { status: 429 })
      }
      const resumeSection = resumeContext ? `\n\nThe user has uploaded their resume. Here is the extracted text:\n---\n${resumeContext}\n---\nUse this to give specific, personalized feedback. Reference actual content from their resume, not generic advice.` : ''
      const systemPrompt = buildAssessmentSystemPrompt((contextNote ?? '') + resumeSection)
      const anthropicMessages = messages
        .filter((m: { role: string }) => m.role !== 'system')
        .map((m: { role: string; content: string }) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
      while (anthropicMessages.length > 0 && anthropicMessages[0].role === 'assistant') anthropicMessages.shift()
      if (anthropicMessages.length === 0) return NextResponse.json({ error: 'No messages' }, { status: 400 })
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: anthropicMessages,
      })
      const rawContent = response.content[0].type === 'text' ? response.content[0].text : ''
      let assessment = null
      let content = rawContent
      const assessmentMatch = rawContent.match(/\[ASSESSMENT_COMPLETE\]([\s\S]*?)\[\/ASSESSMENT_COMPLETE\]/)
      if (assessmentMatch) {
        try { assessment = JSON.parse(assessmentMatch[1]) } catch {}
        content = rawContent.replace(/\[ASSESSMENT_COMPLETE\][\s\S]*?\[\/ASSESSMENT_COMPLETE\]/, '').trim()
      }
      return NextResponse.json({ content, used: guest.used, limit: GUEST_LIMIT, isPro: false, assessment })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, onboarding_goal, onboarding_situation, onboarding_experience, onboarding_role, last_session_summary, last_session_context, last_session_at')
      .eq('id', user.id)
      .single()

    const isPro = ['pro', 'elite'].includes((profile?.plan ?? '').toLowerCase())
    console.log('[recruiter] plan:', profile?.plan, 'isPro:', isPro)

    const usage = await checkAndIncrementUsage(user.id, 'recruiter', isPro)

    if (!usage.allowed) {
      // Generate personalized upgrade hook from conversation
      let upgradeHook = "You're close to a breakthrough."
      try {
        const recentMessages = messages.slice(-6)
        const hookRes = await client.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 80,
          messages: [{
            role: 'user',
            content: `Based on this conversation, write ONE punchy sentence (max 15 words) that highlights what the user stands to gain by continuing with a career coach. Reference their specific situation if possible. No quotes, no intro, just the sentence.\n\nConversation:\n${recentMessages.map((m: {role: string; content: string}) => `${m.role}: ${m.content}`).join('\n')}`,
          }],
        })
        if (hookRes.content[0].type === 'text') upgradeHook = hookRes.content[0].text.trim()
      } catch { /* best effort */ }

      return NextResponse.json({
        error: 'limit_reached',
        upgradeHook,
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

    // Build session memory context for returning users (free + pro)
    let sessionMemorySection = ''
    if (profile?.last_session_summary && messages.length <= 2) {
      const daysSince = profile.last_session_at
        ? Math.floor((Date.now() - new Date(profile.last_session_at).getTime()) / 86400000)
        : null
      const timeAgo = daysSince === 0 ? 'earlier today' : daysSince === 1 ? 'yesterday' : daysSince ? `${daysSince} days ago` : 'recently'
      sessionMemorySection = `\n\nPREVIOUS SESSION (${timeAgo}):\n${profile.last_session_summary}`
      if (profile.last_session_context) {
        const ctx = profile.last_session_context as Record<string, string>
        if (ctx.role) sessionMemorySection += `\nTheir role: ${ctx.role}`
        if (ctx.goal) sessionMemorySection += `\nTheir goal: ${ctx.goal}`
        if (ctx.salaryTarget) sessionMemorySection += `\nSalary target discussed: ${ctx.salaryTarget}`
      }
      sessionMemorySection += `\n\nReference this context naturally when it's relevant. Don't announce that you remember — just use it. Pick up where you left off if the conversation warrants it.`
    }

    const resumeSection = resumeContext ? `\n\nThe user has uploaded their resume. Here is the extracted text:\n---\n${resumeContext}\n---\nUse this to give specific, personalized feedback. Reference actual content from their resume, not generic advice.` : ''
    const combinedContext = [profileContext, sessionMemorySection, contextNote, resumeSection].filter(Boolean).join('\n\n')
    // Guests get the assessment funnel; logged-in free users get the full conversational coach
    let systemPrompt = buildFreeSystemPrompt(combinedContext)
    let memory: Record<string, string> = {}

    if (isPro) {
      console.log('[recruiter] fetching pro memory...')
      const serviceClient = createServiceClient()
      const { data: memoryData, error: memoryError } = await serviceClient
        .from('sarah_memory')
        .select('context')
        .eq('user_id', user.id)
        .single()

      if (memoryError && memoryError.code !== 'PGRST116') {
        console.log('[recruiter] memory error:', memoryError)
      }
      memory = (memoryData?.context as Record<string, string>) ?? {}
      systemPrompt = buildProSystemPrompt(memory, [profileContext, sessionMemorySection].filter(Boolean).join('\n\n'))
      console.log('[recruiter] pro system prompt built, calling claude...')
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
      model: isPro ? 'claude-opus-4-8' : 'claude-sonnet-4-6',
      max_tokens: isPro ? 4096 : 1024,
      system: systemPrompt,
      messages: anthropicMessages,
    })

    const rawContent = response.content[0].type === 'text' ? response.content[0].text : ''

    // Parse assessment completion signal for free users
    let assessment = null
    let content = rawContent
    if (!isPro) {
      const assessmentMatch = rawContent.match(/\[ASSESSMENT_COMPLETE\]([\s\S]*?)\[\/ASSESSMENT_COMPLETE\]/)
      if (assessmentMatch) {
        try {
          assessment = JSON.parse(assessmentMatch[1])
        } catch {}
        content = rawContent.replace(/\[ASSESSMENT_COMPLETE\][\s\S]*?\[\/ASSESSMENT_COMPLETE\]/, '').trim()
      }
    }

    if (isPro && messages.length % 4 === 0) {
      extractAndSaveMemory(user.id, messages, memory)
    }

    return NextResponse.json({ content, used: usage.used, limit: usage.limit, isPro, assessment })
  } catch (err) {
    console.error('[recruiter] error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
