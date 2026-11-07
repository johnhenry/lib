import succeedsAfter from "./succeeds-after.mjs";
import succeedsOn from "./succeeds-on.mjs";
import succeedsMod from "./succeeds-mod.mjs";

const BASE = () => true;

describe("Succeeds After", () => {
  test("Should always throw by default", () => {
    const base = succeedsAfter(BASE);
    expect(() => base()).toThrow(`1 <= Infinity`);
    expect(() => base()).toThrow(`2 <= Infinity`);
  });

  test("Should always succeed when passed 0", () => {
    const base = succeedsAfter(BASE, 0);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
  });

  test("Should throw 3 times and pass afterwards if passed 3", () => {
    const base = succeedsAfter(BASE, 3);
    expect(() => base()).toThrow(`1 <= 3`);
    expect(() => base()).toThrow(`2 <= 3`);
    expect(() => base()).toThrow(`3 <= 3`);
    expect(base()).toBe(true);
    expect(base()).toBe(true);
  });
});

describe("Succeeds On", () => {
  test("Should always throw by default", () => {
    const base = succeedsOn(BASE);
    expect(() => base()).toThrow(`1 !== Infinity`);
    expect(() => base()).toThrow(`2 !== Infinity`);
  });

  test("Should always fail when passed 0", () => {
    const base = succeedsOn(BASE, 0);
    expect(() => base()).toThrow(`1 !== 0`);
  });

  test("Should pass once when passed 1", () => {
    const base = succeedsOn(BASE, 1);
    expect(base()).toBe(true);
    expect(() => base()).toThrow(`2 !== 1`);
  });

  test("Should throw 3 times and pass afterwards if passed 3", () => {
    const base = succeedsOn(BASE, 3);
    expect(() => base()).toThrow(`1 !== 3`);
    expect(() => base()).toThrow(`2 !== 3`);
    expect(base()).toBe(true);
  });
});

describe("Succeeds Mod", () => {
  test("Should always throw by default", () => {
    const base = succeedsMod(BASE);
    expect(() => base()).toThrow(`1 % Infinity !== 0`);
    expect(() => base()).toThrow(`2 % Infinity !== 0`);
  });
  test("Should always fail when passed 0", () => {
    const base = succeedsMod(BASE, 0);
    expect(() => base()).toThrow(`1 % 0 !== 0`);
    expect(() => base()).toThrow(`2 % 0 !== 0`);
  });
  test("Should throw 3 times and pass afterwards if passed 3", () => {
    const base = succeedsMod(BASE, 3);
    expect(() => base()).toThrow(`1 % 3 !== 0`);
    expect(() => base()).toThrow(`2 % 3 !== 0`);
    expect(base()).toBe(true);
    expect(() => base()).toThrow(`4 % 3 !== 0`);
    expect(() => base()).toThrow(`5 % 3 !== 0`);
    expect(base()).toBe(true);
  });
});
