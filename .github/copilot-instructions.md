## AI guide for this repo (Next.js App Router)

Short purpose: web app scaffold for “DIR-Soacha” dashboard. Current codebase is a standard Next.js App Router project with design tokens and CSS utilities wired in.

1) Build, run, deploy
- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build` | Start: `npm run start`
- Next config: `next.config.mjs` enables React Compiler (`reactCompiler: true`). Prefer idiomatic React; avoid unnecessary effects for derived values.

2) Code layout (key files)
- `src/app/layout.js` – Root layout, loads Geist fonts via `next/font`, applies `globals.css`.
- `src/app/page.js` + `src/app/page.module.css` – Example page using CSS Modules and `next/image`.
- `src/app/globals.css` – CSS custom properties for light/dark theme and typography utilities (`.text-h1`, `.text-body1`, `.text-button`, …).
- `src/styles/tokens.js` – JS design tokens: `COLORS` and `TEXT_STYLES` mirrors of the CSS variables.
- `public/` – Static assets for `next/image`.
- Path aliases: `jsconfig.json` defines `@/*` → `src/*`.

3) Styling conventions
- Use semantic CSS vars: `--color-background`, `--color-surface`, `--color-text-primary`, `--color-primary`, etc. Dark mode is automatic via `prefers-color-scheme`.
- Typography utilities: prefer `.text-h1`…`.text-h6`, `.text-body1`, `.text-body2`, `.text-caption`, `.text-button` for consistent text styles.
- JS tokens when inline styles are needed: `import { COLORS, TEXT_STYLES } from "@/styles/tokens";` (keys with dots/spaces use bracket access, e.g. `COLORS["light.primary"]`).

4) Components and pages
- App Router is in use. Add routes under `src/app/<segment>/page.js`.
- Keep `layout.js` minimal; global providers belong here if added later.
- Prefer CSS Modules for component-scoped styles; global variables live in `globals.css`.

5) Images and assets
- Use `next/image` with files from `public/`. Example: see `src/app/page.js`.

6) Examples
- Import tokens via alias: `import { COLORS } from "@/styles/tokens"`.
- Use semantic CSS vars in modules: `background: var(--color-surface); border: 1px solid var(--color-border);`.

7) Guardrails for agents
- Don’t introduce TypeScript, ESLint, or new libraries without approval; project is plain JS.
- Keep theming consistent: use semantic CSS vars and/or `tokens.js`; avoid hard-coded hex colors in components.
- React Compiler is on; prefer pure components and stable props; avoid pattern that depends on mutation or non-deterministic renders.

Context note: The long-term product vision is a geospatial dashboard (DIR-Soacha). When adding mapping features, place client-only Leaflet code in a `"use client"` component and load third-party map libs with dynamic import, but only implement once the dependency is explicitly added.
