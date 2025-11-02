export const TEXT_STYLES = {
  // === Encabezados ===
  heading1: {
    fontSize: "3rem", // ≈ 48px
    fontWeight: 700,
    lineHeight: 1.2,
    usage: "Títulos principales, secciones hero",
  },
  heading2: {
    fontSize: "2.25rem", // ≈ 36px
    fontWeight: 600,
    lineHeight: 1.3,
    usage: "Encabezados de secciones",
  },
  heading3: {
    fontSize: "1.75rem", // ≈ 28px
    fontWeight: 600,
    lineHeight: 1.3,
    usage: "Subtítulos importantes",
  },
  heading4: {
    fontSize: "1.375rem", // ≈ 22px
    fontWeight: 600,
    lineHeight: 1.4,
    usage: "Subtítulos menores o encabezados secundarios",
  },
  heading5: {
    fontSize: "1.125rem", // ≈ 18px
    fontWeight: 600,
    lineHeight: 1.4,
    usage: "Títulos de sección, tarjetas",
  },
  heading6: {
    fontSize: "1rem", // ≈ 16px
    fontWeight: 600,
    lineHeight: 1.5,
    usage: "Encabezados pequeños o destacados internos",
  },

  // === Cuerpo de texto ===
  body1: {
    fontSize: "1rem", // ≈ 16px
    fontWeight: 400,
    lineHeight: 1.6,
    usage: "Texto principal, párrafos",
  },
  body2: {
    fontSize: "0.875rem", // ≈ 14px
    fontWeight: 400,
    lineHeight: 1.6,
    usage: "Texto secundario, metadatos o detalles",
  },

  // === Pequeños textos ===
  caption: {
    fontSize: "0.75rem", // ≈ 12px
    fontWeight: 400,
    lineHeight: 1.4,
    usage: "Leyendas, créditos o etiquetas pequeñas",
  },
  buttonText: {
    fontSize: "1rem", // ≈ 16px
    fontWeight: 600,
    lineHeight: 1.2,
    textTransform: "uppercase",
    usage: "Texto en botones o llamadas a la acción",
  },

  // === Modos de color aplicados a texto ===
  lightMode: {
    textPrimary: "#333333",
    textSecondary: "#6E6E6E",
    background: "#FFFFFF",
  },
  darkMode: {
    textPrimary: "#FFFFFF",
    textSecondary: "#CCCCCC",
    background: "#121212",
  },

  // === Fuente recomendada ===
  fontFamily: {
    primary: "Inter, 'Open Sans', 'Helvetica Neue', Arial, sans-serif",
    fallback: "sans-serif",
    usage: "Fuentes modernas, legibles y accesibles para cuerpo y encabezados",
  },
} as const;

export type TextStyleKey = keyof typeof TEXT_STYLES;
