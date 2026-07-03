import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Jest-style globals: the test files use bare describe/test/expect.
    globals: true,
    // Most test files follow the dotfile convention ".jest.test.mjs";
    // the second pattern is required to match them.
    include: ["**/*.jest.test.mjs", "**/.jest.test.mjs"],
    exclude: ["**/node_modules/**", "build/**"],
  },
});
