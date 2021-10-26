// These are commented out because:
// - Loading these data takes a relatively long time
// - The tests that use them -- also commented out -- take a relatively long time to run
// Uncomment at your discression
// import h4n4n3n from "./h4n/4n3n.mjs";
// import h4n5n3n from "./h4n/5n3n.mjs";
// import h4n6n3n from "./h4n/6n3n.mjs";
// import h4n7n3n from "./h4n/7n3n.mjs";
// import h4n8n3n from "./h4n/8n5n.mjs";
// import h4n2n5n from "./h4n/2n5n.mjs";
import hyperoperate from "./index.mjs";

const successor = hyperoperate(0n);
const add = hyperoperate(1n);
const multiply = hyperoperate(2n);
const exponentiate = hyperoperate(3n);
const tetrate = hyperoperate(4n);
const pentate = hyperoperate(5n);
const MAX = 2n ** 4n;
describe("Hyper Operation", () => {
  test("Succession", () => {
    expect(successor(1n)).toBe(2n);
  });
  test("Addition", () => {
    expect(add(3n, 4n)).toBe(3n + 4n);
  });
  test("Multiplication", () => {
    expect(multiply(5n, 6n)).toBe(5n * 6n);
  });
  test("Exponentiation", () => {
    expect(exponentiate(7n, 8n)).toBe(7n ** 8n);
  });
  // x ↑↑ 2 | x := 0...MAX
  test.each(Array.from(new Array(Number(MAX))).map((_, i) => BigInt(i)))(
    "Tetration: tetrate(%i, 2n) should be %i ** %i",
    (i) => {
      expect(tetrate(i, 2n)).toBe(i ** i);
    }
  );
  test("Tetration", () => {
    // x ↑↑ 2 | x := MAX
    expect(tetrate(MAX, 2n)).toBe(MAX ** MAX);

    // x ↑↑ 3 | x := 2n..7n
    expect(tetrate(2n, 3n)).toBe(16n);
    // expect(tetrate(2n, 3n)).toBe(2n ** (2n ** 2n));
    expect(tetrate(3n, 3n)).toBe(7625597484987n);
    // expect(tetrate(3n, 3n)).toBe(3n ** (3n ** 3n));
    // expect(tetrate(4n, 3n)).toBe(h4n4n3n);
    // expect(tetrate(4n, 3n)).toBe(4n ** (4n ** 4n));
    // expect(tetrate(5n, 3n)).toBe(h4n5n3n);
    // expect(tetrate(5n, 3n)).toBe(5n ** (5n ** 5n));
    // expect(tetrate(6n, 3n)).toBe(h4n6n3n);
    // expect(tetrate(6n, 3n)).toBe(6n ** (6n ** 6n));
    // expect(tetrate(7n, 3n)).toBe(h4n7n3n);
    // expect(tetrate(7n, 3n)).toBe(7n ** (7n ** 7n));
    // expect(tetrate(8n, 3n)).toBe(h4n8n3n);
    // expect(tetrate(8n, 3n)).toBe(8n ** (8n ** 8n));

    // x ↑↑ 4 | x := 2n
    expect(tetrate(2n, 4n)).toBe(65536n);
    // expect(tetrate(2n, 4n)).toBe(2n ** (2n ** (2n ** 2n)));

    // x ↑↑ 5 | x := 2n
    // expect(tetrate(2n, 5n)).toBe(h4n2n5n);
    // expect(tetrate(2n, 5n)).toBe(2n ** (2n ** (2n ** (2n ** 2n))));
  });

  test("Pentation", () => {
    // x ↑↑↑ 2 | x := 3n
    expect(pentate(3n, 2n)).toBe(7625597484987n);
    // expect(pentate(3n, 2n)).toBe(tetrate(3n, 3n));

    // x ↑↑↑ 3 | x := 2n
    expect(pentate(2n, 3n)).toBe(65536n);
    // expect(pentate(2n, 3n)).toBe(tetrate(2n, tetrate(2n, 2n)));
  });

  test.each(Array.from(new Array(Number(MAX))).map((_, i) => BigInt(i + 2)))(
    "Identity: hyperoperate(%i)(x, 1) := hyperoperate(%i + 1)(x, 1) := x | n> = 2",
    (i) => {
      expect(hyperoperate(i)(i, 1n)).toBe(i);
    }
  );

  test.each(Array.from(new Array(Number(MAX))).map((_, i) => BigInt(i + 1)))(
    "Rule of 2: hyperoperate(%i)(2, 2) := hyperoperate(%i + 1)(2, 2) := 4 | n >= 1",
    (i) => {
      expect(hyperoperate(i)(2n, 2n)).toBe(4n);
      // expect(hyperoperate(i)(2n, 2n)).toBe(hyperoperate(i + 1n)(2n, 2n));
    }
  );
});
