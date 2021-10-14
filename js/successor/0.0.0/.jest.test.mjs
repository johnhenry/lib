import { successor, next } from "./index.mjs";

describe("Alpha", () => {
  test("Successor", () => {
    expect(true).toBeTruthy();
  });
  test("Recursicve Successor", () => {
    const add = (a, b = 0) => {
      const res = [];
      while (b) {
        res.push(a);
        b--;
      }
      return res.reduce(successor, a);
    };
    expect(add(345, 1234)).toBe(345 + 1234);
    const multiply = (a, b = 0) => {
      const res = [];
      while (b) {
        res.push(a);
        b--;
      }
      return res.reduce(add, 0);
    };
    expect(multiply(345, 1234)).toBe(345 * 1234);
    const exponentiate = (a, b = 0) => {
      const res = [];
      while (b) {
        res.push(a);
        b--;
      }
      return res.reduce(multiply, 1);
    };
    expect(exponentiate(7, 8)).toBe(7 ** 8);
  });

  test("Beta", () => {
    const add = next(successor, null);
    expect(add(345, 1234)).toBe(345 + 1234);
    const multiply = next(add, 0);
    expect(multiply(345, 1234)).toBe(345 * 1234);
    const exponentiate = next(multiply, 1);
    expect(exponentiate(25, 4)).toBe(25 ** 4);
  });

  // test("Alpha", () => {
  //   expect(true).toBeTruthy();
  // });
});
