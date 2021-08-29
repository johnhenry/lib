import { conjoinSync, conjoinAsync } from "../iterator-conjoin@0.0.0/index.mjs";
import { reduceSync, reduceAsync } from "../iterator-reduce@0.0.0/index.mjs";

const emptySync = conjoinSync();
const emptyAsync = conjoinAsync();
/**
 * Transduce
 * @kind function
 * @name transduce
 * @ignore
 */
const transduce = (itemCollection, reducer, lastreducer, init, reduce) =>
  reduce(itemCollection, reducer(lastreducer), init);
/**
 * Compose Functions
 * @kind function
 * @name composeFunctions
 * @ignore
 */
const composeFunctions =
  (...functions) =>
  (input) =>
    functions.reduceRight((input, func) => func(input), input);

// const composeFunctions =
//   (...functions) =>
//   (input) => {
//     for (const func of functions) {
//       input = func(input);
//     }
//     return input;
//   };

/**
 * Compose Aync sFunctions
 * @kind function
 * @name composeAsyncFunctions
 * @ignore
 */
// const composeAsyncFunctions =
//   (...functions) =>
//   async (input) =>
//     functions.reduceRight(async (input, func) => func(input), input);

const composeAsyncFunctions =
  (...functions) =>
  async (input) => {
    for (const func of functions) {
      input = await func(input);
    }
    return input;
  };

/**
 * Create Custom Transduce
 * @kind function
 * @name createCustomTranduce
 * @ignore
 */
const createCustomTranduce =
  (conjoin, empty, reduce, compose) =>
  (...functions) =>
  (itemCollection) =>
    transduce(itemCollection, compose(...functions), conjoin, empty, reduce);

/**
 * Create a function that transduces an asynchronous iterator from a list of transducer function
 * @kind function
 * @name transduceAsync
 * @param {...functions[]} transducers list of transducers
 * @see transducers
 * @see transduceSync
 * @example <caption>Asynchronously log transduced numbers </caption>
 * ```javascript
 * import { transduceAsync, transducers, number } from '...';
 * const {iterateAsync} = number;
 * const {
 *     map,
 *     filter,
 *     take,
 * } = transducers;
 * const LIMIT = 2 ** 2;
 * const transduce = transduceAsync(
 *     filter(x => x % 2),
 *     map(x => x + 1),
 *     take(LIMIT),
 * );
 * for await (const result of transduce(iterateAsync(Infinity))) {
 *   console.log(result);
 * }
 * ```
 */
export const transduceAsync = createCustomTranduce(
  conjoinAsync,
  emptyAsync,
  reduceAsync,
  composeFunctions
);

/**
 * Create a function that transduces a synchronous iterator from a list of transducer function
 * @kind function
 * @name transduceSync
 * @param {...functions[]} transducers list of transducers
 * @see transducers
 * @see transduceAsync
 * @example <caption>Synchronously log transduced numbers </caption>
 * ```javascript
 * import { transduceSync, transducers, number } from '...';
 * const {iterateSync} = number;
 * const {
 *     map,
 *     filter,
 *     take,
 * } = transducers;
 * const LIMIT = 2 ** 2;
 * const transduce = transduceSync(
 *     filter(x => x % 2),
 *     map(x => x + 1),
 *     take(LIMIT),
 * );
 * for await (const result of transduce(iterateSync(Infinity))) {
 *   console.log(result);
 * }
 * ```
 */
export const transduceSync = createCustomTranduce(
  conjoinSync,
  emptySync,
  reduceSync,
  composeFunctions
);

export default transduceSync;
