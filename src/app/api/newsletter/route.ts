import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    // Send welcome email with trial link via Resend
    const key = process.env.RESEND_API_KEY
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://negotiateai.com'

    if (key) {
      const html = `
        <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #fafafa;">
          <div style="background: #141414; width: 40px; height: 40px; border-radius: 10px; margin-bottom: 24px;">
            <span style="color: #fff; font-size: 18px; font-weight: 700; line-height: 40px; text-align: center; display: block;">N</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.02em;">Your 30-day Pro trial is ready 🎉</h1>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            Welcome to The Salary Letter. Every week you'll get market rate data for your role, negotiation tactics, and the career moves worth making.
          </p>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
            To activate your free 30-day Pro trial, create your account below. No credit card required.
          </p>
          <a href="${appUrl}/signup?trial=30" style="display: inline-block; background: #141414; color: #fff; text-decoration: none; padding: 13px 28px; border-radius: 9px; font-weight: 700; font-size: 15px; margin-bottom: 32px;">Activate my free 30-day trial →</a>
          <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin: 0;">
            You subscribed to The Salary Letter by NegotiateAI.
            <a href="${appUrl}/unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
          </p>
        </div>
      `

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'NegotiateAI <hello@negotiateai.com>',
          to: email,
          subject: 'Your 30-day Pro trial is ready 🎉',
          html,
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
