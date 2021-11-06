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
  setRaw(name, value) {
    this.#target.documentElement.style.setProperty(name, value);
  }
  set(name, value, string = true, reg = true) {
    const n = `--${this.#prefix}-${name}`;
    if (reg) {
      this.setRaw(n, value);
    }
    if (string) {
      this.setRaw(`${n}-str`, wrapString(value));
    }
    this.#tracked.add(name);
  }
  getRaw(key) {
    const value = this.#target.documentElement.style
      .getPropertyValue(key)
      .trim();
    return value;
  }
  get(name) {
    return this.getRaw(`--${this.#prefix}-${name}`);
  }
  getStr(name) {
    return this.getRaw(`--${this.#prefix}-${name}-str`);
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
  valueIs(name, value) {
    console.log(this.get);
    const left = [this.get, this.getNum, this.getStr]
      .map((x) => x.bind(this))
      .map((x) => x(name));
    console.log(name, left);
    return false;
  }
};

export default CSSModel;
