# DIR-Soacha – AI Agent Working Notes (Next.js 16)

Purpose: Make AI agents productive fast in this repo. Keep answers grounded in THESE patterns and files.

## Architecture & Data Flow
- Framework: Next.js 16 (App Router in `src/app/`), React 19.2; all pages are client components (`"use client"`). React Compiler enabled in `next.config.mjs`.
- Flow: Client component → fetch(`/api/*`) → API route (`src/app/api/**/route.js`) → service in `src/lib/*` → external API (Ollama Cloud) → JSON to client.
- Server-only code: `src/lib/ollama-*.js` must be imported ONLY in API routes (never in client components).

## Key Folders (read these first)
- `src/lib/ollama-config.js`: creates Ollama client, reads env, model defaults. Exports `createOllamaClient`, `OLLAMA_CONFIG`, `isOllamaConfigured`.
- `src/lib/ollama-service.js`: AI capabilities: `processVoiceQuery`, `analyzeVulnerability`, `assessFloodRisk`, `generateEmergencyResponse`, `predictRiskPatterns`, `analyzeStructuredOutput` (Zod), `generateCommunityReport` (stream), `performWebSearch`, `fetchWebPage`, `conductClimateResearch`, `testConnection`.
- `src/app/api/ollama/*/route.js`: One endpoint per capability. Present routes include: `analyze`, `flood-risk`, `emergency`, `predict`, `structured`, `research`, `status`, `chat-bot`, `voice`, `web-search`, `web-fetch`, `zone-analysis`.
- Other API routes: `src/app/api/chat/route.js`. Web Push: `src/app/api/notifications/{subscribe,send}/route.js` with service worker `public/sw.js`.
- Demos/UI: `src/app/ai-demo/page.js` shows client→API patterns; components in `src/components/` (`OllamaStatus`, `ChatBot`, `InteractiveMap`, etc.).

## AI Integration
- Library: `ollama` cloud client via `createOllamaClient()`; adds `Authorization: Bearer ${OLLAMA_API_KEY}` when present.
- Model selection: `OLLAMA_CONFIG.cloudModel = process.env.NEXT_PUBLIC_OLLAMA_MODEL || "gpt-oss:120b-cloud"` (fallback label `glm-4.6:cloud`).
- Patterns:
  - Non-streamed: `ollama.chat({ model, messages, stream: false, options })`.
  - Streaming: iterate `for await (const part of response)` in `generateCommunityReport`.
  - Structured JSON: build Zod schema → `zod-to-json-schema` → include schema in prompt → call with `format: jsonSchema, options: { temperature: 0 }` → JSON.parse → Zod.parse with error handling.
  - Web-augmented research: `performWebSearch` → synthesize in `conductClimateResearch` with sources.

## Env & Config
- Create `.env` (or run `npm run generate-vapid-keys` to scaffold) with:
  - `OLLAMA_API_KEY` (required for cloud calls)
  - `OLLAMA_HOST` (default `https://ollama.com`)
  - `NEXT_PUBLIC_OLLAMA_MODEL` (default `gpt-oss:120b-cloud`)
  - Push: `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_EMAIL`
- Headers/CSP: `next.config.mjs` sets permissive CSP and `Service-Worker-Allowed: /`.

## Build/Run Workflows
- Dev: `npm run dev` (check `/ai-demo` for AI features; `/alerts` for push).
- Build/Start: `npm run build`; `npm start`.
- Push setup: `npm run generate-vapid-keys` → restart dev server → enable on `/alerts`.
- Lint: `npm run lint` (ESLint 9). TypeScript config exists; most code is JS.

## UI & Styling Conventions
- CSS Modules per page/component (`*.module.css`).
- Tokens: `src/app/globals.css` (light-only). Use semantic vars: `var(--color-surface)`, `var(--color-border)`, text utilities `.text-h1..text-caption`; helper `.btn`, `.card`. Card radius: 12px; spacing 16/24px.

## API Route Pattern
```js
// /api/ollama/{action}/route.js
import { NextResponse } from 'next/server';
import { specificFunction } from '@/lib/ollama-service';

export async function POST(request) {
  try {
    const data = await request.json();
    const result = await specificFunction(data);
    return NextResponse.json({ success: true, ...shape(result), timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```
- Shape result to match existing clients (see `ai-demo`): `{ analysis }`, `{ assessment }`, `{ recommendations }`, or `{ result }`.

## Pitfalls to avoid
- Importing `ollama-service.js` in client components.
- Missing `OLLAMA_API_KEY` (see `<OllamaStatus />` or `/api/ollama/status`).
- Push without VAPID keys or unregistered service worker.

Good references: `src/app/ai-demo/page.js`, `src/lib/ollama-config.js`, `src/lib/ollama-service.js`.

If any section needs more depth (e.g., exact response shapes per route), say which route to expand and we’ll add it.
