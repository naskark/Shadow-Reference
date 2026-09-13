# ShadowReference

Free, privacy-first developer tools that run in the browser.

Site: [https://www.shadowreference.com](https://www.shadowreference.com)

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

## Deploy on Cloudflare Pages

This app is already a **static export** (`output: "export"` in `next.config.ts`). Cloudflare serves the `out/` folder. There is no Node server and you do **not** need OpenNext / next-on-pages.

### 1. Create the Pages project

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub and select [naskark/Shadow-Reference](https://github.com/naskark/Shadow-Reference).
3. Use these build settings:

| Setting | Value |
|---|---|
| Framework preset | **Next.js (Static HTML Export)** |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (leave empty) |

4. Under **Environment variables** (Production and Preview):

| Variable | Value |
|---|---|
| `NODE_VERSION` | `24` |

Leave AdSense vars empty until you have a real `ca-pub-` id. If you add them later, they must be set for the **build**, then you Redeploy.

5. Save and deploy. You will get a URL like `https://shadow-reference.pages.dev`.

### 2. Attach your domain

The site canonical URL is `https://www.shadowreference.com`. If that zone is in the same Cloudflare account:

1. Open the Pages project → **Custom domains** → **Set up a custom domain**.
2. Add `www.shadowreference.com`.
3. Add `shadowreference.com` (apex) as well.
4. Cloudflare will create the DNS records in that zone (apex uses CNAME flattening). Wait for SSL to become **Active**.

If the domain currently points at another host, replace those records with the ones Pages shows. Do not keep an old A record to a previous server.

Optional: in **Rules** → **Redirects**, send `shadowreference.com` → `https://www.shadowreference.com` (301) so you have one canonical host.

### 3. After it is live

- Every push to `main` rebuilds production.
- Pull requests get preview URLs.
- Check `/`, `/tools`, `/tools/json-formatter`, `/privacy`, and `/robots.txt`.
- Ads stay off until you set `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY` in Pages build env and redeploy.

### CLI alternative (no Git connection)

```bash
source ~/.nvm/nvm.sh && nvm use
npm ci
npm run build
npx wrangler pages deploy out --project-name=shadowreference
```

Then attach the custom domain in the dashboard the same way.

### Workers Builds (advanced settings)

The Next.js build writes `out/`. Deploy with **two normal hyphens** (`--`), not an em-dash (`—`).

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy --assets ./out --name shadow-reference --compatibility-date 2026-09-13` |
| Non-production branch deploy command | `npx wrangler versions upload --assets ./out --name shadow-reference --compatibility-date 2026-09-13` |
| Path / root directory | empty (or `/`) |
| API token | Create new token (do not paste a made-up token) |
| Variable | `NODE_VERSION` = `24` |

`wrangler.jsonc` in the repo sets the same name, date, and `out/` folder. After that file is on `main`, the shorter commands `npx wrangler deploy` and `npx wrangler versions upload` also work.

## Ads

Google AdSense is wired but off until you set `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY`. Copy `.env.example` to `.env.local`. Use manual display units, not Auto ads. Details in `dev2.md`.

Markdown Previewer and Markdown File Reader render GitHub-flavored Markdown with syntax-highlighted fenced code. Everything still stays in the browser.
