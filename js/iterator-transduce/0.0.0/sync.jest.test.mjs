import transduce from "./index.mjs";
import { map, filter, take, group } from "./transducers.mjs";
import range from "../range-iterator/0.0.0/index.mjs";
const LIMIT = 4;
const transform = transduce(
  filter((x) => x % 2),
  map((x) => x + 1),
  take(LIMIT),
  group(LIMIT)
);

describe("Transduce (Sync)", () => {
  it("Should synchrnously transform", () => {
    const { value } = transform(range(Infinity)).next();
    expect(value).toEqual([2, 4, 6, 8]);
  });
});
