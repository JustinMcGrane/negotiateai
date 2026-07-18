import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { ROLEPLAY_CHARACTERS } from '@/lib/roleplay-characters'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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

    const plan = profile?.plan
    const isPro = plan === 'pro' || plan === 'elite'
    if (!isPro) {
      return NextResponse.json({ error: 'pro_required', message: 'Roleplay is a Pro feature. Upgrade to practice with realistic characters.' }, { status: 403 })
    }

    const { characterId, messages, scenario } = await req.json()

    const character = ROLEPLAY_CHARACTERS.find(c => c.id === characterId)
    if (!character) {
      return NextResponse.json({ error: 'Unknown character' }, { status: 400 })
    }

    const systemPrompt = character.buildSystemPrompt(scenario)

    const anthropicMessages = messages
      .filter((m: { role: string }) => m.role !== 'system')
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

    while (anthropicMessages.length > 0 && anthropicMessages[0].role === 'assistant') {
      anthropicMessages.shift()
    }

    if (anthropicMessages.length === 0) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-opus-4-8-20251101',
      max_tokens: 300,
      system: systemPrompt,
      messages: anthropicMessages,
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ content })
  } catch (err) {
    console.error('[roleplay] error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
