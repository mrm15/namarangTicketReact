/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    //  dont check unsafe please
    // Disable all TypeScript-related rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/restrict-template-expressions' : 'off',
    '@typescript-eslint/no-unsafe-member-access' : 'off',
    '@typescript-eslint/no-unsafe-assignment' : 'off',
    '@typescript-eslint/ban-ts-comment' : 'off',
    '@typescript-eslint/no-unsafe-return' : 'off',
    '@typescript-eslint/no-unsafe-call' : 'off',
    '@typescript-eslint/restrict-plus-operands' : 'off',
    '@typescript-eslint/no-unsafe-argument' : 'off',
    '@typescript-eslint/no-misused-promises' : 'off',
    // Disable all other rules if you want to write code as in JavaScript
    'no-restricted-globals': 'off',
    // Add more rules here as needed
    /////////////////////////////

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
