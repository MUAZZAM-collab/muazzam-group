# Technical SEO Report (auto-generated)

## AI Crawlability & Bot Access (AEO Parameter 7)
robots.txt now explicitly allows: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Claude-Web, Google-Extended, PerplexityBot, Perplexity-User, CCBot, Amazonbot, Bytespider, Applebot-Extended.
Verify none of these are blocked elsewhere (CDN/WAF rules, Cloudflare bot-fight mode, etc.) —
robots.txt only controls what your own server declares, not upstream network-level blocks.

## AI Rendering & Content Accessibility (AEO Parameter 8)
No client components detected among the mapped pages — content should be present
in the initial server-rendered HTML.

## AI Discoverability (AEO Parameter 10)
llms.txt and sitemap.xml/sitemap.js are generated. Orphan-page check (pages with
zero detected internal links pointing to them, from your CSV's `internal_links` column):
None found — every page has at least one internal link (or the CSV didn't report this column).

## HTTPS / mobile viewport / canonical (from CSV)

| URL | HTTPS | Notes |
|---|---|---|
| https://muazzam-group.vercel.app/services/property-construction | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/technology | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/contact?division= | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/school-investment | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/ | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/tailoring | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/divisions | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/education | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/legal-consultancy | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/catering | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/wholesale | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/ | ✅ | no canonical tag |
| https://muazzam-group.vercel.app/services/events-media | ✅ | no canonical tag |

## Still to check manually / with a live tool
- Core Web Vitals (LCP, CLS, INP) — run PageSpeed Insights per URL
- Page speed — run Lighthouse in CI
- 404 / 5xx status codes — run a live crawler (e.g. Screaming Frog) post-deploy
- JS rendering — verify with 'view source' vs rendered DOM (App Router SSR helps here)
- Mobile technical SEO — confirm responsive breakpoints render correctly
