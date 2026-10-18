import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const maxDuration = 30

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) }

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { messages, sendEmail } = await req.json()
    if (!messages?.length) return NextResponse.json({ error: 'No messages' }, { status: 400 })

    const transcript = messages
      .filter((m: { role: string }) => m.role !== 'system')
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'Sarah'}: ${m.content}`)
      .join('\n\n')

    const msg = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      messages: [{
        role: 'user',
        content: `Summarize this career coaching conversation. Return ONLY valid JSON.

CONVERSATION:
${transcript.slice(0, 8000)}

Return:
{
  "summary": "<2-3 sentence summary of what was discussed>",
  "keyInsights": ["<insight 1>", "<insight 2>", "<insight 3>"],
  "actionItems": ["<specific action 1>", "<specific action 2>", "<specific action 3>"],
  "context": {
    "role": "<user's role if mentioned or null>",
    "goal": "<user's main goal if mentioned or null>",
    "salaryTarget": "<salary target if mentioned or null>"
  }
}`,
      }],
    })

    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON')
    const summary = JSON.parse(match[0])

    // Save summary to profiles for memory continuity
    const svc = createServiceClient()
    await svc.from('profiles').update({
      last_session_summary: summary.summary,
      last_session_context: summary.context,
      last_session_at: new Date().toISOString(),
    }).eq('id', user.id)

    // Send email follow-up if requested
    if (sendEmail) {
      const { data: profile } = await svc.from('profiles').select('email, full_name').eq('id', user.id).single()
      const resendKey = process.env.RESEND_API_KEY
      if (resendKey && profile?.email) {
        const name = profile.full_name?.split(' ')[0] ?? 'there'
        const actionItemsHtml = summary.actionItems
          .map((item: string) => `<li style="margin:0 0 8px;font-size:15px;color:#334155;line-height:1.6;">${item}</li>`)
          .join('')
        const insightsHtml = summary.keyInsights
          .map((item: string) => `<li style="margin:0 0 8px;font-size:15px;color:#334155;line-height:1.6;">${item}</li>`)
          .join('')

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Sarah at Hayven <sarah@gethayven.com>',
            to: profile.email,
            subject: `Your coaching session summary`,
            html: `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#fff;">
  <img src="https://gethayven.com/logo-dark.svg" alt="Hayven" style="height:28px;margin-bottom:32px;" />
  <p style="font-size:16px;color:#0f172a;margin:0 0 8px;font-weight:600;">Hey ${name},</p>
  <p style="font-size:15px;color:#475569;margin:0 0 24px;line-height:1.7;">Here's a summary of what we covered in your coaching session today.</p>

  <div style="background:#f8fafc;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
    <p style="font-size:13px;font-weight:600;color:#94a3b8;letter-spacing:.05em;text-transform:uppercase;margin:0 0 10px;">Session Summary</p>
    <p style="font-size:15px;color:#334155;line-height:1.7;margin:0;">${summary.summary}</p>
  </div>

  <div style="margin-bottom:24px;">
    <p style="font-size:13px;font-weight:600;color:#94a3b8;letter-spacing:.05em;text-transform:uppercase;margin:0 0 12px;">Your Action Items</p>
    <ul style="margin:0;padding:0 0 0 20px;">${actionItemsHtml}</ul>
  </div>

  <div style="margin-bottom:32px;">
    <p style="font-size:13px;font-weight:600;color:#94a3b8;letter-spacing:.05em;text-transform:uppercase;margin:0 0 12px;">Key Insights</p>
    <ul style="margin:0;padding:0 0 0 20px;">${insightsHtml}</ul>
  </div>

  <a href="https://gethayven.com/dashboard" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:600;">Continue with Sarah →</a>

  <p style="font-size:12px;color:#94a3b8;margin-top:32px;line-height:1.6;">Hayven · <a href="https://gethayven.com/unsubscribe" style="color:#94a3b8;">Unsubscribe</a></p>
</div>`,
          }),
        })
      }
    }

    return NextResponse.json({ summary })
  } catch (e) {
    console.error('[session-summary]', e)
    return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 })
  }
}
