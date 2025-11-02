# DIR-Soacha: AI Coding Agent Instructions

## Project Overview
**DIR-Soacha** (Dashboard Integrado de Resiliencia) is a Next.js 16 web application built for Cruz Roja Colombiana to analyze climate resilience in Soacha's vulnerable communities (El Danubio, La María). The platform integrates geospatial visualization with AI-powered analysis using Ollama Cloud to transform AVCA/CRMC vulnerability data into actionable intelligence for community leaders and emergency responders.

**Core Mission**: Empower non-technical users to visualize flood risks, assess population impact, and generate emergency response plans through an intuitive dashboard with AI assistance.

## Architecture & Tech Stack

### Framework & Routing
- **Next.js 16** with App Router (`src/app/` directory structure)
- All pages are **client-side rendered** (`"use client"` directive) - no SSR/SSG currently implemented
- React 19.2 with experimental React Compiler enabled (`next.config.mjs`)

### Key Directories
```
src/
  app/              # Pages & API routes (App Router)
    api/ollama/     # 9 AI service endpoints (analyze, flood-risk, emergency, etc.)
    dashboard/      # Main resilience dashboard
    alerts/         # Real-time alert system with Lottie animations
    impact/         # Population impact analysis
    ai-demo/        # Interactive AI capabilities demo
  lib/              # Core services
    ollama-service.js   # 13 AI functions (analyzeVulnerability, assessFloodRisk, etc.)
    ollama-config.js    # Ollama Cloud client setup
  components/       # Reusable React components (OllamaStatus, etc.)
```

### AI Integration (Ollama Cloud)
- **Primary Model**: `gpt-oss:120b-cloud` via Ollama Cloud API
- **Service Layer**: `src/lib/ollama-service.js` exports 13 specialized functions:
  - `analyzeVulnerability()` - AVCA/CRMC data analysis
  - `assessFloodRisk()` - Geographic risk evaluation
  - `generateEmergencyResponse()` - Incident response plans
  - `predictRiskPatterns()` - Temporal pattern detection
  - `analyzeStructuredOutput()` - Zod schema validation
  - `generateCommunityReport()` - Streaming report generation
  - `performWebSearch()` / `fetchWebPage()` - External data integration
- **Configuration**: Requires `OLLAMA_API_KEY` in `.env.local` (see README_OLLAMA.md)
- **API Routes**: All AI endpoints follow pattern `/api/ollama/{action}/route.js` with POST handlers

## Development Workflows

### Running the Application
```bash
npm run dev    # Start dev server on http://localhost:3000
npm run build  # Production build (also available as VS Code task)
npm start      # Run production server
```

### Environment Setup
1. Copy `.env.local.example` to `.env.local` (if exists) or create new:
   ```
   OLLAMA_API_KEY=your_api_key_here
   OLLAMA_HOST=https://ollama.com
   NEXT_PUBLIC_OLLAMA_MODEL=gpt-oss:120b-cloud
   ```
2. Get API key from https://ollama.com/settings/keys
3. Test connection at http://localhost:3000/ai-demo

### Testing AI Features
- Visit `/ai-demo` page for interactive testing of all AI capabilities
- Check `<OllamaStatus>` component for real-time connection status
- All AI endpoints return JSON with `{ success, analysis/recommendations, timestamp }` structure

## Project-Specific Conventions

### Component Patterns
1. **All pages use `"use client"`** - No server components currently in use. When creating new pages:
   ```javascript
   "use client";
   import styles from "./page.module.css";
   export default function PageName() { /* ... */ }
   ```

2. **CSS Modules everywhere** - Each component/page has dedicated `.module.css`:
   - Import as `styles` object
   - Use semantic class names: `styles.container`, `styles.card`, `styles.main`
   - Global tokens in `src/app/globals.css` and `src/app/tokens.js`

3. **Design System** - Cruz Roja branding colors defined in globals.css:
   - Primary red: `var(--color-rojo-oficial)` (#C8102E)
   - Light mode by default with dark mode support via CSS custom properties
   - Typography styles exported from `src/app/tokens.js` (TEXT_STYLES object)

### CSS Architecture & Design Tokens

**Global Tokens System** (`src/app/globals.css`):
```css
/* CSS Custom Properties (automatically switch with prefers-color-scheme) */
--color-rojo-oficial: #c8102e;        /* Cruz Roja institutional red */
--color-background: #ffffff;           /* Light: white, Dark: #121212 */
--color-surface: #f8f8f8;              /* Light: off-white, Dark: #1e1e1e */
--color-text-primary: #333333;         /* Light: dark gray, Dark: white */
--color-text-secondary: #6e6e6e;       /* Light: medium gray, Dark: light gray */
--color-primary: #c8102e;              /* Brand red */
--color-secondary: #007bff;            /* Blue for interactive elements */
--color-border: #dadada;               /* Subtle borders */
--gradient-accent-start / --gradient-accent-end /* For AI demo gradient buttons */
```

**Typography Tokens** (utility classes + CSS variables):
```css
/* Available utility classes in globals.css */
.text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6
.text-body1, .text-body2    /* Body text sizes */
.text-caption               /* Small text (12px) */
.text-button                /* Uppercase button text */

/* CSS Variables for manual use */
--h1-size: 3rem; --h1-weight: 700; --h1-line: 1.2;
--body1-size: 1rem; --body1-weight: 400; --body1-line: 1.6;
/* ... and more (see globals.css lines 93-126) */
```

**CSS Module Pattern** (every `.module.css` file):
```css
/* Example: src/app/dashboard/page.module.css */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  background: var(--color-background);  /* Uses global token */
  color: var(--color-text-primary);
}

.sidebar {
  border-right: 1px solid var(--color-border);
  background: var(--color-surface);
}

.statCard {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;  /* Standard 12px radius for cards */
  padding: 16px;
}
```

**Key CSS Conventions**:
- **Card containers**: 12px border-radius, `var(--color-surface)` background, 1px `var(--color-border)`
- **Grid layouts**: Most pages use CSS Grid (not Flexbox) for main layouts
- **Responsive**: `@media (max-width: 900px)` breakpoint for mobile
- **Spacing**: 16px/24px for padding/gaps (consistent across files)
- **Dark mode**: Automatic via `prefers-color-scheme` - no manual toggle needed
- **Typography**: Use utility classes (`.text-h3`) in JSX or CSS variables in `.module.css`

**Common CSS Module Classes** (patterns repeated across pages):
```css
.layout      /* Top-level page grid container */
.sidebar     /* Side navigation or filters panel */
.main        /* Primary content area */
.mapCard     /* Map container with border-radius */
.map         /* iframe for Google Maps embed */
.stats       /* Grid of stat cards (3 columns) */
.statCard    /* Individual metric card */
.statValue   /* Large bold number (font: 700 1.75rem) */
```

### AI Service Integration Pattern
When adding new AI features:

1. **Create service function** in `src/lib/ollama-service.js`:
   ```javascript
   export async function myNewAnalysis(data) {
     const ollama = createOllamaClient();
     const response = await ollama.chat({
       model: OLLAMA_CONFIG.cloudModel,
       messages: [
         { role: "system", content: "Expert persona..." },
         { role: "user", content: prompt }
       ],
       stream: false,
       options: { temperature: OLLAMA_CONFIG.temperature.analysis }
     });
     return response.message.content;
   }
   ```

2. **Create API route** in `src/app/api/ollama/{action}/route.js`:
   ```javascript
   import { NextResponse } from 'next/server';
   import { myNewAnalysis } from '@/lib/ollama-service';

   export async function POST(request) {
     const data = await request.json();
     const analysis = await myNewAnalysis(data);
     return NextResponse.json({ success: true, analysis, timestamp: new Date().toISOString() });
   }
   ```

3. **Call from client** using fetch:
   ```javascript
   const response = await fetch('/api/ollama/{action}', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(inputData)
   });
   ```

### Data Flow Architecture
```
User Interaction → Client Component → API Route (/api/ollama/*) → ollama-service.js → Ollama Cloud → Response
```

**Key Points**:
- All AI calls go through server-side API routes (never expose API keys to client)
- `ollama-service.js` is imported ONLY by API routes (server-side)
- `ollama-config.js` reads environment variables via `process.env`
- Client components fetch API routes using standard `fetch()` API

### Lottie Animations
The `/alerts` page uses Lottie animations for weather visuals:
- Animations stored in `public/animations/` (Rainy.json, Weather-storm.json, etc.)
- Dynamically loads `@lottiefiles/lottie-player` web component via CDN
- Pattern: Check if component defined, load script if needed, wait for `customElements.whenDefined()`

### Navigation Structure
- Global header in `src/app/layout.js` with institutional branding
- Dashboard sidebar navigation in `src/app/dashboard/page.js`
- Main sections: `/` (home), `/dashboard`, `/alerts`, `/impact`, `/reports`, `/monitoring`, `/ai-demo`

## Common Pitfalls & Solutions

### Environment Variables
**Problem**: AI calls fail with authentication errors  
**Solution**: Ensure `.env.local` exists with valid `OLLAMA_API_KEY`. Never commit this file.

### Client/Server Boundary
**Problem**: "Module not found" errors when importing `ollama-service.js` in client components  
**Solution**: `ollama-service.js` is server-only. Always import it in API routes (`/api/ollama/*`), not in client components.

### CSS Modules
**Problem**: Styles not applying  
**Solution**: Verify CSS Module import (`import styles from "./page.module.css"`) and use dot notation (`styles.className`).

### API Route Patterns
All Ollama API routes follow this structure:
```javascript
// /api/ollama/{action}/route.js
import { NextResponse } from 'next/server';
import { specificFunction } from '@/lib/ollama-service';

export async function POST(request) {
  try {
    const data = await request.json();
    const result = await specificFunction(data);
    return NextResponse.json({ success: true, result, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

## Important Context
- **Domain**: Climate resilience for Soacha, Colombia (El Danubio & La María communities)
- **Target Users**: Community leaders, Red Cross volunteers (non-technical)
- **Data Sources**: AVCA/CRMC vulnerability assessments, IDEAM climate data, DANE demographics
- **Key Metrics**: 62% no evacuation knowledge, 81% no emergency savings, 71% flood incidence
- **Geographic Focus**: Río Bogotá, Quebrada Tibanica flood zones

## Quick Reference

### Adding a New Page
1. Create `src/app/{route}/page.js` with `"use client"` directive
2. Create corresponding `page.module.css` for styles
3. Add navigation link in `src/app/layout.js` header or dashboard sidebar

### Creating AI Endpoint
1. Add function to `src/lib/ollama-service.js`
2. Create route at `src/app/api/ollama/{name}/route.js`
3. Import and call in client component via fetch

### Using Design Tokens
```javascript
// In CSS Modules (.module.css files)
.element { 
  color: var(--color-rojo-oficial); 
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

// In JSX (inline styles) - import from tokens.js
import { COLORS, TEXT_STYLES } from '@/app/tokens';

<div style={{ 
  color: COLORS["Rojo oficial"],
  fontSize: TEXT_STYLES.heading2.fontSize 
}}>

// In JSX (utility classes) - use globals.css classes
<h2 className="text-h2">Título</h2>
<p className="text-body1">Contenido principal</p>
<small className="text-caption">Texto pequeño</small>
```

### Testing Changes
```bash
npm run dev              # Always verify in browser
# Check /ai-demo for AI features
# Check browser console for errors
```

---

**For detailed setup**: See README.md and README_OLLAMA.md  
**For examples**: Check `src/app/ai-demo/page.js` and `src/lib/ollama-service.js`
