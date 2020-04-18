module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!**/node_modules/**',
    '!src/api/*',
    '!src/constants/*',
    '!src/main.ts',
  ],
};
