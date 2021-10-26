// implement setTimeout and clearTimeout in javascript using setInterval
let timeout = 0;
const timeouts = new Set();

export default (func, time, ...args) => {
  const localTimeout = timeout++;
  timeouts.add(localTimeout);
  const interval = setInterval(() => {
    if (timeouts.has(localTimeout)) {
      timeouts.delete(localTimeout);
      func(...args);
      clearInterval(interval);
    }
  }, time);
  return localTimeout;
};

export const clear = timeouts.delete.bind(timeouts);
