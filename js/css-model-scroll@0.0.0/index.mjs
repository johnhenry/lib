// https://stackoverflow.com/a/17698713/1290781
import CSSModel from "../css-model@0.0.0/index.mjs";
const setscrolllimit = function () {
  const y = globalThis.scrollY;
  const x = globalThis.scrollX;
  const vertical =
    Math.max(
      this.target.body.scrollHeight,
      this.target.body.offsetHeight,
      this.target.documentElement.clientHeight,
      this.target.documentElement.scrollHeight,
      this.target.documentElement.offsetHeight
    ) - globalThis.innerHeight;
  const horizontal =
    Math.max(
      this.target.body.scrollWidth,
      this.target.body.offsetWidth,
      this.target.documentElement.clientWidth,
      this.target.documentElement.scrollWidth,
      this.target.documentElement.offsetWidth
    ) - globalThis.innerWidth;
  const vratio = y / vertical;
  const hratio = x / horizontal;

  this.set("vertical-max", vertical);
  this.set("horizontal-max", horizontal);

  this.set("vertical", y);
  this.set("horizontal", x);

  this.set("vertical-ratio", vratio);
  this.set("horizontal-ratio", hratio);
};

const CSSModelScroll = class extends CSSModel {
  #setscrolllimit;
  constructor(target = globalThis.document, prefix = "window-scroll") {
    super(target, prefix);
    this.#setscrolllimit = setscrolllimit.bind(this);
    globalThis.addEventListener("load", this.#setscrolllimit);
    this.target.addEventListener("scroll", this.#setscrolllimit);
    globalThis.addEventListener("resize", this.#setscrolllimit);
  }
  detach() {
    globalThis.removeEventListener("load", this.#setscrolllimit);
    this.target.removeEventListener("scroll", this.#setscrolllimit);
    globalThis.removeEventListener("resize", this.#setscrolllimit);
    return super.detach();
  }
};

export default CSSModelScroll;
