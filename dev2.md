# ShadowReference — Single Source of Truth

This is the **only** product + engineering document. Upload this one file to an AI. Do not look for `doc.md`, `docv2.md`, or `BUILD.md` — they redirect here.

**How to read conflicts**
- **Part I (as built)** wins for what already exists in the repo.
- **Part III (roadmap)** wins for unbuilt analyzers, diffs, workspace, and optional AI.
- **Part II (original V1 spec)** is kept for tool-by-tool requirements. Ignore leftover lines that say “do not implement ads” or “30 tools” — ads are wired (off), and 33 tools shipped.

---

# Part I — As built (product, tech, how to work)

## 0. How an AI should work from this file

1. Do not rebuild shipped tools. Extend them.
2. Do not add a backend, database, login, or API route unless the user explicitly asks.
3. Keep tool logic in `src/lib/tools/` with Vitest tests. UI stays in `src/components/`.
4. Never send tool input to a server. File “upload” is `FileReader` only, max 2 MB.
5. Next.js is **16.3.4** with `output: "export"`. Read `node_modules/next/dist/docs/` before using unfamiliar APIs. `AGENTS.md` is auto-injected by `next dev` — do not fight it.
6. Node **24** is required (`.nvmrc`). Global nvm may still be 18.
7. Reuse `ToolLayout`, `ToolWorkbench`, `ToolWorkspace`, `ActionBar`, `Editor`, `OutputPanel`. Do not invent a parallel tool chrome.
8. Markdown Reader and Code Compare already exist. Do **not** duplicate them.
9. JWT, regex, cURL, SQL already have pages. Upgrade those pages in place; do not create `/tools/jwt-analyzer` clones.
10. Ads are wired but **off**. Do not enable Auto ads. Do not put ads next to buttons.

---

## 1. Product (CEO / founder)

### What it is

**ShadowReference** is a free, privacy-first developer toolkit that runs entirely in the browser.

- Live site: `https://shadowreference.dev`
- GitHub: `https://github.com/naskark/Shadow-Reference` (default branch `main`)
- Contact: `hello@shadowreference.dev`
- Name: ShadowReference
- Tagline: *The developer reference desk for everyday problems.*
- Positioning: *Cursor helps you build it. ShadowReference helps you inspect, compare, and verify it.*

It is **not** an AI coding assistant, not a SaaS with accounts, and not a generic “1000 tools” farm. V1 is a fast local reference desk. The next product layer (Part I §12 and Part III) is artifact analysis: inspect JSON, diffs, logs, requests, JWTs — deterministic, visual, client-side.

### Why people use it

Paste messy JSON, a JWT, a cURL, a regex, or a Markdown file → get a useful result in the same tab → copy and go back to the editor. No signup. Nothing leaves the machine.

### Business model

Google AdSense is **implemented but disabled** until a real `ca-pub-` publisher ID is set at build time. Income depends on traffic and approval. Ads must never look like tool buttons and must never sit next to Format / Upload.

Do not click your own ads. Do not ask users to click ads.

### What “done” looks like for V1 (already true)

- 33 working tools, each on its own URL
- Static export, no backend
- Searchable directory
- Unique SEO content per tool
- Privacy, Terms, About, Contact
- Dark/light theme
- Ads slots reserved, legally disclosed, off until configured
- Markdown preview with syntax highlighting and GFM tables
- 16px editors/outputs; darker light-mode code colors

### What we will not build unless asked

- Accounts, saved history, cloud snippets
- Payments / premium paywall
- Public API
- AI on every tool
- Server-side PDF/image processing
- Thin doorway pages for keywords
- Duplicate JWT/regex/cURL/SQL pages under new slugs


### GitHub

- Repository: https://github.com/naskark/Shadow-Reference
- Default branch: `main`
- Earlier mistaken repo under `kunalincred/shadowreferenc` was replaced by this `naskark` repo

### Tutorials (Lottie) — extra detail

- Component: `src/components/ToolTutorial.tsx`
- Animations: `src/lib/animations/tutorial-lotties.ts`
- Styles mapped by tool `kind` (workflow, dual, compare, document, token, generate, reference)
- Sample input/output panels glow in sync with tutorial steps
- Play / Pause control
- Compact bar **below** the workspace, not above

---

## 2. Tech snapshot (engineer)

| Item | Value |
|---|---|
| Framework | Next.js **16.3.4** App Router |
| UI | React **19.2.8**, TypeScript strict |
| Style | Tailwind CSS **4** + `src/app/globals.css` tokens |
| Output | `output: "export"` — static HTML, Cloudflare/static hosts |
| Images | `images.unoptimized: true` |
| Node | `>=24` (pinned `.nvmrc` = `24`) |
| Tests | Vitest 4, `src/**/*.test.ts`, node environment |
| Path alias | `@/*` → `src/*` |
| Backend | **None.** No Route Handlers, no database. |
| Local storage | Theme only (`sr-theme`). Never secrets/JWTs. |

### Dependencies (runtime)

| Package | Why |
|---|---|
| `js-yaml` | YAML parse/dump |
| `marked` + `isomorphic-dompurify` | Markdown HTML + XSS sanitize |
| `highlight.js` | Fenced-code syntax highlighting in Markdown preview (lazy, `lib/common`) |
| `qrcode` | In-browser QR (lazy-loaded) |
| `lottie-react` | Compact tutorials (dynamic import, `ssr: false`) |

No Redux, no auth SDK, no analytics SDK, no CMS.

### Commands

```bash
source ~/.nvm/nvm.sh && nvm use   # Node 24
npm install
npm run dev      # http://localhost:3000
npm test
npm run build    # writes static site to /out
npm run lint
```

`next start` is not the production path. Production is the static `/out` folder (or host that runs `next build` with export).

### Env

`.env*` is gitignored except `.env.example`.

```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY=xxxxxxxxxx
```

Ads stay hidden until the client matches `/^ca-pub-\d{10,20}$/`. Same vars must exist in the **build** environment of the host (Cloudflare Pages, etc.).

---

## 3. Information architecture

| Route | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Search, categories, featured tools, bottom ad slot |
| `/tools` | `src/app/tools/page.tsx` | Full directory + `ToolSearch` |
| `/tools/[slug]` | `src/app/tools/[slug]/page.tsx` | One SSG page per tool (`generateStaticParams` from `TOOLS`) |
| `/about` `/privacy` `/terms` `/contact` | `src/app/*/page.tsx` | Legal / brand. **No ad units.** |
| `/sitemap.xml` | `src/app/sitemap.ts` | Static + all tools. Popular slugs priority `0.9` |
| `/robots.txt` | `src/app/robots.ts` | Allow all, including GPTBot |
| 404 | `src/app/not-found.tsx` | Custom not found |

Canonical origin: `SITE_URL` = `https://shadowreference.dev` in `src/data/tools.ts`.

Layout (`src/app/layout.tsx`): Geist fonts, dark class on `<html>` by default, `JsonLd` site graph, `AdSenseScript` (no-ops if ads off), `BackgroundEffects`, `ThemeProvider`, `Header`, `Footer`.

---

## 4. Repository map

```
src/
├── app/                      # Routes, globals.css, favicon/icon
├── components/
│   ├── ToolLayout.tsx        # Header + workbench + tutorial + SEO body + ads
│   ├── ToolWorkbench.tsx     # Full screen wrapper (Esc to exit)
│   ├── ToolWorkspace.tsx     # Switch on tool.kind — most tools live here
│   ├── ToolTutorial.tsx      # Compact Lottie bar BELOW the workspace
│   ├── ToolHeader.tsx        # Breadcrumbs, H1, tagline
│   ├── ToolSearch.tsx        # Directory search/filter
│   ├── ActionBar / Editor / OutputPanel / CopyButton / DownloadButton / ErrorMessage
│   ├── FileUploadButton / FileDropZone
│   ├── FAQ / RelatedTools / JsonLd / Logo
│   ├── AdSlot / AdSenseScript
│   └── tools/
│       ├── MarkdownReaderTool.tsx
│       └── CodeCompareTool.tsx
├── data/
│   ├── tools.ts              # Registry: slugs, kinds, samples, FAQs, related
│   ├── tool-seo.ts           # Per-tool titles, intros, search terms, extra FAQs
│   └── http-status-codes.ts
├── lib/
│   ├── tools/                # Pure functions + *.test.ts
│   ├── seo.ts / ads.ts / files.ts / utils.ts
│   └── animations/tutorial-lotties.ts
public/                       # logo.svg, favicons; ads.txt generated at build
```

**Rule:** parsers and transformers are testable TypeScript. React only calls them.

---

## 5. How a tool page is assembled

```
ToolPage (RSC)
  JsonLd (WebApplication + FAQ + HowTo + Breadcrumb)
  ToolLayout
    ToolHeader
    ToolWorkbench          ← Full screen button; click title to expand
      ToolWorkspace        ← actual editor / special UI
    ToolTutorial           ← below workspace, not above
    prose: intro, how-to, limitations, example
    FAQ
    AdSlot (rectangle)     ← only if ads enabled
    RelatedTools
    AdSlot (horizontal)
```

Workspace is **first**. Tutorial is a compact bar under it. Do not put a long tutorial above the fold again.

---

## 6. Tool registry contract

`src/data/tools.ts` is the source of truth.

```ts
type ToolDefinition = {
  slug: string;                 // URL: /tools/{slug}
  name: string;
  category: ToolCategory;
  description: string;
  tagline: string;
  kind: ToolKind;               // UI + run() switch in ToolWorkspace
  sampleInput: string;
  exampleInput: string;
  exampleOutput: string;
  howToUse: string[];
  limitations: string[];
  faqs: FAQ[];
  relatedSlugs: string[];
  privacyNote?: string;
  downloadFilename?: string;
  downloadMime?: string;
};
```

Helpers: `getToolBySlug`, `getToolsByCategory`, `getRelatedTools`.

Also set `SITE_NAME`, `SITE_TAGLINE`, `SITE_URL` there.

SEO extras: `src/data/tool-seo.ts` keyed by slug. `getToolSeo()` in `src/lib/seo.ts` merges extra FAQs with registry FAQs plus two universal FAQs (free + no server).

If you add a tool and skip `tool-seo.ts`, metadata falls back to `tool.description`. Still add a real SEO entry.

---

## 7. Shipped tools (33)

Do not recreate these routes.

### Data & JSON

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `json-formatter` | JSON Formatter | `transform` | `formatJson` |
| `json-validator` | JSON Validator | `transform` | `validateJson` |
| `json-minifier` | JSON Minifier | `transform` | `minifyJson` |
| `json-to-typescript` | JSON to TypeScript | `transform` | `jsonToTypeScript` |
| `json-yaml` | JSON ↔ YAML | `dual` | `jsonToYaml` / `yamlToJson` |
| `yaml-validator` | YAML Validator | `yaml` | `validateYaml` / `formatYaml` |

### Data conversion

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `json-to-csv` | JSON to CSV | `transform` | `jsonToCsv` |
| `csv-json` | CSV ↔ JSON | `csv-json` | `csvJsonConvert` |
| `xml-formatter` | XML Formatter / Validator | `xml` | `formatXml` / `validateXml` |

### Encoding & URL

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `base64-encoder-decoder` | Base64 Encoder / Decoder | `dual` | `encodeBase64` / `decodeBase64` |
| `url-encoder-decoder` | URL Encoder / Decoder | `dual` | `encodeUrl` / `decodeUrl` |
| `html-entity-encoder-decoder` | HTML Entity Encoder / Decoder | `dual` | `encodeHtmlEntities` / `decodeHtmlEntities` |
| `url-parser` | URL Parser | `url-parser` | `parseUrl` |

### Security & tokens

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `jwt-decoder` | JWT Decoder | `jwt` | `decodeJwt` — **decode only, not verify** |

### Regex & text

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `regex-tester` | Regex Tester | `regex` | `testRegex` |
| `regex-escape-unescape` | Regex Escape / Unescape | `regex` | `escapeRegex` / `unescapeRegex` |

### Date & time

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `timestamp-converter` | Timestamp Converter | `timestamp` | `unixToDatetime` / `datetimeToUnix` |
| `date-time-converter` | Date & Time Converter | `datetime` | `allDatetimeFormats` |

### Web & HTTP

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `http-status-codes` | HTTP Status Code Reference | `http-status` | `src/data/http-status-codes.ts` (filter UI in workspace) |

### Code formatting

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `css-formatter` | CSS Formatter / Minifier | `formatter` | `formatCss` |
| `html-formatter` | HTML Formatter / Minifier | `formatter` | `formatHtml` |
| `javascript-formatter` | JS Formatter / Minifier | `formatter` | `formatJs` — **lightweight, not Prettier/compiler** |
| `sql-formatter` | SQL Formatter | `formatter` | `formatSql` — **never executes SQL** |

### Cryptography

| Slug | Name | Kind | Logic |
|---|---|---|---|
| `hash-generator` | Hash Generator | `crypto-hash` | Web Crypto SHA-256/384/512 |
| `hmac-generator` | HMAC Generator | `crypto-hmac` | Web Crypto HMAC |

### Developer productivity

| Slug | Name | Kind | UI |
|---|---|---|---|
| `uuid-generator` | UUID Generator | `uuid` | `generateUuid` |
| `curl-to-fetch` | cURL to Fetch | `curl` | `curlToFetch` |
| `curl-to-axios` | cURL to Axios | `curl` | `curlToAxios` |
| `qr-code-generator` | QR Code Generator | `qr` | `qrcode` lazy |
| `markdown-previewer` | Markdown Previewer | `markdown` | Shared `renderMarkdown()` |
| `markdown-reader` | Markdown File Reader | `markdown-reader` | `MarkdownReaderTool.tsx` + `renderMarkdown()` |
| `code-compare` | Code Compare | `code-compare` | `CodeCompareTool.tsx` |
| `color-converter` | Color Converter | `color` | `convertColor` |

Logic files under `src/lib/tools/`: `json.ts`, `yaml.ts`, `csv.ts`, `xml.ts`, `encoding.ts`, `jwt.ts`, `regex.ts`, `timestamp.ts`, `color.ts`, `formatters.ts`, `crypto.ts`, `curl.ts`, `uuid.ts`, `markdown.ts`, `diff.ts`.

Tests: `json.test.ts`, `encoding.test.ts`, `misc.test.ts`, `diff.test.ts`, `markdown.test.ts`, plus `src/lib/seo.test.ts`, `files.test.ts`, `ads.test.ts`.

**Every new transformer needs tests.** Invalid input must return `{ ok: false, error }` (or equivalent) and must not crash the page.

---

## 8. How to add a new tool

Follow this order. Do not skip tests or SEO.

1. **Pure logic** in `src/lib/tools/your-tool.ts` + `your-tool.test.ts`.
2. **Register** in `src/data/tools.ts` (slug, category, kind, samples, how-to, limitations, FAQs, related slugs).
3. **SEO** in `src/data/tool-seo.ts` (title, description, searchTerms, intro, extra FAQs). Original copy — not scraped docs.
4. **Kind handling** in `src/components/ToolWorkspace.tsx` `run()` switch **or** a dedicated component under `src/components/tools/` if the UI is special (like compare / markdown reader).
5. If the kind is new, add it to `ToolKind` and optionally map a Lottie in `src/lib/animations/tutorial-lotties.ts`.
6. If file open makes sense, add the slug to `TOOL_UPLOADS` in `src/lib/files.ts`. Do **not** add upload to UUID / color / timestamp / QR unless there is a real file workflow.
7. Related slugs on sibling tools should point back.
8. Run `npm test`. Click the tool in the browser: sample, invalid input, copy, clear, fullscreen, light and dark.

`generateStaticParams` already maps all `TOOLS`, so a new registry entry creates a route. No new `page.tsx` is needed unless the tool is not a workspace child.

**Upgrade vs new page:** JWT Analyzer, Regex Debugger, cURL Analyzer, SQL Analyzer in Part III should **enhance existing slugs**, not mint parallel URLs.

---

## 9. Shared UX rules

Every tool page must keep:

- Breadcrumbs: Home → Developer Tools → Tool
- One H1 (tool name)
- One-sentence tagline
- Interactive workspace above the fold
- Primary action: Format / Convert / Generate / Validate
- Secondary: Copy, Download, Clear, Sample, Swap where relevant
- Accessible labels on editors
- Non-destructive errors (`ErrorMessage`)
- How to use, limitations, real example I/O, FAQ, related tools
- Keyboard usable; Esc exits fullscreen

### Workbench

`ToolWorkbench`: “Full screen” button; clicking the Workspace title also expands. Esc exits. Body scroll locked. Editors grow via `.tool-workbench-fullscreen` in `globals.css`.

### File open (not a server upload)

`src/lib/files.ts`:

- Max **2 MB**
- `FileReader.readAsText` only
- Validate extension before read
- JSON-style tools auto-run after a successful read
- Copy in UI: files never leave the device

Upload **on:** JSON/YAML/XML/CSV/formatters/markdown/cURL/regex test file / code compare.

Upload **off:** UUID, color, timestamp, QR.

### Markdown preview

Both Markdown tools call `renderMarkdown()` in `src/lib/tools/markdown.ts`:

- GitHub-flavored tables, strikethrough, and task lists (`marked` `gfm: true`)
- Fenced code highlighted with `highlight.js/lib/common` when a language tag is present (`js`, `json`, `ts`, `python`, `bash`, …)
- HTML sanitized with DOMPurify (`class` kept so highlight spans survive)
- Preview CSS: `.markdown-preview` plus `--syntax-*` tokens
- Light mode uses **dark** syntax colors (deep violet / teal / blue-700), not the site sky accent. Dark mode keeps cyan/violet on dark.
- Do not import highlight.js CSS; colors are token-based
- Not supported: Mermaid, math, GitHub alerts

### Actions

`ActionBar` holds primary + secondary buttons. Do not restyle primary actions to look like ads. Do not place `AdSlot` in `ActionBar` or beside `Editor`.

---

## 10. Design system

Dark-first. `<html>` ships with class `dark`. Toggle writes `localStorage["sr-theme"]` (`light` | `dark`) and toggles the `dark` class.

Tokens live in `src/app/globals.css`:

| Token | Light | Dark |
|---|---|---|
| `--background` | `#f3f6f8` | `#06080f` |
| `--foreground` | `#0b2533` | `#e2e8f0` |
| `--accent` | `#0284c7` | `#22d3ee` |
| `--accent-secondary` | `#7c3aed` | `#a78bfa` |
| `--muted` | `#4a6573` | `#94a3b8` |

Light mode should stay a **middle** cyan-gray, not ice-white and not dull gray. Soft orbs at 0.16 / 0.1 opacity. Do not crank glow.

Reusable classes: `.glass-panel`, `.btn-primary`, `.btn-secondary`, `.tool-card`, `.nav-link`, `.gradient-text`, `.section-label`, `.code-block`, `.badge`, `.ad-slot`.

Fonts: Geist Sans + Geist Mono (`next/font`). Monospace for code/data; sans for prose.

**Input/output size:** tool editors, output panels, Markdown source/preview, and Code Compare use **16px** (`text-base` / `.tool-textarea { font-size: 1rem }`). Buttons, labels, and directory search stay 14px.

Syntax tokens (Markdown preview only): `--syntax-keyword`, `--syntax-string`, `--syntax-number`, `--syntax-function`, `--syntax-attr`, `--syntax-comment`.

Logo: cyan crescent + violet shadow + diamond (`public/logo.svg`, `src/components/Logo.tsx`). Shiva/Om-inspired geometry — **not** a literal ॐ or deity. Favicons in `public/` and `src/app/icon.svg`.

Max content width: `max-w-6xl` for tools, `max-w-3xl` for legal pages.

Keep motion light. Tutorials are small. No heavy page animations.

---

## 11. SEO (as built)

Cannot promise rank #1 vs jsonformatter.org. We ship honest, unique pages and internals.

Per tool (`buildToolMetadata` / `buildToolJsonLd`):

- Unique `<title>` and meta description
- Canonical `https://shadowreference.dev/tools/{slug}`
- Keywords from `searchTerms`
- Open Graph + Twitter summary
- JSON-LD `@graph`: WebApplication, WebPage, BreadcrumbList, HowTo, FAQPage
- Site-level Organization + WebSite + ItemList in root layout

Homepage/tools copy is keyword-rich but not doorway spam. Footer lists popular tools (`POPULAR_TOOL_SLUGS` in `src/lib/seo.ts`).

Sitemap lastmod is currently hardcoded `2026-09-12` in `src/app/sitemap.ts` — bump when shipping material content changes.

No `/guides` section yet (optional in the original V1 spec, Part II).

---

## 12. What to build next (product roadmap)

Source of truth for **unbuilt** work: Part III below. Suggested order:

**P0**

1. JSON Analyzer (tree, types, nesting, sizes, inconsistent arrays) — new slug e.g. `json-analyzer`
2. JSON / API Diff — new slug e.g. `json-diff`
3. Error Log Analyzer
4. Git Diff Analyzer
5. HTTP Request Analyzer (upgrade/extend cURL tools rather than a hollow extra page if overlap is high)
6. Regex Debugger — **upgrade** `regex-tester`

**P1:** JWT Analyzer (upgrade `jwt-decoder`), env analyzer/diff, package.json analyzer, JSON Schema generate/validate, SQL Analyzer (upgrade `sql-formatter`), cURL Analyzer (upgrade existing cURL pages)

**Later:** log timeline, dependency diff, config structure diff, optional workspace that keeps several artifacts in one local session, optional AI **on top of** deterministic facts only.

Moat: artifact-first inspect/compare/validate. Do not compete with Cursor on code generation.

Definition of done for each new analyzer (Part III, Definition of Done): understood in 5 seconds, one-click sample, useful structured output, clear invalid-input error, copy/reset, data stays in browser, real SEO page.

---

## 13. Ads (implemented, off)

Full prior ads-only notes are folded here.

### Status

Slots and script exist. **Nothing renders** until `NEXT_PUBLIC_ADSENSE_CLIENT` is a real `ca-pub-` id. `AdSlot` returns `null`. `AdSenseScript` returns `null`. No empty dashed boxes.

### Enable

1. Apply at https://www.google.com/adsense/ for `https://shadowreference.dev`
2. Create **manual display units** — never Auto ads
3. `cp .env.example .env.local` and fill IDs
4. Set the same `NEXT_PUBLIC_*` vars on the host **build**
5. Rebuild. `next.config.ts` writes `public/ads.txt`:

```
google.com, pub-<digits>, DIRECT, f08c47fec0942fa0
```

`/public/ads.txt` is gitignored. Invalid/missing client deletes a stale file.

### Placement

| Surface | Slot |
|---|---|
| `/` | After featured tools |
| `/tools` | After the directory |
| `/tools/[slug]` | After FAQ; after related tools |
| about / privacy / terms / contact | none |

Labeled “Advertisement”. CSS: `.ad-slot` dashed, not a button.

### Legal

Privacy discloses AdSense cookies and that **tool input is not sent to Google or to us**. Terms say ads are optional and unlabeled-as-tools. About repeats the same privacy principle.

Files: `src/lib/ads.ts`, `src/lib/ads.test.ts`, `src/components/AdSlot.tsx`, `src/components/AdSenseScript.tsx`.

---

## 14. Privacy & security (non-negotiable)

- Tool inputs processed with JS / Web APIs in the browser
- FileReader is local; 2 MB cap
- Do not log tool input to analytics or error reporters
- Do not persist JWTs, API keys, HMAC secrets, .env contents in `localStorage`
- JWT decode ≠ signature verification — UI and copy must say so
- HMAC/hash: warn not to paste production secrets on shared devices
- Markdown/HTML preview is sanitized (`isomorphic-dompurify`)
- Mask obvious secrets in future HTTP/cURL/env analyzers
- Detection of secrets is heuristic — never claim 100%
- If a future feature must hit a network (opt-in request replay, AI), it must be explicit, documented in Privacy, and off by default

---

## 15. Hard constraints / do-not list

Copy these into any implementation prompt:

- No API routes in V1 (`output: "export"` cannot host them)
- No fabricated tool results; do not silently mutate user input
- JS formatter is lightweight — do not promise Prettier/Babel
- SQL is format-only — never execute
- JWT is decode-only
- Do not scrape or paste copyrighted docs into FAQs
- Do not keyword-stuff near-duplicate tools
- Do not put ads beside controls; do not use Auto ads
- Do not introduce Auto-ads, Google Analytics logging of payloads, or third-party scripts that see editor contents
- Do not rebuild Markdown Reader or Code Compare
- Do not add Node 18/20 workarounds; use 24
- Prefer existing CSS tokens over new palettes
- Verify UI in the browser (or tests + curl if no browser tools): main path, empty/error, related routes, light/dark

---

## 16. Conventions for code changes

- Match existing file style: named exports, `"use client"` only when needed
- `run()` in `ToolWorkspace` returns `{ ok: true, output }` / `{ ok: false, error }` patterns already used in `src/lib/tools`
- Keep components small; special UIs go in `src/components/tools/`
- After UI changes, check homepage, `/tools`, one formatter, markdown-reader, code-compare, privacy
- Do not rewrite `README.md` into a novel; update **this file** when product or architecture changes
- `doc.md`, `docv2.md`, and `BUILD.md` are stubs that point here

---

## 17. Known facts / gotchas

- Next 16 App Router `params` is a `Promise` (`tools/[slug]/page.tsx` already awaits it)
- Static export: no server components that fetch at request time; `dynamic = "force-static"` on sitemap/robots
- `next/script` is used for AdSense with `afterInteractive`
- Theme flash: `suppressHydrationWarning` on `<html>`; provider waits until mounted
- Lottie and QR are lazy so the main bundle stays smaller
- Vitest is **node**, not jsdom, for most tests — keep tool tests free of DOM unless you change config
- Optional dep `@tailwindcss/oxide-darwin-arm64` is for local Mac ARM
- Repo folder is `shadowreferenc` (typo) but product/domain is ShadowReference / shadowreference.dev

---

## 18. Suggested first tasks for a new AI session

If the user did not specify a task, ask. If they said “continue the product”:

1. **JSON Analyzer** (Part III, JSON Analyzer) — new tool, new tests, SEO, related links from JSON Formatter/Validator.
2. **JSON / API Diff** — reuse ideas from `src/lib/tools/diff.ts` / Code Compare, but structured JSON field diff, not only text.
3. Then Error Log Analyzer.

Do not start with accounts, AI, or Auto ads.

---

## 19. One-screen architecture

```
Browser
  └── Static Next export (Cloudflare / any static host)
        ├── Pages + JSON-LD + optional AdSense script
        └── Client bundles
              ├── ToolWorkspace / special tools
              └── src/lib/tools/*  (pure, tested)
                    └── Web Crypto / FileReader / DOMParser / js-yaml / marked
```

No server sees the payload. Ads, if on, load from Google independently of editors.

---

*Handoff written for humans and coding agents. Prefer this file over chat memory.*

---

# Part II — Original V1 product specification

Historical spec used to build V1. Requirements for each formatter/converter still apply. Status notes:

- V1 tools listed below are **shipped** (plus Markdown Reader and Code Compare).
- Ads are **wired but off** (see Part I §13). Do not treat “do not implement ads in V1” as current.
- Stack, routes, and file map in Part I supersede the suggested structure here.
- Optional `/guides` was never built.

ShadowReference — Product & Build Specification
Static developer toolkit built with Next.js

1. Product Overview
   ShadowReference is a fast, privacy-friendly developer toolkit containing practical browser-based utilities for developers. Version 1 should be static/client-side: no backend, no database, no login, and no server-side processing. Tool logic should run in the user's browser whenever technically possible.
   Primary goals:
   - Fast loading and excellent Core Web Vitals.
   - Each tool has its own indexable URL and useful explanatory content.
   - Responsive desktop/mobile UI.
   - Copy, download, clear, swap, sample-input and validation actions where relevant.
   - No user input should be sent to a server for client-side tools.
   - Architecture should allow future API/AI features without rewriting the application.
2. Recommended Stack
   - Next.js (App Router) with TypeScript.
   - Static/client-side implementation; avoid API routes for V1.
   - Tailwind CSS or clean CSS modules; keep dependencies minimal.
   - Use browser Web APIs and native JavaScript where sufficient.
   - Deploy as a static-compatible Next.js site on Cloudflare.
   - Use reusable ToolLayout, ToolHeader, Editor, OutputPanel, ActionBar, CopyButton, DownloadButton and FAQ components.
3. Information Architecture
   - / — homepage with search, categories and featured tools.
   - /tools — complete tool directory.
   - /tools/json-formatter
   - /tools/json-validator
   - ... one canonical route per tool.
   - /about, /privacy, /terms, /contact
   - Optional /guides section for original developer explanations.
4. V1 Tool Set — 30 Tools
5. JSON Formatter & Validator
   Format JSON with 2/4-space indentation, validate syntax, show line/column error when possible, copy and download result, minify toggle, sample JSON.
6. JSON Minifier
   Remove unnecessary whitespace from valid JSON, validate before minifying, copy/download, show input/output size.
7. JSON to TypeScript
   Convert representative JSON objects into TypeScript interfaces/types, support nested objects and arrays, configurable root type name, copy/download.
8. JSON to CSV
   Convert arrays of JSON objects into CSV, detect columns, handle missing fields, escaping and nested values sensibly, copy/download CSV.
9. JSON ↔ YAML
   Convert valid JSON to YAML and YAML to JSON. Show validation errors and copy/download actions.
10. JWT Decoder
    Decode JWT header and payload locally without verifying signatures. Display readable JSON, token parts, expiration timestamp when present, and an explicit note that decoding is not verification.
11. Base64 Encoder / Decoder
    Encode/decode UTF-8 text using browser APIs where available. Handle invalid input gracefully and provide copy/clear/swap.
12. URL Encoder / Decoder
    Encode/decode URL components and full URLs. Provide separate encode/decode actions and safe error messages.
13. HTML Entity Encoder / Decoder
    Convert characters to HTML entities and decode entities back to text. Include common examples.
14. URL Parser
    Parse a URL into protocol, username, host, port, pathname, query parameters and hash. Allow editing parameters and copying parsed values.
15. UUID Generator
    Generate UUID v4 values locally. Allow quantity selection within a safe limit, one-click copy and newline/CSV output.
16. Regex Tester
    Enter regex and test text, support flags, highlight matches, show match groups/indexes and provide common regex examples. Use safe client-side execution.
17. Regex Escape / Unescape
    Escape regex metacharacters for literal matching and unescape supported sequences where safe.
18. Timestamp Converter
    Convert Unix seconds/milliseconds to local/UTC date-time and convert date-time to Unix timestamps. Include current timestamp button.
19. Date & Time Converter
    Convert between ISO 8601, local date/time, UTC and common readable formats. Show timezone explicitly.
20. HTTP Status Code Reference
    Search/filter HTTP status codes, display code, category, meaning and typical use. Include 1xx–5xx reference content.
21. Color Converter
    Convert HEX, RGB, RGBA, HSL and HSLA values. Include color preview, copy buttons and validation.
22. CSS Formatter / Minifier
    Format CSS for readability and minify CSS by removing unnecessary whitespace/comments while preserving valid content as far as possible.
23. HTML Formatter / Minifier
    Format HTML with indentation and minify it while preserving text/attributes. Provide warnings for malformed markup when detectable.
24. JavaScript Formatter / Minifier
    Provide a lightweight browser-based formatter/minifier. Clearly label it as lightweight and avoid promising full compiler-level transformations.
25. SQL Formatter
    Format common SQL with indentation and keyword spacing. Support common SELECT/INSERT/UPDATE/DELETE syntax; do not execute SQL.
26. Markdown Previewer
    Split editor/preview view, render Markdown safely, copy Markdown, and provide sample content. Sanitize rendered HTML.
27. CSV ↔ JSON
    Convert CSV to JSON and JSON arrays to CSV with configurable delimiter, headers and escaping.
28. YAML Validator
    Validate YAML and show useful parse errors. Provide formatted/normalized output where supported.
29. XML Formatter / Validator
    Format XML and validate well-formedness using browser XML parsing. Show parse errors and copy/download.
30. Hash Generator
    Generate SHA-256, SHA-384 and SHA-512 hashes using Web Crypto API. Explain that hashing is one-way.
31. HMAC Generator
    Generate HMAC using Web Crypto API for supported algorithms. Keep secret entirely client-side and clearly warn users not to paste production secrets into shared/public environments.
32. cURL to Fetch
    Convert common cURL requests into JavaScript fetch code. Support URL, method, headers and common data flags; clearly state unsupported flags.
33. cURL to Axios
    Convert common cURL requests into Axios JavaScript/TypeScript snippets.
34. QR Code Generator
    Generate QR codes for text, URLs and other small payloads entirely in-browser. Provide PNG/SVG download if the chosen client-side library supports it.
35. Standard Tool Page UX
    - Breadcrumbs: Home > Category > Tool.
    - H1 containing the tool name.
    - One-sentence value proposition.
    - Main interactive tool above the fold.
    - Primary actions: Run/Format/Convert/Generate; secondary actions: Copy, Download, Clear, Swap as applicable.
    - Input/output panels with accessible labels and keyboard support.
    - Error state must be clear, non-destructive and actionable.
    - Example/sample input button.
    - How to use section.
    - What the tool does / limitations section.
    - Example section with real input/output.
    - FAQ with original, tool-specific questions.
    - Related tools section.
    - Do not put ads directly beside buttons, inputs or controls.
36. SEO Requirements
    Every tool must be a real, useful page rather than a thin page containing only an input box. Google states that AdSense-ready pages should provide unique, relevant content, clear navigation and a good user experience.
    - Unique title and meta description per tool.
    - Canonical URL per tool.
    - One H1 and logical H2/H3 structure.
    - Useful original explanation of the tool, not copied documentation.
    - Tool-specific examples and FAQs.
    - Internal links to related tools.
    - Breadcrumb structured data where appropriate.
    - WebApplication/SoftwareApplication structured data only when accurate and appropriate.
    - XML sitemap and robots.txt.
    - Open Graph and Twitter/X metadata.
    - 404 page and sensible redirects.
    - No doorway pages or keyword-stuffed near-duplicates.
37. AdSense/Monetization Considerations
    - Do not implement ads in V1 until the site has substantial, useful content and is fully functional.
    - Ads must never resemble buttons or be placed so close to interactive controls that accidental clicks are likely.
    - Do not encourage users to click ads.
    - Do not build pages primarily to display ads.
    - Keep tool functionality and explanatory content as the primary value of every page.
    - Create Privacy Policy, Terms, Contact and About pages before monetization.
    - Do not send user tool inputs to a server unless a future feature explicitly requires it and the privacy implications are documented.
38. Design System
    - Clean developer-focused interface; modern but not visually heavy.
    - Desktop: centered max-width content with optional left category navigation.
    - Mobile: stacked editor/output panels.
    - Dark and light mode.
    - Monospace font for code/data areas; readable sans-serif for explanations.
    - Consistent button hierarchy and status/error components.
    - Keyboard-friendly controls.
    - Do not use excessive animations.
    - Persist only harmless UI preferences such as theme in localStorage.
39. Security & Privacy
    - Client-side tools should not transmit input data to any backend.
    - Never log tool input to analytics.
    - Do not store secrets, JWTs, API keys or passwords in localStorage.
    - Sanitize Markdown/HTML preview output to prevent XSS.
    - Use Web Crypto APIs for cryptographic operations where possible.
    - Clearly distinguish decoding from verification for JWTs.
    - Add a privacy note on tools that may receive sensitive-looking data.
40. Performance Requirements
    - Prefer server-rendered/static page content with client components only around interactive tool logic.
    - Lazy-load heavy libraries such as QR generation or advanced parsers.
    - Avoid loading every tool's JavaScript on the homepage.
    - Use code splitting by route.
    - Keep third-party scripts to a minimum.
    - Target excellent Lighthouse performance and Core Web Vitals.
    - No backend request should be required for the core V1 tool functionality.
41. Suggested Project Structure
    src/
    app/
    page.tsx
    tools/
    page.tsx
    json-formatter/page.tsx
    json-validator/page.tsx
    json-minifier/page.tsx
    json-to-typescript/page.tsx
    ...
    about/page.tsx
    privacy/page.tsx
    terms/page.tsx
    contact/page.tsx
    sitemap.ts
    robots.ts
    components/
    ToolLayout.tsx
    ToolHeader.tsx
    Editor.tsx
    OutputPanel.tsx
    ActionBar.tsx
    CopyButton.tsx
    DownloadButton.tsx
    ErrorMessage.tsx
    ExampleInput.tsx
    RelatedTools.tsx
    FAQ.tsx
    lib/
    tools/
    json.ts
    jwt.ts
    regex.ts
    timestamp.ts
    color.ts
    csv.ts
    yaml.ts
    xml.ts
    crypto.ts
    curl.ts
    data/
    tools.ts
    http-status-codes.ts
    styles/
    globals.css
42. Implementation Rules for Cursor
    - Build V1 completely before adding AI, accounts, payments or a database.
    - Use TypeScript strict mode.
    - Do not create a separate backend for V1.
    - Do not use an external API for a tool that can run reliably in the browser.
    - Every tool must have unit tests for its core transformation/validation logic.
    - Handle malformed input without crashing the page.
    - Keep tool logic separate from UI components so it is testable.
    - Add accessible labels, focus states and keyboard navigation.
    - Do not fabricate tool results or silently modify user input.
    - Add sample inputs and expected outputs for each tool.
    - Do not place ads during initial development; reserve clearly defined ad slots for a later monetization phase.
    - Use reusable components rather than duplicating the same UI on every page.
43. Acceptance Criteria
    - All 30 tools have individual working routes.
    - All tools work without a backend or database.
    - All core transformations happen locally in the browser.
    - No console errors in normal use.
    - Invalid input produces useful error messages.
    - Copy/download actions work where applicable.
    - Mobile and desktop layouts are usable.
    - Every tool has unique metadata and explanatory content.
    - Navigation/search can discover every tool.
    - Sitemap and robots.txt are generated.
    - Privacy, Terms, About and Contact pages exist.
    - The application can be deployed as a static Next.js site.
44. Future Expansion (Do Not Build in V1)
    - AI code explanation/generation.
    - User accounts and saved history.
    - Cloud-saved snippets.
    - Premium tools/subscriptions.
    - Team workspaces.
    - Server-side PDF/image processing.
    - Public API.
    - Personalized dashboards.
45. Product Positioning
    ShadowReference should feel like a developer's dependable reference desk: a place to quickly solve small technical problems without unnecessary setup, login or data upload.
    Suggested tagline: “The developer reference desk for everyday problems.”
46. Cursor Instruction — Build Order
    1.Step 1: Create the Next.js TypeScript project and global design system.
    2.Step 2: Build shared layout/navigation/search/theme components.
    3.Step 3: Build the tool registry and category model.
    4.Step 4: Implement the first 10 highest-priority tools.
    5.Step 5: Add tests and error handling.
    6.Step 6: Implement the remaining 20 tools.
    7.Step 7: Add SEO metadata, sitemap, robots and structured data.
    8.Step 8: Add About, Privacy, Terms and Contact pages.
    9.Step 9: Run Lighthouse, accessibility and responsive checks.
    10.Step 10: Prepare static deployment; do not add backend/database.
47. Priority Categories
    - Data & JSON
    - Encoding & URL
    - Security & Tokens
    - Regex & Text
    - Date & Time
    - Web & HTTP
    - Code Formatting
    - Data Conversion
    - Cryptography
    - Developer Productivity

Note for Cursor: Treat this document as the product specification. Make reasonable implementation decisions without asking for confirmation for every small detail, but do not add backend infrastructure, authentication, payments or AI unless explicitly requested.


---

# Part III — Remaining tools roadmap (analyzers, compare, debug)

Unbuilt product layer. Implement this next. Markdown Reader and Code Compare are already shipped — do not rebuild them. Upgrade JWT / regex / cURL / SQL in place instead of new duplicate slugs.

Workbench UI is already finished. Start at JSON Analyzer.

ShadowReference
Development Tools Roadmap
Product specification for the remaining developer tools

1. Product Direction
   ShadowReference should not become another generic collection of developer utilities. It should help developers inspect, compare, understand, validate, and debug real development artifacts quickly.
   Core positioning: “Cursor helps you build it. ShadowReference helps you inspect it.”
2. Tools Already Completed
   - Markdown Reader — render and read Markdown comfortably.
   - Code Comparing — compare two code/text inputs and highlight changes.
3. Recommended Remaining V1 Tools
   Priority Tool Input Core output Why
   P0 JSON Analyzer JSON / API response Tree, types, nesting, arrays, nulls, key counts, payload size, inconsistencies Very common and highly visual
   P0 JSON / API Diff Old + new JSON Added, removed, changed fields; type changes; breaking-change warnings Excellent API debugging use case
   P0 Error Log Analyzer Stack traces / logs Errors, warnings, timestamps, files, line numbers, repeated patterns, timeline Daily debugging problem
   P0 Git Diff Analyzer git diff Changed files, additions/deletions, risky patterns, summary Makes large diffs easier to review
   P0 HTTP Request Analyzer cURL / request data Method, URL, params, headers, body, content type, security checks Useful during API debugging
   P0 Regex Debugger Regex + test strings Match highlighting, groups, indexes, token explanation, test results Interactive and visual
   P1 JWT Analyzer JWT Header/payload, claims, expiry, timestamps, size, security notes Common in API/auth work
   P1 Environment Config Analyzer .env / config Variables, duplicates, missing values, suspicious secrets/URLs Catches configuration mistakes
   P1 Environment Diff Two config files Added, removed, changed variables and values Useful for dev/staging/prod debugging
   P1 package.json Analyzer package.json Scripts, dependencies, version patterns, suspicious configuration Strong JS/RN audience fit
   P1 JSON Schema Generator + Validator JSON + schema Generate schema; validate data; exact violations Useful for API contracts
   P1 SQL Analyzer SQL Formatting, joins, subqueries, suspicious patterns, complexity indicators Broad developer audience
   P1 cURL Analyzer cURL command Structured request plus Fetch/Axios equivalents Excellent API companion
   P2 Log Timeline Analyzer Application logs Timeline, levels, durations, repeated errors Strong debugging utility
   P2 Dependency Diff Two package.json / lockfiles Added, removed, upgraded packages Useful during upgrades
   P2 Config Structure Diff Two JSON/YAML configs Structural comparison independent of key order Useful for configuration debugging
4. Detailed Requirements
   JSON Analyzer
   - Accept valid JSON and provide a readable tree view.
   - Show primitive/object/array/null types, nesting depth, object/array/key counts and approximate payload size.
   - Detect inconsistent structures inside arrays, such as fields changing type.
   - Support expand/collapse, key search, path copy, selected JSON copy and sample data.
   - Keep analysis fully client-side in V1.
   JSON / API Diff
   - Accept old and new JSON and compare recursively.
   - Highlight added, removed and changed fields.
   - Detect type changes separately from value changes.
   - Show summary counts and breaking-change warnings for removed fields/type changes.
   - Allow filtering to added/removed/changed.
   Error Log Analyzer
   - Accept pasted logs or stack traces.
   - Recognize common timestamps, log levels, HTTP status codes, exceptions, file paths and line numbers where possible.
   - Group repeated errors and show an event timeline.
   - Separate primary errors from surrounding informational lines.
   - Use 'possible issue' wording rather than claiming unsupported root causes.
   Git Diff Analyzer
   - Parse unified git diff text: files, hunks, additions, deletions and renames where possible.
   - Show file-level and overall statistics.
   - Detect deterministic risk patterns such as dependency changes, environment files, broad deletions and debug statements.
   - Keep the output advisory rather than pretending to be a complete code review.
   HTTP Request Analyzer
   - Accept cURL and structured request data.
   - Parse method, URL, query parameters, headers, cookies and body.
   - Display a clean request inspector and basic security checks.
   - Mask obvious credential-like values.
   - Provide copyable Fetch and Axios examples.
   Regex Debugger
   - Accept regex and test input.
   - Highlight matches; show capture groups, indexes and match text.
   - Explain common regex tokens and support common flags.
   - Show why sample strings pass or fail using deterministic matching.
   JWT Analyzer
   - Parse JWT header and payload locally.
   - Show exp, iat, nbf, iss, aud and sub when present.
   - Convert timestamps to readable dates and show expiration status.
   - Show token/header/payload sizes.
   - Clearly state that decoding does not verify the signature.
   Environment Config Analyzer
   - Accept .env-style text.
   - Detect duplicate keys, empty values, likely secrets, production URLs, localhost URLs and suspicious HTTP URLs.
   - Mask sensitive-looking values by default.
   - Never store or upload input in V1.
   Environment Diff
   - Compare two .env/config inputs.
   - Show added, removed and changed keys.
   - Highlight URLs, feature flags, ports and boolean-like changes.
   - Allow filtering to differences only and avoid unnecessary secret exposure.
   package.json Analyzer
   - Parse package.json and display scripts and dependency categories.
   - Detect duplicate packages across dependency sections where applicable.
   - Flag malformed or obviously unusual version ranges.
   - Show package and script counts.
   - Do not claim a package is outdated without a live registry.
   JSON Schema Generator + Validator
   - Generate schema from sample JSON with nested objects and arrays.
   - Represent nullable or variable fields carefully.
   - Allow editing the generated schema.
   - Validate JSON and show exact failing paths.
   - Keep generation deterministic.
   SQL Analyzer
   - Format SQL without intentionally changing semantics.
   - Detect joins, subqueries, grouping, ordering, unions and repeated conditions.
   - Provide complexity indicators and common risky patterns.
   - Never execute SQL.
   - Make clear that database-specific query planning is not performed.
   cURL Analyzer
   - Parse common cURL flags.
   - Show method, URL, headers, query parameters, cookies and body.
   - Generate equivalent Fetch and Axios code.
   - Highlight and mask likely secrets.
   - Keep parsing client-side.
   Log Timeline Analyzer
   - Parse common timestamp formats where possible.
   - Group events chronologically and detect error bursts/repeated events.
   - Calculate durations when start/end information exists.
   - Allow filtering by level or keyword.
   Dependency Diff
   - Compare dependency sets and versions.
   - Show added, removed and changed packages.
   - Highlight major-version changes.
   - Support package.json first; lockfile parsing can be later.
   Config Structure Diff
   - Compare JSON/YAML structures recursively.
   - Ignore ordering where appropriate.
   - Show path-based changes and separate structural changes from value changes.
5. Product Structure
   - Analyze — JSON, API responses, logs, package.json, JWT, SQL.
   - Compare — JSON/API diff, code compare, environment diff, dependency diff, config diff.
   - Debug — error logs, HTTP requests, regex, API payloads.
   - Validate — JSON Schema, JSON, configuration structure.
   - Read — Markdown Reader and future developer reference pages.
6. Shared UX Requirements
   - Every tool needs a clear title, one-sentence explanation, input area, action, and result workspace.
   - Include sample data so users understand the tool immediately.
   - Support copy, clear/reset, download where useful, and keyboard-friendly interactions.
   - Use tabs/panels for large results; provide useful empty and invalid-input states.
   - Keep the UI fast, responsive, accessible, and mobile-friendly.
   - Do not place ads next to controls in a misleading way.
7. Privacy & Security
   - V1 should be client-side wherever technically possible.
   - Do not upload code, tokens, logs, environment files, API responses or credentials.
   - Do not persist sensitive input in localStorage by default.
   - Mask obvious secrets in HTTP, cURL and environment tools.
   - Do not make security claims stronger than the analysis supports.
8. Next.js / Cloudflare Architecture
   - Next.js App Router + TypeScript.
   - Separate reusable analysis functions from UI components.
   - One route per tool for SEO and sharing, e.g. /tools/json-analyzer and /tools/json-diff.
   - Static deployment on Cloudflare for V1.
   - No database, authentication or backend API required for deterministic V1.
   - Future AI functionality can use an optional Cloudflare Worker/API layer.
9. SEO Requirements
   - Each important tool gets a dedicated indexable page.
   - Each page needs unique title, meta description, H1, useful explanation, examples and FAQ.
   - Do not create thin pages containing only an input box.
   - Explain what the tool does, when developers use it, and how to interpret results.
   - Use internal links between related tools.
10. Implementation Order
11. Finish shared Tool Workbench UI.
12. JSON Analyzer.
13. JSON/API Diff.
14. Error Log Analyzer.
15. Git Diff Analyzer.
16. HTTP Request Analyzer + cURL Analyzer.
17. Regex Debugger.
18. JWT Analyzer.
19. Environment Config Analyzer + Environment Diff.
20. package.json Analyzer.
21. JSON Schema Generator + Validator.
22. SQL Analyzer.
23. Log Timeline Analyzer.
24. Dependency Diff + Config Structure Diff.
25. Final SEO, accessibility, performance, privacy and security pass.
26. Do Not Prioritize in V1
    - Do not build dozens of generic encoders/converters.
    - Do not compete with AI coding assistants on code generation.
    - Do not add accounts or a database without a real requirement.
    - Do not add AI to every tool; deterministic analysis is the default.
    - Do not claim live package/version information without a live data source.
27. Definition of Done
    - A developer understands the tool within 5 seconds.
    - Sample data can be loaded with one click.
    - Valid input produces useful structured results immediately.
    - Invalid input produces a clear actionable error.
    - Copy/reset works reliably.
    - Sensitive data stays in the browser for V1.
    - Each tool has a dedicated SEO-friendly page with substantive content.
    - No core tool requires an API key or paid service.
    Final Product Principle
    Paste an artifact → ShadowReference analyzes it → the developer gets structured, visual, deterministic answers → they copy the useful result and continue working.

28. Product Moat & AI-Resistant Features
    Goal: Make ShadowReference more than a collection of utilities. Generic AI assistants are strong at generating explanations and code; ShadowReference should specialize in inspecting real developer artifacts, comparing actual states, validating deterministic rules, and supporting repeatable debugging workflows.
    Core positioning: "Cursor helps you build it. ShadowReference helps you inspect, debug, compare and verify it."
    13.1 Artifact-First Experience
    Organize the product around the artifact a developer is holding, not only around individual tools.
    - Accept real artifacts: JSON, API responses, cURL, HTTP requests, JWTs, logs, stack traces, Git diffs, .env/config files, package.json, SQL, regex, YAML, OpenAPI and GraphQL where supported.
    - Detect the likely artifact type when practical and suggest relevant tools.
    - After analysis, surface next actions such as compare, validate, security inspection, schema/mock generation, code generation, or adding the artifact to a workspace.
    - Keep results deterministic and transparent: show exactly what was detected and how it was calculated.
    13.2 Developer Debugging Workspace
    Allow developers to combine multiple artifacts for one real debugging problem.
    - Create a local session containing Request, Response, Previous Response, Error Logs, Git Diff, Environment Config and JWT when relevant.
    - Allow artifacts to flow between tools without re-pasting where practical.
    - Show a simple workflow: artifact → analysis → comparison → validation → findings.
    - Keep sessions local/client-side in V1; no account or database required.
    - Allow clear/export when useful without silently uploading sensitive data.
    - Design for future optional team/cloud features without making them mandatory.
    13.3 Large Artifact Analysis
    Optimize for inputs that are difficult to inspect manually or in a normal chat window.
    - Support large JSON payloads and logs efficiently within browser limits.
    - Show deterministic counts, sizes, repeated structures and other summaries.
    - For JSON, identify unusually large fields or branches.
    - For logs, group repeated events/errors and identify bursts and timeline patterns.
    - For Git diffs, show file-level statistics and change hotspots.
    - Use virtualization, lazy rendering, Web Workers and incremental parsing where appropriate.
    13.4 API Contract & Schema Evolution
    - Compare old and new API responses recursively.
    - Distinguish added, removed, changed and type-changed fields.
    - Identify likely breaking changes separately from non-breaking changes.
    - Generate JSON Schema from representative responses and validate new responses.
    - Show exact failing paths during validation.
    - Provide a schema evolution view showing how an API response changes between versions.
    - Later support OpenAPI inspection and API contract checks without executing or modifying the user's API.
    13.5 API Request Replay & Response Comparison
    - Parse cURL into a structured request inspector.
    - Allow users to edit request parameters, headers and body.
    - Optionally execute a request only after explicit user action.
    - Show status, timing, headers and response size.
    - Compare responses from multiple executions.
    - Never send requests automatically.
    - Warn users that requests may contain credentials or sensitive data.
    - If a backend proxy is ever required, make it explicit opt-in and document exactly what is transmitted.
    13.6 Security & Secret Detection
    - Detect likely API keys, bearer tokens, private-key patterns, passwords, secrets and cookies using conservative pattern matching.
    - Mask sensitive-looking values by default.
    - Flag HTTP URLs where HTTPS may be expected.
    - Detect potentially sensitive fields such as email, phone, token and password where feasible.
    - Explain that detection is heuristic and can produce false positives/negatives.
    - Never send detected secrets to a remote service in V1.
    13.7 Deterministic Verification
    - JSON and JSON Schema validation.
    - Regex matching and capture-group inspection.
    - API response contract comparison.
    - Environment/config consistency checks.
    - Dependency version and major-version comparison.
    - Git diff statistics and deterministic risk-pattern detection.
    - SQL structural analysis without executing the query.
    - HTTP/cURL parsing and normalization.
    - JWT claim/timestamp inspection, clearly separated from cryptographic signature verification.
    13.8 Request → Response → Error Chain
    - Request Analyzer → inspect request.
    - API Response Analyzer → inspect response.
    - API Diff → compare against a known-good response.
    - Schema Validator → verify the response contract.
    - Error Log Analyzer → inspect resulting errors.
    - Environment Diff → check configuration differences.
    - Git Diff Analyzer → inspect related code changes.
    - Workspace → keep the investigation together.
    13.9 Smart Next Actions
    - JSON Analyzer → Compare, Generate Schema, Validate, Inspect Large Fields.
    - JWT Analyzer → Check Expiry, Inspect Claims, Compare Tokens.
    - cURL Analyzer → Open HTTP Inspector, Generate Fetch, Generate Axios.
    - Git Diff Analyzer → Inspect Environment Changes, Inspect Dependency Changes.
    - Error Log Analyzer → Open Timeline, Group Repeated Errors, Inspect Related Request.
    - Environment Analyzer → Compare Environments, Mask/Reveal Sensitive Values.
    13.10 Optional AI Layer — Only Where It Adds Value
    - Calculate facts locally first; optionally let AI explain those facts.
    - AI may summarize findings, suggest debugging hypotheses, explain an unusual diff, or create an incident summary.
    - AI must not replace core parsers, comparators or validators.
    - The product must remain useful with AI disabled.
    - Clearly distinguish computed facts from AI-generated suggestions.
    - Use a Cloudflare Worker/API layer only when remote AI processing is explicitly required.
    13.11 SEO Moat Through Useful Workflows
    - Create pages around developer problems, not only tool names.
    - How to find breaking changes in an API response.
    - How to compare two large JSON responses.
    - How to find why an API response became larger.
    - How to debug a JWT that suddenly expired.
    - How to compare staging and production environment variables.
    - How to inspect a Git diff before merging.
    - How to analyze thousands of application log lines.
    - How to detect sensitive values in API responses and configuration files.
    13.12 Product Differentiation Principle
    Do not try to beat ChatGPT, Cursor or other AI coding assistants at code generation. ShadowReference should own the workflow of taking a real artifact and turning it into structured, visual, deterministic evidence that helps a developer understand what happened and what to check next.
29. Cursor Implementation Instructions for the New Product Layer
    - Before implementing anything, inspect the existing Markdown Reader and Code Comparing tools. They are already completed and MUST NOT be rebuilt or duplicated.
    - Reuse existing layout, components, styling, workbench patterns, buttons, input/output behavior, responsive behavior and conventions wherever practical.
    - Create shared primitives only when equivalent components do not already exist.
    - Keep analysis engines independent from React UI. Put deterministic parsing/comparison logic in reusable TypeScript modules with tests.
    - Prefer client-side processing. Use Web Workers for heavy parsing where needed.
    - Do not introduce a database, authentication or backend unless a feature explicitly requires it.
    - Do not add AI merely to make a tool look intelligent.
    - Implement artifact detection and smart next actions incrementally after core analyzers are stable.
    - Keep privacy/security behavior explicit in both UI and documentation.
    - Do not silently transmit user input anywhere.
30. Suggested Future Product Evolution
    Phase A — Core tools: Build the existing roadmap: Analyze, Compare, Debug, Validate and Read.
    Phase B — Connected workflows: Connect tools through Smart Next Actions and the local Debugging Workspace.
    Phase C — Large artifact engine: Optimize parsing/rendering for large JSON, logs and diffs.
    Phase D — API workflows: Add explicit opt-in request execution and response comparison where appropriate.
    Phase E — Optional AI: Add AI explanations and hypotheses on top of deterministic findings.
    Phase F — Premium/team features: Only after demand: saved cloud workspaces, collaboration, history, team sharing and advanced API monitoring.
31. Updated Final Product Principle
    Paste an artifact → ShadowReference detects and analyzes it → the developer gets structured, visual, deterministic answers → ShadowReference suggests the next useful action → the developer can compare, validate, debug or connect the artifact to a local workspace → the developer copies the useful result and continues working.
32. Ads & Monetization (implemented, off until configured)
    - Use manual display units only. Do not enable Auto ads.
    - Slots: homepage after featured tools; /tools after the directory; tool pages after FAQ and after related tools.
    - No ad units on about, privacy, terms, or contact.
    - Ads are labeled “Advertisement” and sit below the workbench — never beside Format, Upload, or editors.
    - public/ads.txt is generated at build from the publisher ID.
    - Privacy and Terms disclose AdSense. Tool inputs are still never uploaded.
    - Do not encourage ad clicks. Do not build pages primarily to display ads.
