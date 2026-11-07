export default (func, N = Infinity, success = () => {}, failure = () => {}) => {
  let tries = 0;
  return (...args) => {
    if (++tries % N === 0) {
      failure(tries);
      throw new Error(`${tries} % ${N} === 0`);
    }
    success(tries);
    return func(...args);
  };
};
