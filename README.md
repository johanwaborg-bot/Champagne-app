# The Connoisseur's Champagne Tasting Journal

A professional Champagne tasting app — blind/open flights, WSET Level 4 notes,
100-point scoring, a full knowledge library (grapes, regions, all 17 Grand Crus
and 42 Premier Crus, vintage chart), AI house backgrounds, AI flight summaries,
and photo scanning of handwritten tasting notes.

The AI features run through a small serverless function (`api/claude.js`) so your
API key stays on the server and is never exposed in the browser.

---

## What you need

- An Anthropic API key — create one at https://console.anthropic.com (Settings → API Keys).
- A free Vercel account — https://vercel.com
- Node.js 18+ installed (only needed if you want to test locally first).

---

## Fastest path: deploy straight to Vercel

### Option A — Vercel CLI (quickest)

1. Install the CLI once:
   ```
   npm i -g vercel
   ```
2. In this project folder, run:
   ```
   vercel
   ```
   Accept the defaults. It detects Vite automatically.
3. Add your API key as an environment variable:
   ```
   vercel env add ANTHROPIC_API_KEY
   ```
   Paste your key when prompted, and select all environments (Production,
   Preview, Development).
4. Deploy to production:
   ```
   vercel --prod
   ```
5. Open the URL it prints. Done.

### Option B — GitHub + Vercel dashboard

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com/new and import that repository.
3. Framework preset: **Vite** (auto-detected). Leave build settings as default.
4. Before deploying, open **Environment Variables** and add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key
5. Click **Deploy**. Open the URL when it finishes.

> Important: the variable must be named exactly `ANTHROPIC_API_KEY` (no `VITE_`
> prefix). The `VITE_` prefix would expose it to the browser — we deliberately
> keep this one server-side only.

---

## Testing locally (optional)

Plain `npm run dev` runs the front-end but NOT the serverless function, so the
AI features won't work that way. To test the whole thing locally, use Vercel's
dev server, which runs the function too:

1. `npm install`
2. Copy `.env.example` to `.env` and put your key in it.
3. `npm i -g vercel` (if not already)
4. `vercel dev`
5. Open the local URL it prints.

---

## Updating the app later

- CLI: run `vercel --prod` again from the folder.
- GitHub: just push your changes; Vercel redeploys automatically.

---

## Notes

- Photo scanning and all AI calls use Claude (Sonnet) via `api/claude.js`.
  If something fails, check the function logs in the Vercel dashboard
  (Deployments → your deployment → Functions) — a missing or invalid key is
  the usual cause.
- Your key usage is billed by Anthropic per API call. The tasting/library AI
  features are lightweight; the flight summary is the largest single call.
- All tasting data lives in the browser session only; nothing is sent anywhere
  except the AI text/image you explicitly trigger.
