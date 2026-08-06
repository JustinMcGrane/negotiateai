import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Hayven',
  description: 'Terms of Service for Hayven.',
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', padding: '60px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Link href="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none', display: 'block', marginBottom: 40 }}>← Back to Hayven</Link>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 48 }}>Last updated: August 6, 2026</p>

        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: 16 }}>By accessing or using Hayven ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>2. Description of Service</h2>
          <p style={{ marginBottom: 16 }}>Hayven provides AI-powered career tools including salary analysis, negotiation coaching, resume building, and job tracking. The Service is intended for personal, non-commercial use.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>3. Accounts</h2>
          <p style={{ marginBottom: 16 }}>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account and all activity that occurs under it.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>4. Payments and Subscriptions</h2>
          <p style={{ marginBottom: 16 }}>Paid plans are billed on a monthly basis. You may cancel at any time. Cancellations take effect at the end of the current billing period. We do not offer refunds for partial months.</p>
          <p style={{ marginBottom: 16 }}>Early access members who signed up at $40/month will retain that rate for as long as their subscription remains active and in good standing.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>5. Acceptable Use</h2>
          <p style={{ marginBottom: 16 }}>You agree not to misuse the Service, including but not limited to: attempting to reverse engineer the Service, using automated tools to scrape content, or using the Service for any unlawful purpose.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>6. AI-Generated Content</h2>
          <p style={{ marginBottom: 16 }}>The Service uses AI to generate salary estimates, negotiation scripts, and career advice. This content is for informational purposes only and does not constitute professional financial, legal, or career advice. Results may vary.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>7. Intellectual Property</h2>
          <p style={{ marginBottom: 16 }}>All content, features, and functionality of the Service are owned by Hayven and protected by applicable intellectual property laws.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>8. Limitation of Liability</h2>
          <p style={{ marginBottom: 16 }}>To the maximum extent permitted by law, Hayven shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>9. Changes to Terms</h2>
          <p style={{ marginBottom: 16 }}>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 12, marginTop: 40 }}>10. Contact</h2>
          <p style={{ marginBottom: 16 }}>For questions about these Terms, contact us at <a href="mailto:hello@gethayven.com" style={{ color: '#4169E1' }}>hello@gethayven.com</a>.</p>
        </div>
      </div>
    </div>
  )
}
