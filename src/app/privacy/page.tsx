import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy — Hayven',
  description: 'How Hayven collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}><Image src="/logo.svg" alt="Hayven" width={160} height={44} style={{ objectFit: 'contain' }} priority /></Link>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b', textDecoration: 'none', marginBottom: 40 }}>
          <ArrowLeft size={14} /> Back to Hayven
        </Link>

        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 48 }}>Last updated: July 19, 2026</p>

        {[
          {
            title: '1. Information We Collect',
            body: `We collect information you provide directly — such as your name, email address, and any content you enter while using Hayven's tools. We also collect usage data (pages visited, features used, session duration) to improve the product. If you choose to accept cookies, we may also receive data through third-party tracking tools such as Meta Pixel and Google Ads tags.`,
          },
          {
            title: '2. How We Use Your Information',
            body: `We use your information to provide and improve Hayven's services, send you product updates and support messages, process payments, and measure marketing performance. We do not sell your personal information to third parties.`,
          },
          {
            title: '3. Cookies and Tracking',
            body: `We use cookies to keep you signed in and to understand how visitors use our site. With your consent, we also use Meta Pixel and Google Ads tags to measure the effectiveness of our advertising. You can decline tracking at any time via the cookie banner or by clearing your browser's local storage. Declining does not affect your ability to use Hayven.`,
          },
          {
            title: '4. Data Sharing',
            body: `We share data with service providers who help us operate Hayven — including Supabase (database), Stripe (payments), and Anthropic (AI). These providers process data only as needed to deliver their services and are bound by their own privacy policies. We may disclose information if required by law.`,
          },
          {
            title: '5. Data Retention',
            body: `We retain your account data for as long as your account is active. You may request deletion of your account and associated data at any time by emailing us at GetHayven@gmail.com.`,
          },
          {
            title: '6. Security',
            body: `We use industry-standard measures to protect your data, including encrypted connections (HTTPS) and access controls. No system is perfectly secure, and we cannot guarantee absolute security.`,
          },
          {
            title: '7. Your Rights',
            body: `Depending on your location, you may have the right to access, correct, or delete your personal data, or to opt out of certain processing. To exercise these rights, contact us at GetHayven@gmail.com.`,
          },
          {
            title: '8. Children',
            body: `Hayven is not directed at children under 13. We do not knowingly collect personal information from anyone under 13.`,
          },
          {
            title: '9. Changes to This Policy',
            body: `We may update this policy from time to time. When we do, we'll update the date at the top of this page. Continued use of Hayven after changes constitutes acceptance of the updated policy.`,
          },
          {
            title: '10. Contact',
            body: `Questions about this policy? Email us at GetHayven@gmail.com.`,
          },
        ].map(({ title, body }) => (
          <section key={title} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, margin: 0 }}>{body}</p>
          </section>
        ))}
      </main>

      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', display: 'flex', justifyContent: 'center', gap: 24 }}>
        {[{ href: '/login', label: 'Sign in' }, { href: '/signup', label: 'Sign up' }].map(({ href, label }) => (
          <Link key={href} href={href} prefetch={true} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{label}</Link>
        ))}
      </footer>
    </div>
  )
}
