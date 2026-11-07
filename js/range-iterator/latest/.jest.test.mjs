import range from "./index.mjs";

describe("", () => {
  const base = range(5);
  const cases = Array.from(new Array(5)).map((_, i) => [i, i]);
  test.each(cases)("item #%i should be %i", (_, expected) => {
    const { value, done } = base.next();
    expect(value).toBe(expected);
  });

  test.each([true])("iterator should be done", () => {
    expect(base.next().done).toBe(true);
  });
});

describe("", () => {
  const base = range(5, 10);
  const cases = Array.from(new Array(5)).map((_, i) => [i, i + 5]);
  test.each(cases)("item #%i should be %i", (_, expected) => {
    const { value } = base.next();
    expect(value).toBe(expected);
  });
  test.each([true])("iterator should be done", () => {
    expect(base.next().done).toBe(true);
  });
});

describe("", () => {
  const base = range(-5, 0);
  const cases = Array.from(new Array(5)).map((_, i) => [i, i - 5]);
  test.each(cases)("item #%i should be object %i", (_, expected) => {
    const { value } = base.next();
    expect(value).toBe(expected);
  });
  test.each([true])("iterator should be done", (status) => {
    expect(base.next().done).toBe(status);
  });
});

describe("", () => {
  const base = range(-5, 0);
  const cases = Array.from(new Array(5)).map((_, i) => [i, i - 5]);
  test.each(cases)("item #%i should be object %i", (_, expected) => {
    const { value } = base.next();
    expect(value).toBe(expected);
  });
  test.each([true])("iterator should be done", (status) => {
    expect(base.next().done).toBe(status);
  });
});
