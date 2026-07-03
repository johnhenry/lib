module.exports = {
  rootDir: "../",
  testMatch: ["<rootDir>/**/?(*.)(jest.test).{js,jsx,ts,tsx,mjs}"],
  transform: {},
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "mjs"],
};
