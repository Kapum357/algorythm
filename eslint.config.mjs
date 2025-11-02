import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

export default [
  // Ignore generated and external files
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/out/**",
      "**/public/**",
      "**/*.min.js",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react },
    settings: { react: { version: "detect" } },
  },
];
