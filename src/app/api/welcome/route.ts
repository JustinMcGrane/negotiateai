import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) return NextResponse.json({ ok: true })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gethayven.com'
    const firstName = name?.split(' ')[0] || 'there'

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Welcome to Hayven</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">

        <!-- Logo -->
        <tr><td style="padding:0 0 24px;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#0f172a;letter-spacing:-0.03em;">Hayven</p>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:40px 40px 32px;">

          <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;line-height:1.3;letter-spacing:-0.02em;">Welcome to Hayven, ${firstName}.</h1>

          <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.75;">Your account is live. Hayven gives you everything you need to understand what you're worth, negotiate confidently, and grow your career.</p>

          <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.75;">Here's where to start:</p>

          <!-- Steps -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td style="padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:8px;">
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="width:32px;font-size:18px;vertical-align:top;padding-top:1px;">💰</td>
                    <td>
                      <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0f172a;">Check your market value</p>
                      <p style="margin:0;font-size:13px;color:#64748b;">See what you should actually be earning based on your role and location.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="height:8px;"></td></tr>
            <tr>
              <td style="padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="width:32px;font-size:18px;vertical-align:top;padding-top:1px;">🎯</td>
                    <td>
                      <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0f172a;">Run the negotiation simulator</p>
                      <p style="margin:0;font-size:13px;color:#64748b;">Practice your negotiation against an AI coach before the real conversation.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="height:8px;"></td></tr>
            <tr>
              <td style="padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="width:32px;font-size:18px;vertical-align:top;padding-top:1px;">📄</td>
                    <td>
                      <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0f172a;">Build your resume</p>
                      <p style="margin:0;font-size:13px;color:#64748b;">Create a resume that positions you for the salary you want.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0">
            <tr><td style="border-radius:8px;background:#0f172a;">
              <a href="${appUrl}/dashboard" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.01em;">Go to your dashboard →</a>
            </td></tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0 24px;">
            <tr><td style="border-top:1px solid #f1f5f9;"></td></tr>
          </table>

          <p style="margin:0;font-size:14px;color:#475569;line-height:1.7;">Questions? Reply to this email or reach us at <a href="mailto:hello@gethayven.com" style="color:#4169E1;text-decoration:none;">hello@gethayven.com</a>.</p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">You received this because you created an account at <a href="https://gethayven.com" style="color:#94a3b8;text-decoration:none;">gethayven.com</a>. &nbsp;<a href="${appUrl}/unsubscribe" style="color:#94a3b8;text-decoration:underline;">Unsubscribe</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Justin from Hayven <hello@gethayven.com>',
        to: email,
        subject: `Welcome to Hayven, ${firstName} 👋`,
        html,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[welcome]', e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
