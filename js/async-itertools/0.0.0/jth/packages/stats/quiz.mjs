import quiz, { deepequal, ok, equal } from "pop-quiz";

import {
  mean$,
  median$,
  mode$,
  modes$,
  sort$,
  sortD$,
  randomize$,
  sum$,
  product$,
  populationVariance$,
  populationStandardDeviation$,
  sampleVariance$,
  sampleStandardDeviation$,
  fiveNumberSummary$,
  fiveNumberSummaryB$,
} from "./index.mjs";

await quiz("sum$ should add elements of stack", function* () {
  yield deepequal(sum$([1, 2, 3]), [6]);
});

await quiz("product$ should multiply elements of stack", function* () {
  yield deepequal(product$([2, 4, 6]), [48]);
});

await quiz(
  "randomize$ should return stack with items in a random order",
  function* () {
    const stack = [2, 4, 6];
    const result = randomize$(stack);

    for (const i of stack) {
      yield ok(result.includes(i), `${i} is in ${stack}`);
    }
    yield equal(stack.length, result.length);
  }
);
