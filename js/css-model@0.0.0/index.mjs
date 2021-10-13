const CSSModel = class {
  #target;
  #tracked = new Set();
  constructor(target = null) {
    if (!target) {
      throw new Error("No target provided");
    }
    this.#target = target;
  }
  get target() {
    return this.#target;
  }
  set(name, value) {
    this.#target.documentElement.style.setProperty(`--${name}`, value);
    this.#tracked.add(name);
  }
  get(name) {
    this.#target.documentElement.style.getPropertyValue(`--${name}`, value);
  }
  remove(name) {
    this.#target.documentElement.style.removeProperty(`--${name}`);
    this.#tracked.delete(name);
  }
  detach() {
    for (const name of this.#tracked) {
      this.remove(name);
    }
    const target = this.#target;
    this.#target = null;
    return target;
  }
};

export default CSSModel;
