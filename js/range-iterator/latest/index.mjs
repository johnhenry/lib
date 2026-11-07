/**
 * Create a sequence of numbers
 * @kind function
 * @name iterateSync
 * @param {number} min number at which to start iteration
 * @param {number} max number before which to stop iteration
 * @param {number} increment increment
 * @see iterateAsync
 * @example <caption>Log an infinite sequence of numbers starting with 5 </caption>
 * ```javascript
 * import { number } from '...';
 * for(const num of number.iterateSync(5)){
 * console.log(num);
 * }
 * ```
 */
export default function* (min = 0, max, inc = 1) {
  if (max === undefined) {
    if (min < 0) {
      max = 0;
      // max = typeof min === 'bigint' ? 0n : 0;
    } else {
      max = min;
      min = 0;
      // min = typeof min === 'bigint' ? 0n : 0;
    }
  }
  // if (typeof min === 'bigint') {
  //     inc = BigInt(inc);
  // }
  if (min > max) {
    while (min > max) {
      yield min;
      min -= inc;
    }
    return;
  }
  while (min < max) {
    yield min;
    min += inc;
  }
  return;
}
