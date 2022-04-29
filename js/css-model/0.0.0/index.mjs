import wrapString from "../../wrap-number-string/0.0.0/index.mjs";

const CSSModel = class {
  #target;
  #prefix;
  #tracked;
  constructor(target = null, prefix = "") {
    this.#tracked = new Set();
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
    this.#target.style.setProperty(name, value);
  }
  set(name, value, string = true, reg = true) {
    const n = `--${this.#prefix}-${name}`;
    if (reg) {
      this.setRaw(n, value);
    }
    if (string) {
      this.setRaw(`${n}-str`, wrapString(value));
    }
    this.track(name, string, reg);
  }
  track(name, string = true, reg = true) {
    const n = `--${this.#prefix}-${name}`;
    if (reg) {
      this.#tracked.add(n);
    }
    if (string) {
      this.#tracked.add(`${n}-str`);
    }
  }

  untrack(name, string = true, reg = true) {
    const n = `--${this.#prefix}-${name}`;
    if (reg) {
      this.#tracked.delete(n);
    }
    if (string) {
      this.#tracked.delete(`${n}-str`);
    }
  }
  getRaw(key) {
    const value = this.#target.style.getPropertyValue(key).trim();
    return value;
  }
  get(name) {
    return this.getRaw(`--${this.#prefix}-${name}`);
  }
  getStr(name) {
    return this.getRaw(`--${this.#prefix}-${name}-str`);
  }
  setObject(obj = {}) {
    for (const [key, value] of Object.entries(obj)) {
      this.set(key, value);
    }
  }
  remove(name, string = true, reg = true) {
    const n = `--${this.#prefix}-${name}`;
    if (reg) {
      this.#target.style.removeProperty(n);
    }
    if (string) {
      this.#target.style.removeProperty(`${n}-str`);
    }
    this.untrack(name, string, reg);
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
  get tracked() {
    return [...this.#tracked];
  }
  get prefix() {
    return this.#prefix;
  }
};

export default CSSModel;
