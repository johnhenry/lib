/**
 * Appends items to synchronous iterator
 * @kind function
 * @name conjoinSync
 * @param {iterator} iterator iterator
 * @param {itemList} itemList items to be appended
 * @returns copy of initial iterator with items appended
 */
export const conjoinSync = function* (iterator, ...itemList) {
  if (iterator) {
    yield* iterator;
  }
  yield* itemList;
};

/**
 * Appends items to asynchronous iterator
 * @kind function
 * @name conjoinAsync
 * @param {iterator} iterator iterator
 * @param {itemList} itemList items to be appended
 * @returns copy of initial iterator with items appended
 */
export const conjoinAsync = async function* (iterator, ...itemList) {
  if (iterator) {
    yield* iterator;
  }
  yield* itemList;
};

export default conjoinSync;
