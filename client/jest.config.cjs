module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/src/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
};
