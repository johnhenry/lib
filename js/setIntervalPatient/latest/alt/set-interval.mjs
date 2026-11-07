// implement setInterval and clearInterval in javascript using setTimeout
let timeout = 0;
const timeouts = new Set();

export default (func, time, ...args) => {
  const localTimeout = timeout++;
  timeouts.add(localTimeout);
  const next = () => {
    if (timeouts.has(localTimeout)) {
      setTimeout(next, time);
      func(...args);
      // We run "func" after setTimeout has been called --
      // meaning that the next call to func does not wait
      // for the previous call to finish.
    }
  };
  setTimeout(next, time);
  return localTimeout;
};
export const clear = timeouts.delete.bind(timeouts);
