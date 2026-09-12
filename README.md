# ShadowReference

Free, privacy-first developer tools that run in the browser.

Site: [https://shadowreference.dev](https://shadowreference.dev)

**Full product + engineering spec:** [dev2.md](./dev2.md) — upload that one file to an AI to continue work.

## Run locally

Requires **Node.js 24** (see `.nvmrc`):

```bash
nvm install
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run build    # static export to /out
```

## Ads

Google AdSense is wired but off until you set `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY`. Copy `.env.example` to `.env.local`. Use manual display units, not Auto ads. Details in `dev2.md`.

Markdown Previewer and Markdown File Reader render GitHub-flavored Markdown with syntax-highlighted fenced code. Everything still stays in the browser.
