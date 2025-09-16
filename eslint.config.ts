import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

const config = defineConfig(
  eslint.configs.recommended,
  eslintConfigPrettier,
  // @ts-expect-error Property 'flatConfig' does not exist
  nextPlugin.flatConfig.recommended,
  // @ts-expect-error Property 'flatConfig' does not exist
  nextPlugin.flatConfig.coreWebVitals,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
  },
  {
    ignores: [
      "eslint.config.ts",
      "backend/",
      "frontend/next-env.d.ts",
      "frontend/.next",
      "frontend/public",
      "frontend/node_modules/*",
    ],
  },
  {
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false, prefer: "type-imports" },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
  {
    files: ["frontend/**/*.{js,ts}"],
  },
)

export default config
