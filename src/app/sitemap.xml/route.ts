export function GET() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://gethayven.com'
  const urls = [
    { loc: base, priority: '1.0' },
    { loc: `${base}/compensation-analyzer`, priority: '0.7' },
    { loc: `${base}/offer-evaluator`, priority: '0.7' },
    { loc: `${base}/counter-offer-builder`, priority: '0.7' },
    { loc: `${base}/equity-calculator`, priority: '0.7' },
    { loc: `${base}/negotiation-simulator`, priority: '0.7' },
    { loc: `${base}/interview-salary-coach`, priority: '0.7' },
    { loc: `${base}/raise-request-builder`, priority: '0.7' },
    { loc: `${base}/objection-handler`, priority: '0.7' },
    { loc: `${base}/negotiation-playbook`, priority: '0.7' },
    { loc: `${base}/resume-builder`, priority: '0.7' },
    { loc: `${base}/job-tracker`, priority: '0.7' },
    { loc: `${base}/blog/how-to-negotiate-saas-job-offer`, priority: '0.8' },
    { loc: `${base}/blog/recruiter-types-and-how-to-handle`, priority: '0.8' },
    { loc: `${base}/blog/why-professionals-leave-money-on-table`, priority: '0.8' },
    { loc: `${base}/blog/what-your-equity-is-actually-worth`, priority: '0.8' },
    { loc: `${base}/blog/what-to-say-when-recruiter-asks-current-salary`, priority: '0.8' },
    { loc: `${base}/blog/how-to-negotiate-remote-job-offer`, priority: '0.8' },
    { loc: `${base}/blog/average-software-engineer-salary-by-city`, priority: '0.8' },
    { loc: `${base}/blog/how-to-ask-for-a-raise-scripts-that-work`, priority: '0.8' },
    { loc: `${base}/blog/how-to-evaluate-a-job-offer`, priority: '0.8' },
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
