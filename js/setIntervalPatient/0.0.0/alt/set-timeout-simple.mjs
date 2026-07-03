// implement setTimeout and clearTimeout in javascript using setInterval

export default (func, time, ...args) => {
  const interval = setInterval(() => {
    func(...args);
    clearInterval(interval);
  }, time);
  return interval;
};

export const clear = clearInterval;
