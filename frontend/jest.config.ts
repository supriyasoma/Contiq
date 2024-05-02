export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/**/*.{ts,tsx}",
    "!src/theme/*.{ts,tsx}",
    "!src/components/**/*.{types,stories,constants,test,spec}.{ts,tsx}",
    "!src/declaration.d.ts",
    "!src/App.tsx",
    "!src/index.tsx",
    "!src/mocks/*.{ts,tsx}",
    "!src/utils/*.{ts,tsx}",
    "!src/services/*.{ts,tsx}",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/jest/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/jest/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
};
