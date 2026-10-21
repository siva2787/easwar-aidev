# Easwar S — Portfolio

React 19 + Vite + TypeScript + Tailwind 3 + Three.js + Framer Motion (frontend) · Express + Zod (backend, contact form only).

## Run
```
cd frontend && npm install && npm run dev      # http://localhost:5173
cd backend  && npm install && npm run dev      # http://localhost:4000
```
Build/test: `npm run build`, `npm test` (frontend: vitest), `npm test` (backend).

## Deploy
- **Frontend (Vercel):** root dir `frontend`, build `npm run build`, output `dist`. Env: `VITE_API_URL=<backend URL>`.
- **Backend (Render):** root dir `backend`, build `npm install && npm run build`, start `npm start`. Env: see `backend/.env.example` (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `FRONTEND_URL`). Without `RESEND_API_KEY` the form honestly reports "not configured" and shows a mailto fallback.

## Features
Light-first + dark theme (persisted) · chrome/glass 3D ring scene (procedural, lazy-loaded, scroll-linked, pauses off-screen, mobile-reduced, WebGL fallback, reduced-motion) · real-portrait hero · section-aware voice narrator (browser speech, captions, never autoplays, queues instead of interrupting) · hash-routed case-study pages (`#/projects/<slug>`) · accessible nav/forms/modal.

## You must verify / supply
- Not visually tested in a browser by the author — check every section at 390 / 768 / 1440 px, both themes.
- Portrait: `frontend/public/easwar-portrait.png` is 460px B&W; replace with a higher-res (ideally transparent-cutout, ≥1200px) photo, same filename.
- OG image: add `frontend/public/og-image.png` (1200×630).
- Verify content in `frontend/src/data/portfolioData.ts`: education start year, skill list, ARASUMATE / ZONE / LegalMet details, architecture bullets, journey claims.
- Lip-sync is not implemented (needs recorded clips + a talking-head provider); narration = browser speech + captions.
- No screenshots for ARASUMATE, LearnTwin, ZONE, LegalMet; add to `public/` and set `image`.
