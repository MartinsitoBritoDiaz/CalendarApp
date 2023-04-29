require('dotenv').config({ path: '.env.test' })
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    transform: { '\\.[jt]sx?$': 'babel-jest', },
    setupFilesAfterEnv: [
      '<rootDir>/_test_/mocks/envValues.ts'
    ]
    
    // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    // moduleNameMapper: {
    //     '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    // },
}


module.exports = {
}