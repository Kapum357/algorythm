# algorythm

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Design Tokens (Colores y Tipografía)

Este proyecto incluye un set de design tokens para colores (modo claro/oscuro) y tipografías.

- Tokens JS: `src/styles/tokens.js` exporta `COLORS` y `TEXT_STYLES` para uso en lógica o componentes.
- Tokens CSS: en `app/globals.css` se definen variables CSS como `--color-primary`, `--color-text-primary`, etc., con soporte para `prefers-color-scheme: dark`.

### Uso rápido

En CSS/Modules:

```css
.card {
    background: var(--color-surface);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
}

.cta {
    background: var(--color-primary);
    color: var(--color-blanco);
}

.title {
    composes: text-h2; /* utilidades de tipografía desde globals.css */
}
```

En componentes React:

```jsx
import { COLORS, TEXT_STYLES } from "@/styles/tokens";

export default function Button({ children }) {
    return (
        <button
            style={{
                backgroundColor: COLORS["light.primary"],
                color: COLORS.Blanco,
                fontWeight: TEXT_STYLES.buttonText.fontWeight,
            }}
            className="text-button"
        >
            {children}
        </button>
    );
}
```

Notas:

- Las variables `--background` y `--foreground` siguen funcionando y ahora se alinean a los tokens semánticos.
- El modo oscuro se activa automáticamente con `prefers-color-scheme: dark` (sin JavaScript adicional).
