module.exports = {
  extends: [
    'airbnb',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier',
  ],
  ignorePatterns: [
    '/api/index.js',
    '/api/index.js.map',
    '/public/build/*',
    '/.cache/*',
    '/.vercel/*',
    '/.output/*',
  ],
  plugins: ['unused-imports'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        '@remix-run/eslint-config',
        '@remix-run/eslint-config/node',
        'prettier',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['*.js'] },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
}
