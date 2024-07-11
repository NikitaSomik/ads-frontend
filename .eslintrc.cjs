module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error', // Ensure ESLint shows errors for Prettier violations
    'no-extra-semi': 'off', // Disable ESLint's no-extra-semi rule
    'no-mixed-spaces-and-tabs': 'off', // Disable ESLint's no-mixed-spaces-and-tabs rule
    'no-unexpected-multiline': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
}
