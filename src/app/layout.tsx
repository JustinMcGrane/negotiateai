import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NegotiateAI — The compensation platform that pays for itself',
  description: "Know your market rate. Build your strategy. Practice until you're ready.",
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
