# Cache Busting Setup (Firebase Hosting + No-Build Static Site)

Instructions for an AI agent to add cache busting to a static site hosted on
Firebase Hosting. Goal: **force browsers to download updated CSS/JS whenever the
site is published, while keeping unchanged assets fully cached.**

Assumes a no-build static site where source files live directly in the deploy
folder (e.g. `dist/`) and assets are referenced as `/styles.css` and `/main.js`.

## How It Works

- **HTML is never cached** → browsers always fetch the latest HTML.
- **CSS/JS are referenced with a content-hash query string** (`/styles.css?v=<hash>`).
  The hash is derived from the file's contents, so the URL changes **only** when
  the file changes.
- **CSS/JS are cached hard (`immutable`, 1 year)** → safe, because a content
  change produces a brand-new URL that misses the cache and is re-downloaded.

Net effect: unchanged files stay cached (fast); changed files are force-updated.

## Step 1 — Configure `firebase.json` headers

Add a `headers` array to the `hosting` block. Keep any existing `rewrites`.

```json
{
  "hosting": {
    "site": "<your-site-id>",
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }],
    "headers": [
      {
        "source": "/**/*.html",
        "headers": [{ "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "/images/**",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=604800" }]
      }
    ]
  }
}
```

Notes:
- The HTML rule **must** come first / be present — if HTML is cached, the new
  `?v=` hash never reaches the browser and cache busting silently fails.
- Use `**/*.@(css|js)` (not a filename-specific glob) so it matches every CSS/JS
  file regardless of name. Firebase matches on path only; the `?v=` query string
  is ignored for header matching, so `immutable` still applies correctly.

## Step 2 — Create the publish script `publish.ps1`

Place this in the project root (same level as `firebase.json`). Adjust the asset
filenames (`styles.css`, `main.js`) if the site uses different names.

```powershell
<#
  publish.ps1 — Cache-busting publish.
  Stamps a content hash onto CSS/JS references in every HTML file, then deploys.

  Usage:
    ./publish.ps1             # stamp versions and deploy
    ./publish.ps1 -SkipDeploy # stamp versions only (no deploy)
#>
param([switch]$SkipDeploy)

$ErrorActionPreference = 'Stop'
$dist = Join-Path $PSScriptRoot 'dist'

function Get-ShortHash([string]$path) {
    (Get-FileHash -Algorithm SHA256 -Path $path).Hash.Substring(0, 10).ToLower()
}

$cssHash = Get-ShortHash (Join-Path $dist 'styles.css')
$jsHash  = Get-ShortHash (Join-Path $dist 'main.js')

Get-ChildItem -Path $dist -Filter '*.html' | ForEach-Object {
    $content = Get-Content -Raw -Path $_.FullName
    $content = $content -replace '(/styles\.css)(\?v=[a-z0-9]+)?', "`$1?v=$cssHash"
    $content = $content -replace '(/main\.js)(\?v=[a-z0-9]+)?',  "`$1?v=$jsHash"
    Set-Content -Path $_.FullName -Value $content -NoNewline
    Write-Host "Stamped $($_.Name)"
}

Write-Host "styles.css -> ?v=$cssHash"
Write-Host "main.js    -> ?v=$jsHash"

if ($SkipDeploy) {
    Write-Host 'Skipping deploy (-SkipDeploy set).'
    return
}

firebase deploy --only hosting
```

How the script works:
- Computes a short SHA-256 hash of `styles.css` and `main.js`.
- Rewrites each HTML file's references to `/styles.css?v=<hash>` and
  `/main.js?v=<hash>`. The regex is idempotent — it replaces an existing `?v=...`
  if present, otherwise appends one, so running it repeatedly is safe.
- Deploys with `firebase deploy --only hosting` (unless `-SkipDeploy`).

## Step 3 — Ensure HTML references are stampable

Every HTML file must reference the assets with a leading slash and no version
initially, e.g.:

```html
<link rel="stylesheet" href="/styles.css">
<script src="/main.js" defer></script>
```

The script converts these to `/styles.css?v=<hash>` on first run.

## Step 4 — Apply and publish

- To stamp locally without deploying (for verification):
  ```powershell
  ./publish.ps1 -SkipDeploy
  ```
- To stamp and deploy (the normal publish command going forward):
  ```powershell
  ./publish.ps1
  ```

**Important:** From now on, always publish with `./publish.ps1` instead of
`firebase deploy --only hosting` directly, so the version hashes are refreshed on
every deploy.

## Verification

1. After running the script, confirm HTML now contains
   `?v=<hash>` on the CSS/JS references.
2. After deploying, load the site and check response headers:
   - `.html` → `Cache-Control: no-cache, no-store, must-revalidate`
   - `.css` / `.js` → `Cache-Control: public, max-age=31536000, immutable`
3. Change `styles.css`, run `./publish.ps1` again, and confirm the `?v=` hash
   changed (and stays the same if the file is unchanged).
