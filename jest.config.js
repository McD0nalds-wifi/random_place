/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl|svg|png|jpg)$': '<rootDir>/node_modules/identity-obj-proxy',
        'components-ui': '<rootDir>/src/components-ui/index.tsx',
        'components-view': '<rootDir>/src/components-view/index.tsx',
    },
}
