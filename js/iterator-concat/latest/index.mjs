/**
 * Concatinates sequence of synchronous iterables
 * @kind function
 * @name concatSync
 * @param {iterators} iterators iterators
 * @returns iterator generating sequence of combined from given iterables; empty iterator if nothing is passed
 */

export const concatSync = function* (...iterators) {
  for (const iterator of iterators) {
    yield* iterator;
  }
};

/**
 * Concatinates sequence of asynchronous iterables
 * @kind function
 * @name concatAsync
 * @param {iterators} iterators iterators
 * @returns iterator generating sequence of combined from given iterables; empty iterator if nothing is passed
 */
export const concatAsync = async function* (...iterators) {
  for (const iterator of iterators) {
    yield* iterator;
  }
};

export default concatSync;
