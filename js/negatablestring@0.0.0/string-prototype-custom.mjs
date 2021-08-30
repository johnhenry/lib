import { NegatableString } from "./index.mjs";
const setPrototype = (level = 2, prototype = String.prototype) => {
  try {
    prototype.consoleIterator = function (...args) {
      return NegatableString.prototype.consoleIterator.apply(this, args);
    };
    Object.defineProperty(prototype, "rep", {
      get: function () {
        return this.split("").map((char) => [char, false]);
      },
    });
  } catch (e) {
    switch (level) {
      case 2:
      case "error":
        throw e;
      case 1:
      case "warn":
        console.warn(e);
    }
  }
};
export const setPrototypeWarn = (prototype = String.prototype) =>
  setPrototype(1, prototype);
export const setPrototypeError = (prototype = String.prototype) =>
  setPrototype(2, prototype);
export default setPrototype;
