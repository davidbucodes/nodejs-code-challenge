import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  coveragePathIgnorePatterns: [
    '.*\\.module\\.ts',
    'main\\.ts',
    '.*\\.client\\.ts',
  ],
};

export default config;
