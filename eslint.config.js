import js from '@eslint/js';
import css from '@eslint/css';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'] },
  { files: ['**/*.js'], ...js.configs.recommended },
  {
    files: ['src/css/**/*.css'],
    plugins: { css },
    language: 'css/css',
    rules: {
      ...css.configs.recommended.rules,
      // Bootstrap overrides intentionally use !important; vendor fallbacks
      // coexist with baseline CSS, so these two policy rules do not apply.
      // Bootstrap defines custom properties in a separately compiled stylesheet.
      'css/no-invalid-properties': ['error', { allowUnknownVariables: true }],
      'css/no-important': 'off',
      'css/use-baseline': 'off',
    },
  },
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.js', 'tests/**/*.js', '*config*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['tests/**/*.spec.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
