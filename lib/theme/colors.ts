export const COLORS = {
  // === Colores Institucionales ===
  "Rojo oficial": "#C8102E", // RGB (200, 16, 46)
  Blanco: "#FFFFFF",
  "Gris institucional": "#6E6E6E",
  "Rojo brillante (alterno)": "#FF4136",
  "Amarillo bandera": "#FFD700",
  "Azul bandera": "#007BFF",

  // === Modo Claro (principal) ===
  "light.background": "#FFFFFF",
  "light.surface": "#F8F8F8",
  "light.text.primary": "#333333",
  "light.text.secondary": "#6E6E6E",
  "light.primary": "#C8102E",
  "light.primary.hover": "#FF4136",
  "light.secondary": "#007BFF",
  "light.secondary.hover": "#005BB5",
  "light.border": "#DADADA",
  "light.alert": "#FFD700",
  "light.info": "#007BFF",
  "light.error": "#C8102E",

  // === Modo Oscuro ===
  "dark.background": "#121212",
  "dark.surface": "#1E1E1E",
  "dark.text.primary": "#FFFFFF",
  "dark.text.secondary": "#CCCCCC",
  "dark.primary": "#FF4136",
  "dark.primary.hover": "#FF5C5C",
  "dark.secondary": "#339CFF",
  "dark.secondary.hover": "#66BFFF",
  "dark.border": "#333333",
  "dark.alert": "#FFD700",
  "dark.info": "#339CFF",
  "dark.error": "#FF4136",
} as const;

export type ColorKey = keyof typeof COLORS;
