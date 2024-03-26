export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageReporters: ['text'],
  silent: false,
  verbose: true,
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      lines: 85
    }
  }
};

