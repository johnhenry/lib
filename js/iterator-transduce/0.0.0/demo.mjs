import transduce, { transduceAsync } from "./index.mjs";
import { map, filter, take, group } from "./transducers.mjs";
import range from "../../range-iterator/0.0.0/index.mjs";
const LIMIT = 16;
const transform = transduce(
  filter((x) => x % 2),
  map((x) => x + 1),
  take(LIMIT),
  group(LIMIT)
);

for (let x of transform(range(Infinity))) {
  console.log(x);
}

const transformAsync = transduceAsync(
  filter((x) => x % 2),
  map(async (x) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return x + 1;
  }),
  take(LIMIT)
);

for await (let x of transformAsync(range(Infinity))) {
  console.log(x);
}
