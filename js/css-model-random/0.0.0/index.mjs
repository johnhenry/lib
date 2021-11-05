import CSSModel from "../../css-model/0.0.0/index.mjs";

const CSSModelRandom = class extends CSSModel {
  #size;
  #multiplier;
  #ceil;
  #floor;
  constructor(target = globalThis.document, prefix = "rand", options = {}) {
    super(target, prefix);
    this.#size = options.size || 1;
    this.#multiplier = options.multiplier || 1;
    this.#floor = !!options.floor;
    this.#ceil = !!options.ceil;
    this.reset();
  }
  reset() {
    for (let i = 0; i < this.#size; i++) {
      const random = Math.random() * this.#multiplier;
      const result = this.#ceil
        ? Math.ceil(random)
        : this.#floor
        ? Math.floor(random)
        : random;
      this.set(i, result);
    }
  }
};

export default CSSModelRandom;
