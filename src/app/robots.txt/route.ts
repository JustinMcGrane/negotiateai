export function GET() {
  const body = `User-agent: *
Allow: /
Allow: /blog/
Disallow: /dashboard
Disallow: /tools/
Disallow: /account
Disallow: /progress
Sitemap: ${process.env.NEXT_PUBLIC_APP_URL || 'https://negotiateai.com'}/sitemap.xml`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
