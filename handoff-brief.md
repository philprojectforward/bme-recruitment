# Build Brief — BME Recruitment Ltd

## Client Info

| Field | Value |
|-------|-------|
| Business name | BME Recruitment Ltd |
| Owner | Matthew Bell |
| Industry | Construction recruitment — M&E specialists |
| Location | Leeds, UK (UK-wide coverage) |
| Phone | 0113 733 6301 |
| Email | matthew@bme-recruitment.com |
| Domain | bme-recruitment.com (currently Microsoft 365, no website) |
| LinkedIn | linkedin.com/company/bme-recruitment-ltd |
| Company size | 2-10 employees |

## What to Build

- Static HTML/CSS/JS website (no frameworks)
- Single page with smooth scroll sections
- Mobile-first, fully responsive
- SEO optimised (schema.org LocalBusiness, meta tags, sitemap, robots.txt)
- Privacy policy page (privacy.html) linked in footer
- Firebase Hosting ready
- **TWO separate contact forms** — one for clients, one for candidates

### Sections (in order)
1. Top bar (M&E specialists + phone)
2. Sticky nav (logo + menu + two CTAs)
3. Hero (headline, subtext, two CTAs for clients/candidates, trust strip)
4. About (company text + 3 value cards)
5. Trades We Supply (7 trade cards with icons)
6. For Clients (benefits + CTA to client form)
7. For Candidates (benefits + CTA to candidate form)
8. Why Choose Us (6 cards)
9. Contact (TWO forms side by side — client enquiry + candidate registration)
10. Footer
11. Privacy policy page (privacy.html)

## Content

- **All copy is in `content.md`** — USE THIS for all text
- **Logo is in `images/logo.jpg`** — use in nav and footer
- **No existing website** — this is a brand new build from scratch
- **[ADDED] sections** in content.md are additional copy written by Hermes — use these too
- **Do NOT invent** business details not in content.md

## Design

- **Follow `DESIGN.md` exactly** for colours, fonts, spacing, components
- **This is a RECRUITMENT AGENCY, not a tradesman site** — it needs to look corporate and professional
- Key design elements:
  - Light/white theme (NOT dark — differentiates from Blays/JD Plumbing)
  - Teal primary (`#0d7377`) from the BME logo
  - Orange accent (`#f59e0b`) for candidate CTAs (visually distinguishes two audiences)
  - System fonts (Inter fallback)
  - Sticky nav with white background + shadow on scroll
  - Two distinct CTAs throughout (teal for clients, orange for candidates)
  - Cards with light grey background, subtle shadow
  - Professional, clean, corporate feel

## Contact Forms (TWO — this is critical)

### Form 1: Client Enquiry (teal accent)
```
Form POSTs to: https://projectforward-web.web.app/api/contact
Hidden fields:
  client_id = "ZljPEtiE1PvEqBuq6nC0"
  redirect_to = "https://bme-recruitment.web.app/?sent=success"
Honeypot field: "website" (hidden, must be empty)
```
Fields: Company name, Contact name, Phone, Email, Trades needed (checkboxes), Number of operatives, Project location, Message

### Form 2: Candidate Registration (orange accent)
No contact form needed for candidates. Instead, embed this iframe which uploads CVs directly into Matthew's CRM:
```html
<iframe id="iframe" frameBorder="0" src="https://register.bmerecruitment.com/cvloader/b9XdfcBqjm76VMm8GKKv/kfvdbIqPiVg0I3RAGIiLMyvrAth2" style="width:100%;min-height:600px;"></iframe>
```
Surround the iframe with:
- Sub-heading: "Upload Your CV"
- Instruction text: "Click the button below to upload your CV and register with BME Recruitment. Your details go straight into our system and we'll contact you about relevant opportunities."
- Below iframe: "Prefer to speak to us first? Call 0113 733 6301 or email matthew@bme-recruitment.com"
- The iframe renders as a button — make sure the surrounding text makes it clear what to do

**IMPORTANT:** Both forms use the SAME `client_id` and POST to the same API endpoint. The honeypot field must be named "website" on both.

## Output

- Build static files in `C:/Users/fil_b/projects/bme-recruitment/dist/`
- Firebase hosting site: `bme-recruitment`
- Deploy command: `firebase deploy --only hosting --project projectforward-web`
- Preview URL: `https://bme-recruitment.web.app`

## Notes

- This is a B2B recruitment agency, not a consumer tradesman site — tone should be professional and corporate
- BME is temp labour supply only — do NOT mention permanent recruitment anywhere
- No job board needed — just the two contact forms
- Two audiences: clients (contractors who need labour) and candidates (workers looking for temp work)
- Use teal for client CTAs, orange for candidate CTAs to visually distinguish
- The logo has a teal/blue-green colour — match the site accent to this
- LinkedIn is the main social media — link in footer
- Phil's nephew — first paying customer (£49 + £10/month)
- Include privacy policy page (privacy.html) — covers both forms, GDPR

## Image Usage Guide

| Image | Suggested Use |
|-------|---------------|
| `logo.jpg` | Navigation bar + footer (use white background behind it) |

No other images available. Use CSS gradient placeholders, icons (SVG), or simple geometric patterns for section backgrounds. Do NOT use stock photos — keep it clean and professional with icons and typography.