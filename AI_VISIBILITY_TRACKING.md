# Hayven — AI Search Visibility Tracking Plan

A practical measurement plan for tracking Hayven's visibility in AI-powered search and generative engine results.

---

## 1. Google Search Console (AI Overviews)

**What to track:**
- Enable performance reports filtered by query type
- Monitor impressions and clicks for AI Overview–triggered queries
- Key queries to watch: "how to negotiate salary", "how to ask for a raise", "am i underpaid", "ai career coach", "salary calculator"

**How to find AI Overview data:**
- GSC Performance report → filter by Search Type → Web
- Look for queries with high impressions but below-average CTR (AI Overviews suppress clicks even when Hayven is cited)
- Check for structured data eligibility warnings in the Enhancements section

**Cadence:** Weekly review of top 20 queries by impression.

---

## 2. Bing Webmaster Tools

**What to track:**
- Index coverage for all new pages (salary-negotiation, how-to-ask-for-a-raise, ai-career-coach, salary-calculator, resource pages)
- Bing Chat / Copilot citation opportunities — check Bing's Search Performance for queries with AI attribution
- Submit updated sitemap.xml after new page launches

**Cadence:** Bi-weekly index check; monthly performance review.

---

## 3. PostHog — AI Referral Traffic Tracking

**What to instrument:**
Track referrer headers for sessions originating from AI-powered search and chat products.

Add the following to PostHog event capture or page view tracking:

```javascript
// In your analytics initialization
const aiReferrers = [
  'perplexity.ai',
  'chatgpt.com',
  'copilot.microsoft.com',
  'bing.com/search',
  'you.com',
  'phind.com',
]

const referrer = document.referrer
const isAiReferral = aiReferrers.some(r => referrer.includes(r))

posthog.capture('$pageview', {
  is_ai_referral: isAiReferral,
  ai_referral_source: isAiReferral
    ? aiReferrers.find(r => referrer.includes(r))
    : null,
})
```

**Key metrics to track separately for AI referrals:**
- Sessions from AI referral sources
- Signup rate from AI referral sessions (conversion)
- Pages visited by AI referral traffic
- Paid conversions (trial starts, Pro upgrades) from AI referral sessions

**Dashboard to build:** AI Referral Funnel — sessions → signups → paid conversions, segmented by source (Perplexity vs ChatGPT vs Copilot).

---

## 4. Manual Recurring Review (Weekly)

Each week, manually run the following queries in each AI platform and document whether Hayven appears, how it appears, and what it says:

### Queries to test weekly:

| Query | Platform(s) |
|---|---|
| how to negotiate salary | ChatGPT, Perplexity, Google AI Mode |
| how to ask for a raise | ChatGPT, Perplexity, Google AI Mode |
| am i underpaid | ChatGPT, Perplexity |
| ai career coach | ChatGPT, Perplexity, Google AI Mode |
| salary negotiation scripts | Perplexity, Google AI Mode |
| salary negotiation email template | Perplexity, Google AI Mode |
| best salary negotiation tool | ChatGPT, Perplexity |

### What to document for each result:
- Does Hayven appear in the AI response?
- Is Hayven cited as a source link?
- What does the AI say about Hayven (if anything)?
- Are competitors cited instead? (which ones?)

**Format:** Keep a running log in Notion, Linear, or a shared spreadsheet. Assign ownership to one person.

---

## 5. Metrics to Track (Separately from Organic SEO)

| Metric | Definition | Source |
|---|---|---|
| AI citations | # of times Hayven appears in AI-generated answers | Manual review |
| AI referral sessions | Sessions where referrer = AI platform | PostHog |
| AI referral signups | Signups from AI referral sessions | PostHog |
| AI referral conversion rate | AI signups / AI sessions | PostHog |
| Paid conversions from AI | Pro/Professional upgrades from AI referral sessions | PostHog + Stripe |
| GSC AI Overview impressions | Estimated impressions from AI Overview results | Google Search Console |

---

## 6. Signals That Indicate AI Visibility Is Improving

- AI systems cite Hayven by name in responses to salary negotiation queries
- Perplexity and ChatGPT include gethayven.com as a source link
- Referral traffic from perplexity.ai, chatgpt.com, and copilot.microsoft.com appears in PostHog
- Google Search Console shows impressions for AI Overview queries where Hayven ranks

---

## 7. Quick-Win Actions to Improve AI Visibility

1. **Ensure all key content is in server-rendered HTML** (not JS-loaded) — AI crawlers often can't execute JavaScript
2. **Add concise direct answers at the top of each page** — AI systems prefer pages that answer the question clearly and immediately
3. **Keep llms.txt current** — update when new features or pages launch
4. **Submit sitemap.xml to both Google and Bing** after new page launches
5. **Monitor for structured data errors** in GSC — FAQPage and Article schema improve AI Overview inclusion
