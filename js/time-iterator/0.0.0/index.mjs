import { transduceAsync } from "../iterator-transduce/0.0.0/index.mjs";
import { map, take } from "../iterator-transduce/0.0.0/transducers.mjs";
import range from "../range-iterator/0.0.0/index.mjs";
const wait = map(async (x) => {
  return new Promise((resolve) => setTimeout(resolve, x, x));
});
const millisecondTranducer = (transform = (_) => _, limit = Infinity) =>
  transduceAsync(map(transform), take(limit), wait);

const timeIterator = (
  min = 0,
  max = undefined,
  step = undefined,
  transform = (_) => _
) => millisecondTranducer(transform)(range(min, max, step));

export default timeIterator;
