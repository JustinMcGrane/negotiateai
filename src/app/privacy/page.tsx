import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Hayven',
  description: 'Privacy Policy for Hayven.',
}

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', padding: '60px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Link href="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none', display: 'block', marginBottom: 40 }}>← Back to Hayven</Link>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 48 }}>Last updated: August 6, 2026</p>

        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>1. Information We Collect</h2>
          <p style={{ marginBottom: 16 }}>We collect information you provide directly, including your email address, name, job title, salary information, and career details you enter into the Service. We also collect usage data such as which tools you use and when.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: 16 }}>We use your information to:</p>
          <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li style={{ marginBottom: 8 }}>Provide and improve the Service</li>
            <li style={{ marginBottom: 8 }}>Generate personalized salary analysis and career recommendations</li>
            <li style={{ marginBottom: 8 }}>Send transactional emails related to your account</li>
            <li style={{ marginBottom: 8 }}>Send product updates and tips (you can opt out at any time)</li>
            <li style={{ marginBottom: 8 }}>Process payments</li>
          </ul>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>3. Data Storage</h2>
          <p style={{ marginBottom: 16 }}>Your data is stored securely using Supabase (PostgreSQL). Salary and career data you enter is used solely to power your experience on the platform and is not sold to third parties.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>4. Third-Party Services</h2>
          <p style={{ marginBottom: 16 }}>We use the following third-party services:</p>
          <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li style={{ marginBottom: 8 }}><strong>Stripe</strong> — payment processing</li>
            <li style={{ marginBottom: 8 }}><strong>Resend</strong> — transactional email</li>
            <li style={{ marginBottom: 8 }}><strong>Anthropic</strong> — AI analysis and recommendations</li>
            <li style={{ marginBottom: 8 }}><strong>Vercel</strong> — hosting and infrastructure</li>
          </ul>
          <p style={{ marginBottom: 16 }}>Each of these services has its own privacy policy governing their use of your data.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>5. Cookies</h2>
          <p style={{ marginBottom: 16 }}>We use cookies solely for authentication purposes (to keep you logged in). We do not use tracking or advertising cookies.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>6. Your Rights</h2>
          <p style={{ marginBottom: 16 }}>You may request deletion of your account and associated data at any time by emailing <a href="mailto:hello@gethayven.com" style={{ color: '#4169E1' }}>hello@gethayven.com</a>. We will process deletion requests within 30 days.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>7. Data Retention</h2>
          <p style={{ marginBottom: 16 }}>We retain your data for as long as your account is active. If you delete your account, your data is removed within 30 days.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>8. Children's Privacy</h2>
          <p style={{ marginBottom: 16 }}>The Service is not directed to children under 13. We do not knowingly collect information from children under 13.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>9. Changes to This Policy</h2>
          <p style={{ marginBottom: 16 }}>We may update this Privacy Policy from time to time. We will notify you of significant changes via email.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>10. Contact</h2>
          <p style={{ marginBottom: 16 }}>For privacy questions, contact us at <a href="mailto:hello@gethayven.com" style={{ color: '#4169E1' }}>hello@gethayven.com</a>.</p>
        </div>
      </div>
    </div>
  )
}
