import type { Config } from 'jest';
import { defaults } from 'jest-config';

// https://jestjs.io/docs/configuration
const config: Config = {
  roots: ['<rootDir>/src'],
  globalSetup: '<rootDir>/globalSetup.ts',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
    '<rootDir>/src/mockAntd.tsx',
  ],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/packages/transformers/fileTransform.cjs',
  },
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    'tsx',
    'ts',
    'js',
    'json',
    'jsx',
    'node',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  coverageReporters: [...defaults.coverageReporters, 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/mockAntd.tsx',
    '!src/**/index.{ts,tsx}',
    '!src/main.tsx',
    '!src/services/apis/*.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 70,
      statements: 50,
    },
  },
};

export default config;
