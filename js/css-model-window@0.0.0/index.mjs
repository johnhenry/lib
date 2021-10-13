import CSSModel from "../css-model@0.0.0/index.mjs";
const setwindowsize = function () {
  this.set("width", globalThis.innerWidth);
  this.set("height", globalThis.innerHeight);
};

const CSSModelWindow = class extends CSSModel {
  #setwindowsize;
  constructor(target = globalThis.document, prefix = "window") {
    super(target, prefix);
    this.#setwindowsize = setwindowsize.bind(this);
    globalThis.addEventListener("load", this.#setwindowsize);
    globalThis.addEventListener("resize", this.#setwindowsize);
  }
  detach() {
    globalThis.removeEventListener("load", this.#setwindowsize);
    globalThis.removeEventListener("resize", this.#setwindowsize);
    return super.detach();
  }
};

export default CSSModelWindow;
