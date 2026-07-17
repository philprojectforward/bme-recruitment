# BME Recruitment Ltd — Website

Static marketing website for **BME Recruitment Ltd**, a mechanical and electrical (M&E) construction recruitment agency based in Leeds, UK.

- **Live site:** https://bme-recruitment.web.app/
- **Stack:** Plain HTML, CSS and vanilla JavaScript — no build step, no frameworks.
- **Hosting:** Firebase Hosting.

## Project structure

```
bme-recruitment/
├── dist/                 # The deployed site (Firebase "public" folder)
│   ├── index.html        # Single-page site
│   ├── privacy.html      # Privacy policy page
│   ├── styles.css        # All styling
│   ├── scripts.js        # Mobile nav, scroll reveal, contact form
│   ├── robots.txt        # Crawler directives
│   ├── sitemap.xml       # XML sitemap
│   └── images/           # Logo and any future assets
├── firebase.json         # Firebase Hosting config
├── .firebaserc           # Firebase project and hosting target
├── content.md            # Source copy / content notes
├── DESIGN.md             # Design notes
├── handoff-brief.md      # Build brief
└── images/               # Source assets
```

Everything that ships to production lives in `dist/`. Edit files there.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (only needed for the Firebase CLI / local tooling)
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`

## Run locally

The site is fully static, so you can preview it with any local web server. Pick one:

### Option A — Firebase emulator (matches production headers/rewrites)

```powershell
# from the project root
firebase emulators:start --only hosting
```

Then open the URL shown in the terminal (usually http://localhost:5000).

### Option B — Any static server

```powershell
# from the dist/ folder
npx serve .
# or, if you have Python installed:
python -m http.server 5000
```

Then open http://localhost:5000.

> Opening `dist/index.html` directly with `file://` mostly works, but a local
> server is recommended so relative paths, the sitemap and the contact form
> behave the same as in production.

## Deploy to Firebase Hosting

### 1. Sign in (first time only)

```powershell
firebase login
```

### 2. Select the Firebase project

The Firebase **project** and hosting **target** are already configured in
`.firebaserc`:

- Project: `projectforward-web`
- Hosting site: `bme-recruitment` (served at https://bme-recruitment.web.app/)

No extra setup is needed. To confirm the CLI is pointed at the right project:

```powershell
firebase use
```

### 3. Deploy

```powershell
firebase deploy --only hosting
```

After deploy completes, the CLI prints the hosting URL. Changes are live
immediately at https://bme-recruitment.web.app/.

### Preview before going live (optional)

Deploy to a temporary preview channel that expires automatically:

```powershell
firebase hosting:channel:deploy preview
```

## Editing content

- **Copy / text:** edit `dist/index.html` directly.
- **Styles:** edit `dist/styles.css`. The stylesheet is cache-busted via
  `styles.css?v=1` in the HTML — bump the version number when you change CSS so
  browsers pick up the new file.
- **Scripts:** edit `dist/scripts.js` (also cache-busted as `scripts.js?v=1`).
- **Images:** add to `dist/images/` and reference with `loading="lazy"` plus
  explicit `width`/`height` to avoid layout shift.

### Caching note

`firebase.json` sets long-lived immutable caching for `.css`/`.js` files and
`must-revalidate` for HTML. Because CSS/JS are cached for a year, **always bump
the `?v=` query string** in `index.html` and `privacy.html` when you change
those files, otherwise returning visitors may see the old version.

## SEO checklist (already implemented)

- Descriptive, keyword-focused `<title>` and meta description
- Canonical URL and `robots` meta (`max-image-preview:large`)
- Open Graph + Twitter Card tags with image dimensions and alt text
- Local SEO geo meta tags (`geo.region`, `geo.position`, `ICBM`)
- `EmploymentAgency` / `LocalBusiness` JSON-LD structured data including address,
  geo coordinates, opening hours, service catalog and LinkedIn profile
- `robots.txt` and `sitemap.xml`
- Semantic HTML, single `<h1>`, descriptive `alt` text, lazy-loaded images
- System font stack (Inter fallback) and CSS-only visuals for fast load

### After each deploy

1. Validate structured data: https://search.google.com/test/rich-results
2. Submit / re-submit the sitemap in
   [Google Search Console](https://search.google.com/search-console) →
   `https://bme-recruitment.com/sitemap.xml`
3. Check the page in the
   [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to
   refresh the social preview image.

---

Website by [Project Forward](https://projectforward.co.uk).
