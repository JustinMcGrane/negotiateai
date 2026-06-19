export function GET() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://negotiateai.com'
  const urls = [
    { loc: base, priority: '1.0' },
    { loc: `${base}/blog/how-to-negotiate-saas-job-offer`, priority: '0.8' },
    { loc: `${base}/blog/recruiter-types-and-how-to-handle`, priority: '0.8' },
    { loc: `${base}/blog/why-professionals-leave-money-on-table`, priority: '0.8' },
    { loc: `${base}/blog/what-your-equity-is-actually-worth`, priority: '0.8' },
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
