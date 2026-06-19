import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, name, workspaceName, inviterName } = await req.json()

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #F7F6F2;">
        <div style="background: #6558D3; width: 48px; height: 48px; border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <div style="color: white; font-size: 20px; font-weight: 700; font-family: Georgia, serif; line-height: 48px; text-align: center; width: 48px;">R</div>
        </div>
        <h1 style="font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #1E1B3A; margin: 0 0 8px;">${inviterName} invited you to ${workspaceName}</h1>
        <p style="color: #54516E; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">You've been added to the ${workspaceName} workspace on Roster — a creator team management tool for tasks, content, and payments.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.tryroster.ai'}/signup" style="display: inline-block; background: #6558D3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; margin-bottom: 24px;">Accept invite →</a>
        <p style="color: #9B94C4; font-size: 12px; margin: 0;">If you weren't expecting this invite, you can ignore this email.</p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Roster <noreply@tryroster.ai>',
        to: email,
        subject: `${inviterName} invited you to ${workspaceName} on Roster`,
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
