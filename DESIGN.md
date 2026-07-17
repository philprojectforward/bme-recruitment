# DESIGN.md — BME Recruitment Ltd

> **Industry:** Construction Recruitment — M&E Specialists
> **Location:** Leeds, UK (UK-wide coverage)
> **Design pattern:** Light, professional, corporate — clean lines, teal accent from logo
> **Created:** July 17, 2026
> **Logo:** Provided — teal/blue-green accent (#206060)

---

## Design Tokens

### Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#ffffff` | Page background (white — clean, corporate) |
| `--foreground` | `#1a1a2e` | Primary text (dark navy) |
| `--card` | `#f8fafc` | Card/section backgrounds (very light grey) |
| `--card-foreground` | `#1a1a2e` | Text on cards |
| `--primary` | `#0d7377` | Primary brand colour (teal — from logo, slightly brighter for web) |
| `--primary-foreground` | `#ffffff` | Text on teal buttons |
| `--primary-dark` | `#0a5d61` | Darker teal for hovers |
| `--secondary` | `#e8f4f4` | Secondary backgrounds (light teal tint) |
| `--muted` | `#f1f5f9` | Muted backgrounds |
| `--muted-foreground` | `#64748b` | Secondary/muted text |
| `--accent` | `#f59e0b` | Orange/amber accent — for secondary CTAs, highlights (complements teal) |
| `--accent-foreground` | `#ffffff` | Text on accent buttons |
| `--success` | `#22c55e` | Trust badges, "verified" indicators |
| `--border` | `#e2e8f0` | Borders (light grey) |

**Design note:** Light theme with teal primary (`#0d7377`) from the BME logo. Orange accent (`#f59e0b`) provides contrast for secondary CTAs (candidate registration). This is a corporate, professional look — completely different from the tradesman dark themes. Recruitment agencies need to look established and trustworthy to both clients and candidates.

### Typography

- **Font stack:** `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- **No external font loading** — use Inter if available, fallback to system fonts
- **Headings:**
  - H1: `2.75rem` (44px) mobile, `3.5rem` (56px) desktop, weight 800
  - H2: `2rem` (32px) mobile, `2.5rem` (40px) desktop, weight 700
  - H3: `1.5rem` (24px), weight 600
- **Body:** `1rem` (16px), line-height 1.7
- **Small/caption:** `0.875rem` (14px)
- **Letter-spacing:** -0.02em on headings

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `0.5rem` (8px) | Tight gaps |
| `--space-sm` | `1rem` (16px) | Default gap |
| `--space-md` | `1.5rem` (24px) | Section internal padding |
| `--space-lg` | `3rem` (48px) | Section padding (mobile) |
| `--space-xl` | `5rem` (80px) | Section padding (desktop) |
| `--max-width` | `1200px` | Content container max width |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `0.375rem` (6px) | Small elements |
| `--radius` | `0.5rem` (8px) | Cards, inputs |
| `--radius-lg` | `0.75rem` (12px) | Large cards |
| `--radius-full` | `9999px` | Pills, badges |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Subtle |
| `--shadow` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Elevated cards |
| `--shadow-primary` | `0 4px 14px rgba(13,115,119,0.3)` | Teal CTA glow |

---

## Components

### Buttons

```css
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 0.875rem 2rem;
  border-radius: var(--radius);
  font-weight: 600;
  box-shadow: var(--shadow-primary);
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  background: var(--primary-dark);
  box-shadow: 0 6px 20px rgba(13,115,119,0.4);
}

.btn-accent {
  background: var(--accent);
  color: var(--accent-foreground);
  padding: 0.875rem 2rem;
  border-radius: var(--radius);
  font-weight: 600;
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 0.875rem 2rem;
  border-radius: var(--radius);
  font-weight: 600;
}
```

### Cards

```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
}
```

---

## Page Structure (Section by Section)

### 1. Top Bar
- Thin bar at very top
- Left: "M&E Recruitment Specialists | UK-Wide"
- Right: Phone "0113 733 6301" (click-to-call) + email
- Background: `--primary` (teal), white text

### 2. Navigation Bar
- Logo (BME Recruitment logo, teal)
- Desktop nav: Home | About | Sectors | For Clients | For Candidates | Contact
- "Request Operatives" button (teal, top-right) — primary CTA for clients
- "Register for Work" button (orange/accent, top-right) — secondary CTA for candidates
- Mobile: hamburger menu
- Sticky position with white background + shadow on scroll

### 3. Hero Section
- White/light background with subtle teal gradient accent
- **H1:** "Reliable M&E Labour for Construction Projects Across the UK"
- **Subtext:** "We supply skilled electricians, plumbers, pipefitters, and mechanical operatives to commercial and industrial contractors. Tried, tested, and dependable."
- **Two CTAs side by side:**
  - "Request Operatives" (teal button — for clients/contractors)
  - "Register for Work" (orange/accent button — for candidates/workers)
- **Trust strip (4 items with icons):**
  - M&E Specialists
  - UK-Wide Coverage
  - Vetted, Reliable Operatives
  - Rapid Response

### 4. About Section
- Heading: "About BME Recruitment"
- Text from content.md About section (full)
- Three key values cards:
  1. **Honesty** — "We've built our reputation on honesty and professionalism"
  2. **Quality** — "Skilled operatives our clients can depend on"
  3. **Partnership** — "Long-term relationships with M&E contractors"

### 5. Trades We Supply Section
- Heading: "Skilled Trades We Supply"
- Grid of trade cards (7 items) with icons:
  - Electricians
  - Electrical Improvers
  - Electricians' Mates
  - Plumbers
  - Pipefitters
  - Mechanical Labour
  - Skilled Trades & Support
- Each card: icon + trade name + brief description

### 6. For Clients Section
- Heading: "For Clients — Need Skilled Labour?"
- Subtext: "We provide responsive, dependable M&E labour supply to contractors across the UK"
- Bullet points of what we offer (rapid response, vetted operatives, flexible numbers, UK-wide)
- CTA: "Request Operatives" (teal button → scrolls to client form)
- Light teal background (`--secondary`)

### 7. For Candidates Section
- Heading: "For Candidates — Looking for Work?"
- Subtext: "We connect skilled M&E operatives with leading contractors across the UK"
- Intro paragraph: "Register with BME Recruitment and get access to ongoing work opportunities on commercial and industrial projects across the UK. We work with some of the country's most respected M&E contractors — upload your CV below and we'll be in touch."
- Bullet points of benefits:
  - Ongoing temporary work on commercial and industrial projects
  - Competitive rates and reliable pay
  - Opportunities across the UK
  - Work with respected M&E contractors
  - One operative or full teams — we match you to the right projects
- **Candidate registration area** (below the bullet points):
  - Sub-heading: "Upload Your CV"
  - Instruction text: "Click the button below to upload your CV and register with BME Recruitment. Your details go straight into our system and we'll contact you about relevant opportunities."
  - **CV Upload iframe** (embedded):
    ```html
    <iframe id="iframe" frameBorder="0" src="https://register.bmerecruitment.com/cvloader/b9XdfcBqjm76VMm8GKKv/kfvdbIqPiVg0I3RAGIiLMyvrAth2" style="width:100%;min-height:600px;"></iframe>
    ```
  - Helper text below iframe: "Prefer to speak to us first? Call 0113 733 6301 or email matthew@bme-recruitment.com"
- No candidate contact form needed — the iframe handles CV upload directly into Matthew's CRM
- CTA: "Upload Your CV" button that scrolls to the iframe section

### 8. Why Choose Us Section
- Heading: "Why Choose BME Recruitment?"
- 6 cards with icons:
  1. M&E Specialists
  2. Responsive
  3. Vetted Operatives
  4. Quality People
  5. Flexible
  6. UK-Wide
- Cards with teal accent border

### 9. Contact Section
- Heading: "Get In Touch"
- **Client Enquiry Form** (teal accent header):
  - Company name (required)
  - Contact name (required)
  - Phone (required)
  - Email (required)
  - Trades needed (checkboxes: Electricians, Plumbers, Pipefitters, etc.)
  - Number of operatives needed
  - Project location
  - Message
  - Honeypot field
  - Hidden: `client_id = "ZljPEtiE1PvEqBuq6nC0"`
  - Hidden: `redirect_to` = preview URL + "?sent=success"
  - POST to: `https://projectforward-web.web.app/api/contact`
  - Submit: "Request Operatives" (teal)
- Note: "Or call us on 0113 733 6301"
- Candidate CV upload is handled by the iframe in the For Candidates section (see section 7)

### 10. Footer
- Logo + business name
- Quick links: About, Sectors, For Clients, For Candidates, Contact
- Contact: phone, email, location (Leeds)
- LinkedIn link
- "Website by Project Forward" small text
- Privacy policy link

### 11. Privacy Policy Page (privacy.html)
- GDPR compliant
- Covers: both contact forms (client + candidate), data collection, storage, cookies, third-party services (Project Forward API), user rights
- Linked in footer

---

## SEO Requirements

### Meta Tags
- Title: "BME Recruitment | M&E Construction Recruitment Agency UK | 0113 733 6301"
- Description: "Specialist M&E recruitment agency supplying skilled electricians, plumbers, pipefitters and mechanical operatives to commercial and industrial construction projects across the UK. Call 0113 733 6301."
- Keywords: M&E recruitment, construction recruitment UK, electrical recruitment, mechanical recruitment, temp labour construction, electrician temp agency, pipefitter recruitment, skilled trades recruitment

### Schema.org Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BME Recruitment Ltd",
  "description": "Specialist M&E recruitment agency supplying skilled mechanical and electrical operatives to commercial and industrial construction projects across the UK.",
  "url": "https://bme-recruitment.com",
  "telephone": "01137336301",
  "email": "matthew@bme-recruitment.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Leeds",
    "addressRegion": "West Yorkshire",
    "addressCountry": "GB"
  },
  "areaServed": "United Kingdom",
  "openingHours": "Mo-Fr 08:00-17:00",
  "sameAs": ["https://uk.linkedin.com/company/bme-recruitment-ltd"]
}
```

### Additional
- `robots.txt` allowing all
- `sitemap.xml` with index + privacy page
- Open Graph tags
- Canonical URL
- Mobile viewport meta tag
- `privacy.html` linked in footer

---

## Firebase Hosting Config

```json
{
  "hosting": {
    "site": "bme-recruitment",
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

- Site ID: `bme-recruitment`
- Deploy: `firebase deploy --only hosting --site bme-recruitment`
- Preview URL: `https://bme-recruitment.web.app`

---

## Do's and Don'ts

### Do
- Use the light professional theme with teal accent from the logo
- Include TWO separate contact forms (client enquiry + candidate registration)
- Use teal for client CTAs and orange/accent for candidate CTAs to visually distinguish audiences
- Include click-to-call phone number prominently
- Include schema.org LocalBusiness structured data
- Use the real logo from images/logo.jpg
- Include all 7 trades with icons
- Include the "About BME Recruitment" text from content.md
- Include privacy policy page linked in footer
- Make it look corporate and professional — this is a recruitment agency, not a tradesman site

### Don't
- Don't use dark themes — recruitment needs to look clean and professional
- Don't mention permanent recruitment — BME is temp labour only
- Don't create a job board — not needed
- Don't use tradesman-style design patterns — this is a B2B corporate site
- Don't use external font CDNs — use system fonts (Inter fallback)
- Don't use heavy JS frameworks — vanilla HTML/CSS/JS only
- Don't forget the honeypot field on BOTH contact forms
- Don't forget the `client_id = "ZljPEtiE1PvEqBuq6nC0"` hidden field on BOTH forms
- Don't forget to include `prefers-reduced-motion` support