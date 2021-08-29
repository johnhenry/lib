import failsAfter from "./fails-after.mjs";
import failsOn from "./fails-on.mjs";
import failsMod from "./fails-mod.mjs";

const BASE = () => true;

describe("Fails After", () => {
  test("Should always succeed by default", () => {
    const base = failsAfter(BASE);
    expect(base()).toBe(true);
  });

  test("Should always fail when passed 0", () => {
    const base = failsAfter(BASE, 0);
    expect(() => base()).toThrow(`1 > 0`);
    expect(() => base()).toThrow(`2 > 0`);
  });

  test("Should pass 3 times and fail afterwards if passed 3", () => {
    const base = failsAfter(BASE, 3);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
    expect(() => base()).toThrow(`4 > 3`);
  });
});

describe("Fails On", () => {
  test("Should always succeed by default", () => {
    const base = failsOn(BASE);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
  });

  test("Should always succeed when passed 0", () => {
    const base = failsOn(BASE, 0);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
  });

  test("Should pass 3 times, fail once, and  pass afterwards if passed 3", () => {
    const base = failsOn(BASE, 3);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
    expect(() => base()).toThrow(`3 === 3`);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
  });
});

describe("Fails Mod", () => {
  test("Should always succeed by default", () => {
    const base = failsMod(BASE);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
  });
  test("Should always pass when passed 0", () => {
    const base = failsMod(BASE, 0);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
  });
  test("Should pass 3 times, fail once, and  pass afterwards if passed 3", () => {
    const base = failsMod(BASE, 3);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
    expect(() => base()).toThrow(`3 % 3 === 0`);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
    expect(() => base()).toThrow(`6 % 3 === 0`);
  });
});
