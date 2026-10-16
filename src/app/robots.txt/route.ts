export function GET() {
  const body = `User-agent: *
Allow: /
Allow: /blog/
Allow: /salary-negotiation
Allow: /how-to-ask-for-a-raise
Allow: /salary-calculator
Allow: /ai-career-coach
Allow: /compensation-analyzer
Allow: /raise-calculator
Allow: /llms.txt
Disallow: /dashboard
Disallow: /tools/
Disallow: /account
Disallow: /progress
Disallow: /onboarding
Disallow: /api/

# AI training crawlers — disallow
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

# AI search crawlers — allow (these surface citations, not training)
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_APP_URL || 'https://gethayven.com'}/sitemap.xml`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
