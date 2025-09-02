/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: false,
    }],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/**/layout.tsx',
    '!src/app/**/page.tsx',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^next/cache$': '<rootDir>/tests/__mocks__/next-cache.js',
    '^next/navigation$': '<rootDir>/tests/__mocks__/next-navigation.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  // Separate configurations for different test types
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: false }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^next/cache$': '<rootDir>/tests/__mocks__/next-cache.js',
        '^next/navigation$': '<rootDir>/tests/__mocks__/next-navigation.js',
      },
    },
    {
      displayName: 'integration',
      testMatch: [
        '<rootDir>/tests/integration/checkout-flow-simple.test.ts',
        '<rootDir>/tests/integration/checkout-flow-comprehensive.test.ts',
        '<rootDir>/tests/integration/invoice-generation.test.ts',
        '<rootDir>/tests/integration/enhanced-billing-history.test.ts',
        '<rootDir>/tests/integration/edge-case-handling.test.ts',
        '<rootDir>/tests/integration/quote-calculation-simple.test.ts',
        '<rootDir>/tests/integration/quote-management.test.ts',
        '<rootDir>/tests/integration/end-to-end-workflow.test.ts',
        '<rootDir>/tests/integration/formbricks-api-integration.test.ts'
      ],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: false }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^next/cache$': '<rootDir>/tests/__mocks__/next-cache.js',
        '^next/navigation$': '<rootDir>/tests/__mocks__/next-navigation.js',
      },
    }
  ]
};

module.exports = config;