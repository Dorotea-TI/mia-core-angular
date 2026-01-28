const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const baseConfigs = compat
  .extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/recommended'
  )
  .map((config) => ({
    ...config,
    files: ['**/*.ts'],
  }));

const templateConfigs = compat
  .extends('plugin:@angular-eslint/template/recommended')
  .map((config) => ({
    ...config,
    files: ['**/*.html'],
  }));

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...baseConfigs,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: [
          'tsconfig.json',
          'projects/doroteati/mia-core/tsconfig.lib.json',
          'projects/doroteati/mia-core/tsconfig.spec.json',
        ],
        sourceType: 'module',
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      '@angular-eslint': require('@angular-eslint/eslint-plugin'),
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: require('@angular-eslint/template-parser'),
    },
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
  },
  ...templateConfigs,
];
