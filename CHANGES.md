# BME Recruitment — Build Changelog

> **Purpose:** Record every change made to this project so any agent (Hermes or coder on Telegram) knows the current state.
> **Rule:** Every time a change is made, add an entry here with date, what was changed, and by whom.

---

## Changes

### July 17, 2026 — Initial build
**By:** Coder agent (via Hermes delegate_task)
- Built complete static site (index.html, styles.css, scripts.js, robots.txt, sitemap.xml, privacy.html)
- Light corporate theme: teal (#0d7377) + orange (#f59e0b) on white
- Sections: top bar, nav, hero, about, trades, for clients, for candidates (CV iframe), why choose us, contact (client form), footer
- Logo in images/logo.jpg
- Deployed to Firebase: https://bme-recruitment.web.app

### July 17, 2026 — Fix iframe URL + add PPE teaser
**By:** Coder agent (via Hermes delegate_task)
- **Fixed:** CV upload iframe URL changed from `https://candidate.kisrec.com/cvloader/...` to `https://register.bmerecruitment.com/cvloader/b9XdfcBqjm76VMm8GKKv/kfvdbIqPiVg0I3RAGIiLMyvrAth2`
- **Added:** PPE teaser section (section #8b, id="ppe") between "Why Choose Us" and Contact
  - Dark teal (#0a2a2e) background with diagonal pattern
  - Heading: "More Than Just Recruitment"
  - Sub-heading: "PPE & Workwear Solutions — Coming Soon"
  - Body text about industry PPE requirements
  - Orange "Coming Soon" pill badge
  - Responsive (stacks mobile, side-by-side desktop)
  - Uses .reveal class for scroll animation
- Bumped CSS cache-buster from ?v=7 to ?v=8
- Deployed to Firebase

---

### July 17, 2026 — Client feedback: construction images + remove email
**By:** Coder agent (via Hermes delegate_task)
- **Added construction images** to hero and section backgrounds for a "construction feel" (client request)
  - Hero section: `images/construction-hero.jpg` as CSS `background-image` with teal gradient overlay `linear-gradient(rgba(13,115,119,0.85), rgba(10,42,46,0.9))`; hero text colour changed to white; hero badge background switched to `rgba(255,255,255,0.15)`; trust strip text uses `rgba(255,255,255,0.85)` with text-shadow for readability
  - About section: `images/construction-team.jpg` subtle background via `.about::before` with 92% white overlay
  - Trades section (`#sectors`): `images/construction-electrical.jpg` subtle background via `.sectors::before` with 93% white overlay
  - For Clients section (`#clients`): `images/construction-steel.jpg` subtle background via `.clients::before` with 92% `#e8f4f4` (secondary) overlay
  - All section backgrounds use `position: absolute; inset: 0; z-index: -1` so the section content stays readable; no inline `<img>` tags used
  - Copied `construction-hero.jpg`, `construction-steel.jpg`, `construction-electrical.jpg`, `construction-team.jpg` into `dist/images/`
- **Removed all email references** from the site (client doesn't want to look smaller than they are)
  - Removed `mailto:matthew@bme-recruitment.com` links from top bar, candidate section, contact section, and footer in `index.html`, `privacy.html`, and `404.html`
  - Removed the email list item from the Contact Details card in `index.html`
  - Removed the email line from the privacy policy contact details list (replaced with "Email: via our contact form on the homepage")
  - Removed `"email": "matthew@bme-recruitment.com"` from the schema.org JSON-LD markup
  - Candidate section helper text changed from "Call 0113 733 6301 or email matthew@bme-recruitment.com" to just "Call 0113 733 6301"
  - Kept phone number 0113 733 6301 everywhere (all click-to-call links intact)
  - Kept the client enquiry contact form (enquiries go through the form, not email)
- Bumped CSS/JS cache-buster from ?v=9 to ?v=10 (index.html and privacy.html); 404.html from ?v=7 to ?v=10
- Deployed to Firebase
- `dist/index.html` — main page (v10)
- `dist/styles.css` — styles (v10, includes construction image backgrounds)
- `dist/scripts.js` — scripts (unchanged)
- `dist/privacy.html` — privacy policy (v10)
- `dist/404.html` — 404 page (v10)
- `dist/images/construction-hero.jpg` — construction site with cranes (528KB)
- `dist/images/construction-steel.jpg` — steel framework construction (544KB)
- `dist/images/construction-electrical.jpg` — electrical/M&E work (242KB)
- `dist/images/construction-team.jpg` — construction workers with hard hats (227KB)
- `dist/images/logo.jpg` — BME Recruitment logo

### July 17, 2026 — Replace clients SVG with real image
**By:** Coder agent (via Hermes delegate_task)
- **Replaced** decorative SVG graphic in the "For Clients" section (`#clients` right column, `.split-section__visual--clients`) with a real `<img>` of `images/construction-steel.jpg`
  - Removed the `visual-pattern visual-pattern--teal` wrapper and inline SVG (circles + path)
  - Added `<img>` with `class="split-section__img"`, lazy loading, 500×500 intrinsic, inline `border-radius: var(--radius-lg)`, full-width responsive
  - Removed `aria-hidden="true"` from the wrapping div (now contains meaningful image content)
  - Kept the existing subtle `.clients::before` background-image overlay (92% secondary tint) — image sits on top, fills the right column with rounded corners
- Deployed to Firebase (https://bme-recruitment.web.app)

### July 17, 2026 — Add PPE product images to teaser section
**By:** Coder agent (via Hermes delegate_task)
- **Replaced** decorative SVG in PPE teaser section (`#ppe` right column, `.ppe-teaser__visual`) with a 2×2 grid of real PPE product images
  - 4 images: `ppe-hardhat.jpg` (Safety hard hat), `ppe-hivis.jpg` (Hi-vis workwear), `ppe-gloves.jpg` (Safety gloves), `ppe-goggles.jpg` (Safety goggles)
  - Skipped `ppe-kit.jpg` as instructed
  - 120×120px thumbnails, `object-fit: cover`, 12px border-radius, subtle white border + dark shadow
  - 2×2 CSS grid (`.ppe-gallery`), responsive to 110×110px on screens ≤480px
  - Removed `aria-hidden="true"` (now contains meaningful image content with descriptive alt text)
  - All 4 images lazy-loaded
- Copied 4 PPE images into `dist/images/`
- Bumped CSS cache-buster from ?v=10 to ?v=11
- Deployed to Firebase (https://bme-recruitment.web.app)

### July 17, 2026 — Replace PPE images with new versions
**By:** Coder agent (via Hermes delegate_task)
- **Replaced** the 4 PPE product images in the PPE teaser section (`#ppe` 2×2 grid) with new versions:
  - `ppe-hardhat.jpg` (33KB → 33,412 bytes live)
  - `ppe-hivis.jpg` (43KB → 42,715 bytes live)
  - `ppe-gloves.jpg` (27KB → 26,946 bytes live)
  - `ppe-goggles.jpg` (25KB → 24,623 bytes live)
- No HTML changes needed — filenames unchanged, new files dropped into `dist/images/`
- Deployed to Firebase Hosting (`firebase deploy --only hosting --project projectforward-web`)
- Verified all 4 images live via curl: content-length matches local files exactly

### July 17, 2026 — Swap PPE teaser grid to new image set
**By:** Coder agent (via Hermes delegate_task)
- **Replaced** 3 of the 4 PPE teaser grid images in `#ppe` 2×2 grid with new product photos (kept `ppe-hivis.jpg` as it was already the new version):
  - `ppe-hivis.jpg` — kept (alt "Hi-vis workwear", 18,636 bytes)
  - `ppe-hardhat.jpg` → `ppe-multi.jpg` (alt "PPE workwear range", 36,431 bytes)
  - `ppe-gloves.jpg` → `ppe-products.jpg` (alt "PPE safety equipment", 75,244 bytes)
  - `ppe-goggles.jpg` → `ppe-products2.jpg` (alt "PPE safety products", 28,590 bytes)
- Updated alt text on all replaced images to match the new product photos
- Bumped CSS/JS cache-buster from ?v=11/?v=10 to ?v=12 in `dist/index.html`
- Deployed to Firebase Hosting (`firebase deploy --only hosting --project projectforward-web`)
- Verified all 4 new images live via curl against https://bme-recruitment.web.app/images/

### July 17, 2026 — Replace construction-steel.jpg hero image
**By:** Coder agent (via Hermes delegate_task)
- **Replaced** `dist/images/construction-steel.jpg` with a new image (201,808 bytes / ~202KB)
- No HTML changes needed — filename unchanged, new file dropped into `dist/images/`
- Deployed to Firebase Hosting (`firebase deploy --only hosting --project projectforward-web`)
- Verified live via curl: HTTP 200, Content-Length 201808 at https://bme-recruitment.web.app/images/construction-steel.jpg

### July 17, 2026 — Rename "BME Recruitment Ltd" to "BME Recruitment Group"
**By:** Coder agent (via Hermes delegate_task)
- **Renamed** the business name from "BME Recruitment Ltd" to "BME Recruitment Group" in all three HTML files: `index.html`, `privacy.html`, and `404.html`
- Updated 21 instances total across all files:
  - **index.html** (9): meta author, og:site_name, og:image:alt, twitter:image:alt, JSON-LD `"name"` field, nav logo aria-label, nav logo img alt, footer logo img alt, footer copyright
  - **privacy.html** (8): page title, meta description, nav logo aria-label, nav logo img alt, privacy policy body text, business name list item, footer logo img alt, footer copyright
  - **404.html** (4): page title, nav logo aria-label, nav logo img alt, footer copyright
- **Did NOT change** LinkedIn company page URLs (`linkedin.com/company/bme-recruitment-ltd`) — those are external links to the live LinkedIn page; the slug is controlled by LinkedIn
- **Did NOT change** the domain name (bme-recruitment.com), JSON-LD `@type`, or any other schema field
- Deployed to Firebase Hosting (`firebase deploy --only hosting --project projectforward-web`)
- Verified: `curl -s https://bme-recruitment.web.app/ | grep -i "Ltd"` returns nothing (excluding LinkedIn URL check); `curl -s https://bme-recruitment.web.app/ | grep -i "Group"` returns results

### July 17, 2026 — Replace ALL remaining "BME Recruitment" with "BME Recruitment Group"
**By:** Coder agent (via Hermes delegate_task)
- **Completed** the rebrand by replacing every remaining instance of "BME Recruitment" (without "Group") with "BME Recruitment Group" across all three HTML files: `index.html`, `privacy.html`, and `404.html`
- Total replacements: 13
  - **index.html** (9): `<title>`, og:title, twitter:title, About section heading, About body text (×2 — "was founded" and "proudly supports"), candidate section lead text, CV iframe title, "Why Choose" section heading
  - **privacy.html** (3): three possessive instances "BME Recruitment's CRM system/CRM partner/candidate CRM" → "BME Recruitment Group's ..."
  - **404.html** (1): meta description "Return to the BME Recruitment homepage" → "Return to the BME Recruitment Group homepage"
- **Did NOT change** URLs (bme-recruitment.com, bme-recruitment.web.app, linkedin.com/company/bme-recruitment-ltd, register.bmerecruitment.com, candidate.kisrec.com) — all preserved as-is
- **No "Group Group" duplicates** introduced (negative lookahead regex ensured "BME Recruitment Group" instances were skipped)
- Possessive forms handled correctly: "BME Recruitment's" → "BME Recruitment Group's"
- Deployed to Firebase Hosting (`firebase deploy --only hosting --project projectforward-web`)
- Verified: zero instances of "BME Recruitment" without "Group" remain; `grep -c "BME Recruitment Group"` returns 18 (index.html) + 11 (privacy.html) + 5 (404.html) = 34 total

### July 17, 2026 — Redesign PPE teaser section (dark → white with PPE logo)
**By:** Coder agent (via Hermes delegate_task)
- **Client request:** Change PPE section from dark teal background to white, matching the PPE brand logo styling
- **HTML changes (`dist/index.html`):**
  - Removed the `.ppe-teaser__bg` decorative div (dark radial gradients + diagonal stripe pattern)
  - Added the PPE business logo as an inline `<img>` (`images/ppe-logo.jpg`, 220×120, gold/amber on white) at the top of the content column
  - Replaced the 4 product images:
    - `ppe-hivis.jpg` → `ppe-product-1.jpg` (alt "PPE hi-vis workwear")
    - `ppe-multi.jpg` → `ppe-product-2.jpg` (alt "PPE workwear range")
    - `ppe-products.jpg` → `ppe-product-3.jpg` (alt "PPE safety equipment")
    - `ppe-products2.jpg` → `ppe-product-4.jpg` (alt "PPE safety products")
  - Kept all text content unchanged ("More Than Just Recruitment", "PPE & Workwear Solutions — Coming Soon", body/desc paragraphs)
- **CSS changes (`dist/styles.css`):**
  - Section background: `#0a2a2e` (dark teal) → `#ffffff` (white)
  - Section text color: `#e8f4f4` → `var(--foreground, #0f172a)` (dark)
  - Title color: `#ffffff` → `var(--foreground, #0f172a)`
  - Body/desc text: `#b8d4d6` → `#334155` (slate-700, readable on white)
  - Removed `.ppe-teaser__bg` and `.ppe-teaser__bg::after` rules entirely (no more dark gradient/diagonal pattern)
  - Added `.ppe-teaser__logo` rule: max 220×120, object-fit contain, margin below
  - "Coming Soon" badge: orange `var(--accent)` → gold/amber `#c08020` with white text and gold-tinted shadow
  - Subheading: `var(--accent)` (orange) → `#c08020` (gold)
  - Gallery images: dark border `rgba(255,255,255,0.15)` → gold-tinted border `rgba(192,128,32,0.25)`; shadow softened; background `#0d3b40` → `#f8f5ef` (warm off-white)
  - Added subtle gold accent: 3px top/bottom border in `#c08020` + inset box-shadow `rgba(192,128,32,0.15)` to keep the section visually distinct from neighbours while staying light
  - Mobile: logo scales to 180px max-width on ≤480px
- Bumped CSS cache-buster from ?v=15 to ?v=16
- Responsive layout preserved: logo + text on one side, 2×2 image grid on the other (stacks on mobile)
- Deployed to Firebase Hosting (`firebase deploy --only hosting --project projectforward-web`)

### July 17, 2026 — PPE grid: added 2 more images, 2x2 → 2x3
**By:** Coder agent (via Hermes delegate_task)
- **Added** 2 new PPE product images to the `#ppe` teaser grid (now 6 images total):
  - `ppe-product-5.jpg` (8,113 bytes) — alt "PPE safety gear"
  - `ppe-product-6.jpg` (4,111 bytes) — alt "PPE workwear products"
- **Grid changed** from 2×2 (4 items) to 2×3 (6 items): `grid-template-columns: repeat(2, 120px)` naturally creates 3 rows with 6 items; added `max-height: 480px` guard on `.ppe-gallery` to keep the visual column from growing too tall
- **Mobile responsive (≤480px):** switched from 2 columns × 110px to 3 columns × 90px so the 6 images fit compactly in 2 rows on small screens; `max-width: 300px` keeps it tidy
- Bumped CSS cache-buster from ?v=16 to ?v=17
- Deployed to Firebase Hosting (`firebase deploy --only hosting --project projectforward-web`)
- Verified all 6 images live