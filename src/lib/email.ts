import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'NegotiateAI <hello@negotiateai.com>'

export async function sendCheckinReminder(to: string, firstName: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Your quarterly check-in with Sarah is ready',
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #0f172a;">
        <p style="font-size: 16px; font-weight: 600; margin: 0 0 16px;">Hi ${firstName},</p>
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px; color: #475569;">
          It has been 90 days since your last check-in with Sarah. A lot can change in three months — new roles, new offers, shifting market rates.
        </p>
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px; color: #475569;">
          Sarah is ready to reassess where you stand and tell you what has changed in your market.
        </p>
        <a href="https://negotiateai.com/recruiter?checkin=true" style="display: inline-block; background: #141414; color: #fff; padding: 12px 24px; border-radius: 9px; font-size: 14px; font-weight: 600; text-decoration: none;">
          Start your check-in →
        </a>
        <p style="font-size: 13px; color: #94a3b8; margin: 32px 0 0;">
          You are receiving this because you are a NegotiateAI member. <a href="https://negotiateai.com/settings" style="color: #94a3b8;">Manage preferences</a>
        </p>
      </div>
    `,
  })
}

export async function sendMarketAlert(to: string, firstName: string, role: string, alert: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Market update for ${role}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #0f172a;">
        <p style="font-size: 16px; font-weight: 600; margin: 0 0 16px;">Hi ${firstName},</p>
        <p style="font-size: 14px; font-weight: 600; color: #6366f1; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">Market update · ${role}</p>
        <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
          <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #334155;">${alert}</p>
        </div>
        <a href="https://negotiateai.com/dashboard" style="display: inline-block; background: #141414; color: #fff; padding: 12px 24px; border-radius: 9px; font-size: 14px; font-weight: 600; text-decoration: none;">
          View your dashboard →
        </a>
        <p style="font-size: 13px; color: #94a3b8; margin: 32px 0 0;">
          You are receiving this because you have market alerts enabled. <a href="https://negotiateai.com/settings" style="color: #94a3b8;">Manage preferences</a>
        </p>
      </div>
    `,
  })
}
