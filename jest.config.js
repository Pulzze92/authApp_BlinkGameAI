module.exports = {
    setupFiles: ['<rootDir>/src/setupTests.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
