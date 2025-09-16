import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import globals from "globals"
import tseslint from "typescript-eslint"

const config = tseslint.config(
  eslint.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        // @ts-expect-error The 'import.meta' meta-property is not allowed in files which will build into CommonJS output.ts(1470)
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
  },
  {
    ignores: [
      "eslint.config.ts",
      "backend/.strapi",
      "backend/.tmp",
      "backend/dist",
      "backend/public",
      "backend/.strapi-updater.json",
      "frontend/node_modules/*",
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
    files: ["backend/**/*.{js,ts}"],
  },
  {
    files: ["frontend/**/*.{js,ts}"],
  },
)

export default config
