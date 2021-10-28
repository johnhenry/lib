import wrapString from "../../wrap-number-string/0.0.0/index.mjs";

const CSSModel = class {
  #target;
  #prefix;
  #tracked = new Set();
  constructor(target = null, prefix = "") {
    if (!target) {
      throw new Error("No target provided");
    }
    if (!prefix) {
      throw new Error("No prefix provided");
    }
    this.#target = target;
    this.#prefix = prefix;
  }
  get target() {
    return this.#target;
  }
  set(name, value) {
    const n = `--${this.#prefix}-${name}`;
    this.#target.documentElement.style.setProperty(n, value);
    this.#target.documentElement.style.setProperty(
      `${n}-str`,
      wrapString(value)
    );
    this.#tracked.add(name);
  }
  get(name) {
    this.#target.documentElement.style.getPropertyValue(
      `--${this.#prefix}-${name}`,
      value
    );
  }
  getStr(name) {
    this.#target.documentElement.style.getPropertyValue(
      `--${this.#prefix}-${name}-str`,
      value
    );
  }
  remove(name) {
    this.#target.documentElement.style.removeProperty(
      `--${this.#prefix}-${name}`
    );
    this.#tracked.delete(name);
    this.#tracked.delete(`${name}-str`);
  }
  detach(...args) {
    for (const name of this.#tracked) {
      this.remove(name);
    }
    const target = this.#target;
    this.#target = null;
    return target;
  }
};

export default CSSModel;
