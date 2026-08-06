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
    if (resendKey) {
      const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Early access confirmed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="padding:32px 40px 0;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#0f172a;letter-spacing:-0.02em;">Hayven</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:28px 40px 32px;">
          <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0f172a;line-height:1.3;letter-spacing:-0.02em;">Your early access spot is confirmed.</h1>
          <p style="margin:0 0 12px;font-size:15px;color:#475569;line-height:1.7;">You're one of the first 1,000 members to sign up for Hayven Pro at $40/month — $9 less than the regular price.</p>
          <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.7;">Click the button below to create your account and activate your rate.</p>
          <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:#141414;">
            <a href="${appUrl}/signup?early=1" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">Create your account</a>
          </td></tr></table>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;"></td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;">
          <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">You received this because you signed up for early access at gethayven.com. <a href="${appUrl}/unsubscribe" style="color:#94a3b8;text-decoration:underline;">Unsubscribe</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Hayven <hello@gethayven.com>',
          to: email,
          subject: "Your early access spot is confirmed",
          html,
        }),
      })
      await resendRes.json()
    }

    return NextResponse.json({ ok: true, spot: (count ?? 0) + 1 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
