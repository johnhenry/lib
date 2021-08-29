export default (func, N = Infinity, success = () => {}, failure = () => {}) => {
  let tries = 0;
  return (...args) => {
    if (tries++ >= N) {
      failure(tries);
      throw new Error(`${tries} > ${N}`);
    }
    success(tries);
    return func(...args);
  };
};
