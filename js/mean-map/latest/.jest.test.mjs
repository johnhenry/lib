import meanMap from "./index.mjs";
describe("Mean Map", () => {
  test("Fill With Mean", () => {
    expect(meanMap(1, 2, 3, 4, 5)).toEqual(new Array(5).fill(3));
  });

  test("Idempotency: m(a) === m(m(a))", () => {
    expect(meanMap(1, 2, 3, 4, 5)).toEqual(meanMap(...meanMap(1, 2, 3, 4, 5)));
  });

  test("Linearity: tency: m(a + b) = m(a) + m(b)", () => {
    expect(meanMap(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toEqual(
      meanMap(...meanMap(1, 2, 3, 4, 5), ...meanMap(6, 7, 8, 9, 10))
    );
  });
});
