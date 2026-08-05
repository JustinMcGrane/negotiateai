import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const EARLY_ACCESS_LIMIT = 1000

export async function GET() {
  const supabase = createServiceClient()
  const { count } = await supabase
    .from('early_access')
    .select('*', { count: 'exact', head: true })
  return NextResponse.json({ count: count ?? 0, limit: EARLY_ACCESS_LIMIT, full: (count ?? 0) >= EARLY_ACCESS_LIMIT })
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const supabase = createServiceClient()

    // Check if we've hit the limit
    const { count } = await supabase
      .from('early_access')
      .select('*', { count: 'exact', head: true })

    if ((count ?? 0) >= EARLY_ACCESS_LIMIT) {
      return NextResponse.json({ error: 'sold_out' }, { status: 410 })
    }

    // Check for duplicate
    const { data: existing } = await supabase
      .from('early_access')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (!existing) {
      await supabase.from('early_access').insert({ email })
    }

    // Subscribe to Beehiiv
    const beehiivKey = process.env.BEEHIIV_API_KEY
    const pubId = process.env.BEEHIIV_PUBLICATION_ID
    if (beehiivKey && pubId) {
      await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${beehiivKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: false,
          utm_source: 'homepage',
          utm_medium: 'early_access',
        }),
      })
    }

    // Send welcome email via Resend
    const resendKey = process.env.RESEND_API_KEY
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gethayven.com'
    let resendResult: { status: number; body: unknown } | null = null

    if (resendKey) {
      const html = `
        <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #fafafa;">
          <div style="background: #141414; width: 40px; height: 40px; border-radius: 10px; margin-bottom: 24px; display: flex; align-items: center; justify-content: center;">
            <span style="color: #fff; font-size: 18px; font-weight: 700;">H</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.02em;">You're locked in at $40/month — forever.</h1>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
            You've claimed your early access rate. Once you activate, you'll pay $40/month for Hayven Pro — locked in for life, even when the price goes up to $49.
          </p>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
            Click below to create your account and activate your rate.
          </p>
          <a href="${appUrl}/signup?early=1" style="display: inline-block; background: #141414; color: #fff; text-decoration: none; padding: 13px 28px; border-radius: 9px; font-weight: 700; font-size: 15px; margin-bottom: 32px;">Activate my $40/month rate →</a>
          <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin: 0;">
            You signed up for early access to Hayven. <a href="${appUrl}/unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
          </p>
        </div>
      `

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Hayven <hello@gethayven.com>',
          to: email,
          subject: "You're locked in at $40/month — forever",
          html,
        }),
      })
      const resendBody = await resendRes.json()
      resendResult = { status: resendRes.status, body: resendBody }
      console.error('Resend response:', resendRes.status, JSON.stringify(resendBody))
    }

    return NextResponse.json({ ok: true, spot: (count ?? 0) + 1, hasResendKey: !!resendKey, resend: resendResult })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
