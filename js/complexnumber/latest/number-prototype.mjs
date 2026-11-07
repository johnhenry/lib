Number.prototype.consoleIterator = function () {
  return [this];
};
Object.defineProperty(Number.prototype, "r", {
  configurable: true,
  get: function () {
    return this;
  },
});
Object.defineProperty(Number.prototype, "i", {
  configurable: true,
  get: function () {
    return 0;
  },
});
Object.defineProperty(Number.prototype, "m", {
  configurable: true,
  get: function () {
    return this;
  },
});
Object.defineProperty(Number.prototype, "a", {
  configurable: true,
  get: function () {
    return 0;
  },
});
