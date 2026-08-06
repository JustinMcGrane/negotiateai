export function GET() {
  const body = `User-agent: *
Allow: /
Allow: /blog/
Disallow: /dashboard
Disallow: /tools/
Disallow: /account
Disallow: /progress
Disallow: /jobs
Disallow: /resume
Disallow: /goals
Disallow: /team
Disallow: /development
Disallow: /tasks
Disallow: /report
Disallow: /tracker
Disallow: /settings
Disallow: /roleplay
Disallow: /payments
Disallow: /brand-deals
Disallow: /live-coach
Disallow: /calendar
Disallow: /recruiter
Disallow: /api/
Sitemap: https://gethayven.com/sitemap.xml`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
