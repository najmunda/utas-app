// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import pluginCypress from "eslint-plugin-cypress"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default defineConfig([
  ...compat.extends("eslint-config-airbnb"),
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  pluginCypress.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
    rules: {
      'no-alert': 'off',
      'react/jsx-no-bind': 'off',
      'react/no-array-index-key': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
]);
