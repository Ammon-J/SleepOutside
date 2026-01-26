import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import astro from "eslint-plugin-astro";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.astro/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  ...astro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      quotes: ["warn", "double", { allowTemplateLiterals: true }],
      "no-console": "warn",
      eqeqeq: "warn",
      semi: "warn",
    },
  },
  {
    files: ["**/*.{ts,mts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      ecmaVersion: 2017,
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      eqeqeq: "warn",
      semi: "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn", // Use correct rule
    },
  },
]);
