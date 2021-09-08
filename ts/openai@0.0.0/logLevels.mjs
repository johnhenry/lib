export default (currentLevel = 0, log = console.log) =>
  (minLevel, ...args) => {
    if (currentLevel >= minLevel) {
      console.log(...args);
    }
  };
