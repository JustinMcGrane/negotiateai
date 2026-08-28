export function GET() {
  const body = `User-agent: *
Allow: /
Allow: /blog/
Allow: /resume-builder
Allow: /resume-skills
Allow: /raise-calculator
Allow: /salary-to-hourly-calculator
Allow: /paycheck-calculator
Allow: /equity-calculator
Allow: /compensation-analyzer
Allow: /counter-offer-builder
Allow: /offer-evaluator
Allow: /objection-handler
Allow: /raise-request-builder
Allow: /negotiation-playbook
Allow: /negotiation-simulator
Allow: /interview-salary-coach
Allow: /job-tracker
Allow: /ai-career-coach
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
