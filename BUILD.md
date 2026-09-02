# ShadowReference — Build Summary

What was built for this project, based on `doc.md`.

## Product

**ShadowReference** is a static, privacy-friendly developer toolkit.

- Tagline: *The developer reference desk for everyday problems.*
- Stack: Next.js (App Router) + TypeScript + Tailwind CSS
- All tools run **client-side** — no backend, no database, no login
- Static export ready (`output: "export"`) for Cloudflare / static hosts
- Requires **Node.js ≥ 20.9**

## Commands

```bash
source ~/.nvm/nvm.sh && nvm use 20
npm install
npm run dev      # http://localhost:3000
npm test         # vitest unit tests
npm run build    # static production build
```

## Architecture

```
src/
├── app/                      # Routes (home, tools, about, privacy, terms, contact)
│   ├── tools/[slug]/        # One page per tool (SSG)
│   ├── sitemap.ts
│   └── robots.ts
├── components/               # Shared UI
│   ├── ToolLayout.tsx
│   ├── ToolTutorial.tsx      # Lottie tutorial + sample I/O
│   ├── ToolWorkspace.tsx     # Interactive tool shell
│   ├── Header / Footer / ThemeProvider
│   └── tools/                # Special UIs (Markdown reader, Code compare)
├── data/
│   ├── tools.ts              # Tool registry (routes, SEO, FAQs, samples)
│   └── http-status-codes.ts
├── lib/
│   ├── tools/                # Pure, testable transformation logic
│   ├── animations/           # Lottie tutorial animations by tool kind
│   └── utils.ts
└── app/globals.css           # Design system (dark-first, glass, accents)
```

**Design rule:** keep tool logic in `src/lib/tools/` separate from UI so it stays testable.

## Design system

- Dark-first theme (light mode toggle in header)
- Cyan + violet gradient accents
- Grid background + soft glow orbs
- Glass-morphism panels
- Monospace accents for a developer feel
- Reusable: `Editor`, `OutputPanel`, `ActionBar`, `CopyButton`, `DownloadButton`, `ErrorMessage`, `FAQ`, `RelatedTools`

## Pages & SEO

| Route | Purpose |
|---|---|
| `/` | Homepage — search, categories, featured tools |
| `/tools` | Full tool directory |
| `/tools/[slug]` | Individual tool pages |
| `/about`, `/privacy`, `/terms`, `/contact` | Static info pages |
| `/sitemap.xml`, `/robots.txt` | SEO |
| Custom `404` | Not found |

Each tool page has unique title/description, canonical URL, Open Graph metadata, and WebApplication JSON-LD.

## Tools shipped

33+ browser tools across these categories:

### Data & JSON
- JSON Formatter
- JSON Validator
- JSON Minifier
- JSON to TypeScript
- YAML Validator

### Data Conversion
- JSON to CSV
- JSON ↔ YAML
- CSV ↔ JSON
- XML Formatter / Validator

### Encoding & URL
- Base64 Encoder / Decoder
- URL Encoder / Decoder
- HTML Entity Encoder / Decoder
- URL Parser

### Security & Tokens
- JWT Decoder (decode only — not verification)

### Regex & Text
- Regex Tester
- Regex Escape / Unescape

### Date & Time
- Timestamp Converter
- Date & Time Converter

### Web & HTTP
- HTTP Status Code Reference

### Code Formatting
- CSS Formatter / Minifier
- HTML Formatter / Minifier
- JavaScript Formatter / Minifier (lightweight)
- SQL Formatter

### Cryptography
- Hash Generator (SHA-256 / 384 / 512 via Web Crypto)
- HMAC Generator

### Developer Productivity
- UUID Generator
- cURL to Fetch
- cURL to Axios
- QR Code Generator
- Markdown Previewer
- **Markdown File Reader** — open `.md` files locally (drag/drop), live preview
- **Code Compare** — side-by-side / unified diff of two code blocks
- Color Converter

## Shared tool UX

Every tool page includes:

1. Breadcrumbs + H1 + tagline
2. **Lottie tutorial** with synced sample input → run → sample output
3. Interactive workspace (format / convert / generate, etc.)
4. Copy / Download / Clear / Sample / Swap where relevant
5. How-to steps, limitations, examples, FAQ, related tools
6. Privacy notes on sensitive tools (JWT, HMAC, hashes)

## Tutorials (Lottie)

- Component: `src/components/ToolTutorial.tsx`
- Animations: `src/lib/animations/tutorial-lotties.ts`
- Styles mapped by tool `kind` (workflow, dual, compare, document, token, generate, reference)
- Sample input/output panels glow in sync with tutorial steps
- Play / Pause control

## Tests

Unit tests for core logic (Vitest):

- `src/lib/tools/json.test.ts`
- `src/lib/tools/encoding.test.ts`
- `src/lib/tools/misc.test.ts`
- `src/lib/tools/diff.test.ts`
- `src/lib/tools/markdown.test.ts`

Run with `npm test`.

## Dependencies (notable)

| Package | Why |
|---|---|
| `js-yaml` | YAML parse/dump |
| `marked` + `isomorphic-dompurify` | Markdown render + XSS sanitize |
| `qrcode` | In-browser QR generation (lazy-loaded) |
| `lottie-react` | Tutorial animations (lazy-loaded) |
| `vitest` | Unit tests |

## Privacy & security (V1)

- No tool input is sent to a server
- Theme preference only in `localStorage`
- Do not store secrets/JWTs/API keys in storage
- Markdown/HTML preview sanitized
- JWT decode ≠ signature verification
- Ads intentionally not implemented in V1

## Not built (future — do not add unless requested)

- AI features
- Accounts / saved history
- Backend / database
- Payments / premium
- Public API

## GitHub

- Repository: [https://github.com/naskark/Shadow-Reference](https://github.com/naskark/Shadow-Reference)
- Default branch: `main`
- Earlier mistaken repo under `kunalincred/shadowreferenc` was replaced by this `naskark` repo

## How to add a new tool

1. Add pure logic in `src/lib/tools/your-tool.ts` (+ tests)
2. Register in `src/data/tools.ts` (slug, metadata, samples, FAQs, related tools)
3. Wire `kind` handling in `ToolWorkspace.tsx` (or a dedicated component under `components/tools/`)
4. Optionally map a Lottie style in `tutorial-lotties.ts`

---

*Generated as a developer handoff document for the ShadowReference V1 build.*
