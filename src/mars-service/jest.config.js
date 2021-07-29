module.exports = {
  verbose: true,
  collectCoverage: true,
  testMatch: ['**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/dist_test/', '/integration_tests/'],
  testEnvironment: 'node',
};
