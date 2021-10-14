import { transduceAsync as transduce } from "./index.mjs";
import { map, filter, take, group } from "./transducers.mjs";
import range from "../range-iterator/0.0.0/index.mjs";
const LIMIT = 4;
const transform = transduce(
  filter((x) => x % 2),
  map((x) => x + 1),
  group(LIMIT),
  take(LIMIT)
);

describe("Transform Async", () => {
  it("Should synchrnously transform", async () => {
    const { value } = await transform(range(Infinity)).next();
    expect(value).toEqual([2, 4, 6, 8]);
  });
});
