# AI agent notes — repo-specific quick reference (Next.js App Router)

Purpose: help an automated coding agent be productive in this repository by describing architecture, conventions, and concrete examples to change safely.

Core architecture (big picture)
- Framework: Next.js App Router under `src/app/` — client components (`"use client"`) are used for pages. Server-only helper code lives in `src/lib/`.
- Data flow: Client UI → fetch(`/api/*`) → API route (`src/app/api/**/route.js`) → service layer (`src/lib/*`) → external APIs (Ollama, web push) → JSON back to client.
- Service boundary rule: anything that calls `ollama` or `web-push` lives in `src/lib/*` and may only be imported by API routes (server code). Do NOT import `src/lib/ollama-*` or `web-push` from client components.

Key files & examples to read first
- `src/lib/ollama-config.js` — builds Ollama client and exports config (OLLAMA_CONFIG, createOllamaClient, isOllamaConfigured).
- `src/lib/ollama-service.js` — single place implementing AI capabilities (voice, analysis, streaming report, structured Zod outputs). Look here for prompt patterns, streaming, and JSON-schema/Zod handling.
- `src/app/api/ollama/*/route.js` — one route per capability; follow their POST pattern when adding endpoints.
- `src/app/ai-demo/page.js` and components under `src/components/` (`OllamaStatus`, `ChatBot`, `TTSButton`, `VoiceAssistant`) for client→API usage examples.
- Push: `scripts/generate-vapid-keys.js`, `src/app/api/notifications/{subscribe,send}/route.js`, `public/sw.js`, and `src/components/PushNotifications.js` show how VAPID keys and SW are wired.

Concrete coding patterns (copy/paste friendly)
- API route (server-only) shape: parse `request.json()`, call a function from `src/lib/ollama-service.js`, return `NextResponse.json({ success: true, <payload> })` or 500 on error. Keep result shapes consistent with `ai-demo` (e.g., `{ analysis }`, `{ recommendations }`).
- Ollama calls:
  - Non-stream: `ollama.chat({ model, messages, stream: false, options })`.
  - Stream: `for await (const part of response) { /* append content */ }` (see `generateCommunityReport`).
  - Structured JSON: convert Zod -> JSON Schema, include in prompt and call with `format: jsonSchema` then parse + Zod.parse (handle parse errors gracefully).

Environment & developer workflows
- Dev server: `npm run dev`. Build/start: `npm run build` and `npm start`.
- VAPID push keys: run `npm run generate-vapid-keys` to create keys referenced in `.env` (see `.env.local.example`). Components and API warn/help if keys are missing — use that workflow when testing push.
- Lint: `npm run lint`; project uses ESLint and has TS config but most code is JS.

Project-specific gotchas
- NEVER import `src/lib/ollama-service.js` or `src/lib/ollama-config.js` into client components — these files use server-only APIs and must stay server-side (API routes). Search for `createOllamaClient()` usages in `src/lib`.
- Many client components expect specific response shapes from API routes (see `src/app/ai-demo/page.js` and `src/components/ChatBot.js`). Keep shapes stable.
- Push feature relies on a working service worker (`public/sw.js`) and properly configured VAPID keys; the repo includes warnings and helper script `scripts/generate-vapid-keys.js`.

Contract for edits an AI agent should follow (inputs/outputs/errors)
- Inputs: API routes accept JSON via POST, typically small objects (prompts, IDs, params).
- Outputs: return JSON using `NextResponse.json({ success: true, <payload>, timestamp })`. On error return JSON with `{ error: message }` and HTTP 500.
- Error modes to handle explicitly: missing env keys (OLLAMA_API_KEY, VAPID keys), Zod parse failures for structured outputs, streaming interruptions.

If you need more detail
- If you plan to modify an existing route, grep for it under `src/app/api/ollama/` and align output shape to the client usage in `src/components/*` or `src/app/ai-demo/page.js`.
- If adding new AI capabilities, implement logic in `src/lib/ollama-service.js`, expose a single function, and wire a thin API route at `src/app/api/ollama/<name>/route.js`.
