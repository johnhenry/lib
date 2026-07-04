import succeedsOnN from "../../higher-order-success/0.0.0/succeeds-on.mjs";
import { performance } from "perf_hooks";

import iterator from "./iterator.mjs";
import transform from "./transform.mjs";

const RETURN_SUCCESS = () => "success";

describe("Iterator Constant", () => {
  const N = 1;
  const i = iterator(N * 100);
  const cases = Array.from(new Array(4)).map((_, i) => [N, i, N]);
  test.each(cases)(
    "Should take around %i00 ms for round %i",
    async (_, __, expected) => {
      const start = performance.now();
      await i.next();
      expect(Math.round((performance.now() - start) / 100)).toEqual(expected);
    }
  );
});

describe("Iterator Linear", () => {
  const N = 1;
  const i = iterator({ wait: N * 100, mode: "linear" });
  const cases = Array.from(new Array(4)).map((_, i) => [
    i + 1,
    i * N,
    (i + 1) * N,
  ]);

  test.each(cases)(
    "Should take around %i00 ms for round %i",
    async (_, __, expected) => {
      const start = performance.now();
      await i.next();
      expect(Math.round((performance.now() - start) / 100)).toEqual(expected);
    }
  );
});

describe("Iterator Exponential", () => {
  const N = 1;
  const i = iterator({ wait: N * 100, mode: "exponential" });
  const cases = Array.from(new Array(4)).map((_, i) => [
    1 * 2 ** (i * N),
    i * N,
    1 * 2 ** (i * N),
  ]);

  test.each(cases)(
    "Should take around %i00 ms for round %i",
    async (_, __, expected) => {
      const start = performance.now();
      await i.next();
      expect(Math.round((performance.now() - start) / 100)).toEqual(expected);
    }
  );
});

// {
//   const success = succeedsOnN(RETURN_SUCCESS, 1);
//   while (true) {
//     try {
//       success();
//       break;
//     } catch {
//       continue;
//     }
//   }
// }

{
}

// {
//   const succeedsOn3 = succeedsOnN(RETURN_SUCCESS(), 3);
//   const t = transform(succeedsOn3, 1000);
//   console.log(await t());
// }

// {
//   const succeedsOn3 = succeedsOnN(3);
//   const t = funcSync(succeedsOn3);
//   t();
// }

// {
//   setRetry(succeedsOnN(4), [1000, 3]);
// }

// {
//   setBackoff(succeedsOnN(4), [1000, 3]);
// }
