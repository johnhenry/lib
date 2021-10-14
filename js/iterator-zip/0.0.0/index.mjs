/**
 * Zips synchronous iterators
 * @kind function
 * @name zipSync
 * @param {iteratorList} iterators iterators
 * @returns an iterator who's members are the members of the given iterators zipped sequencially
 */
export const zipSync = function* (...iteratorList) {
  const generators = iteratorList.map((iterator) =>
    iterator[Symbol.iterator]()
  );
  outer: while (true) {
    const result = [];
    for (const generator of generators) {
      const { value, done } = generator.next();
      if (done) {
        break outer;
      }
      result.push(value);
    }
    yield result;
  }
};

export const zipAsync = function () {
  throw new Error("not implemneted");
};

export default zipSync;
