// import testing framework
import tester, { equal, ok } from "../../tester@0.0.0/index.mjs";

import "../number-prototype.mjs";
import i from "../i.mjs"; // import 𝑖 from "./i.mjs"; // Does not work in Deno due to unicode issues
import { fromRectangular, fromPolar } from "../ComplexNumber.mjs";
import {
  add,
  subtract,
  multiply,
  divide,
  trunc,
  equal as numEqual,
  random,
} from "../ComplexMath.mjs";

await tester("Numbers", function* () {
  const SAMPLE_NUM = Math.random();
  yield equal(
    SAMPLE_NUM.r,
    SAMPLE_NUM,
    "regular number should have real value of itself"
  );
  yield equal(
    SAMPLE_NUM.m,
    SAMPLE_NUM,
    "regular number should have magnitude value of itself"
  );
  yield equal(
    SAMPLE_NUM.i,
    0,
    "regular number should have imaginary value of zero"
  );
  yield equal(
    SAMPLE_NUM.a,
    0,
    "regular number should have angle value of zero"
  );
});

await tester("Addition", function* () {
  const A0 = random();
  const A1 = random();
  const A2 = add(A0, A1);
  yield ok(numEqual(A0.r + A1.r, A2.r), "should be equal");
  yield ok(numEqual(A0.i + A1.i, A2.i), "should be equal");
});

await tester("Subtraction", function* () {
  const S0 = random();
  const S1 = random();
  const S2 = subtract(S0, S1);
  yield ok(numEqual(S0.r - S1.r, S2.r), "should be equal");
  yield ok(numEqual(S0.i - S1.i, S2.i), "should be equal");
});

await tester("Multiplication", function* () {
  yield ok(numEqual(-1, multiply(i, i)), "should be equal");
});

await tester("Division", function* () {
  yield ok(numEqual(subtract(0, i), divide(1, i)), "should be equal");
});

await tester("Addition", function* () {
  const A0 = random();
  const A1 = random();
  const A2 = add(A0, A1);
  yield ok(numEqual(A0.r + A1.r, A2.r), "should be equal");
  yield ok(numEqual(A0.i + A1.i, A2.i), "should be equal");
});

await tester("Subtraction", function* () {
  const S0 = random();
  const S1 = random();
  const S2 = subtract(S0, S1);
  yield ok(numEqual(S0.r - S1.r, S2.r), "should be equal");
  yield ok(numEqual(S0.i - S1.i, S2.i), "should be equal");
});

await tester("Multiplication", function* () {
  yield ok(numEqual(-1, multiply(i, i)), "should be equal");
});

await tester("Division", function* () {
  yield ok(numEqual(subtract(0, i), divide(1, i)), "should be equal");
});

await tester("Truncation", function* () {
  yield ok(
    numEqual(
      trunc(fromRectangular(1.1234, 5.6789), 2),
      trunc(fromRectangular(1.12, 5.68), 2)
    )
  );
});

await tester("Polar", function* () {
  yield ok(numEqual(fromPolar(1, Math.PI / 2), i));
});
