export function GET() {
  const body = `User-agent: *
Disallow: /api/
Disallow: /dashboard
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
Disallow: /tools/comp-analyzer
Disallow: /tools/offer-evaluator
Disallow: /tools/equity-calc
Disallow: /tools/cost-calculator
Disallow: /tools/playbook
Disallow: /tools/counter-offer
Disallow: /tools/objections
Disallow: /tools/raise-builder
Disallow: /tools/simulator
Disallow: /tools/interview-coach
Disallow: /tools/annual-review
Disallow: /tools/promotion-planner
Disallow: /tools/competing-offer
Disallow: /tools/career-timeline
Disallow: /tools/cover-letter

Sitemap: https://gethayven.com/sitemap.xml`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
