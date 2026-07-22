import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, name, workspaceName, inviterName } = await req.json()

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://negotiateai.com'
    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #f9fafb;">
        <div style="background: #141414; width: 48px; height: 48px; border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <div style="color: white; font-size: 20px; font-weight: 700; line-height: 48px; text-align: center; width: 48px;">N</div>
        </div>
        <h1 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 8px;">${inviterName} invited you to join Hayven</h1>
        <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">You've been invited by ${inviterName} to Hayven — the compensation platform that helps you know your market rate, build your strategy, and negotiate with confidence.</p>
        <a href="${appUrl}/signup" style="display: inline-block; background: #141414; color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; margin-bottom: 24px;">Accept invite →</a>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">If you weren't expecting this invite, you can ignore this email.</p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? 'Hayven <hello@negotiateai.com>',
        to: email,
        subject: `${inviterName} invited you to Hayven`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Invite route error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
