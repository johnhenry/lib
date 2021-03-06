// https://stackoverflow.com/a/17698713/1290781
import CSSModel from "../../css-model/0.0.0/index.mjs";
import unsuitable from "./unsuitable.mjs";
const CSSModelPresentation = class extends CSSModel {
  #span = 1;
  #slides = [];
  #horizontal = false;
  #reset;
  #setScroll;
  #endSpace;
  #size;
  #useEndSpace = true;
  #transformNorm;
  constructor(
    target = globalThis.document.documentElement,
    prefix = "presentation"
  ) {
    super(target, prefix);
    this.#reset = this.reset.bind(this);
    this.#setScroll = this.setScroll.bind(this);
    globalThis.addEventListener("scroll", this.#setScroll);
    globalThis.addEventListener("load", this.#reset);
    globalThis.addEventListener("resize", this.#reset);
    this.#reset();
    this.#setScroll();
  }
  detach() {
    globalThis.removeEventListener("scroll", this.#setScroll);
    globalThis.removeEventListener("load", this.reset);
    globalThis.removeEventListener("resize", this.reset);
    return super.detach();
  }
  reset() {
    let absoluteSize = 0;
    this.#span = Number(this.target.dataset.span || 1);
    this.#horizontal = this.target.dataset.horizontal !== undefined;
    this.#useEndSpace = this.target.dataset.noEndSpace === undefined;
    this.#size = this.#horizontal
      ? globalThis.innerWidth
      : globalThis.innerHeight;
    this.set("size", `${this.#size}px`);
    this.#slides = [...this.target.children]
      .filter(
        (child) =>
          child.nodeType === Node.ELEMENT_NODE &&
          !unsuitable.includes(child.tagName.toLowerCase())
      )
      .map((child) => {
        const span = Number(child.dataset.span || 1) * this.#span;
        const slide = new CSSModel(child, `${this.prefix}-slide`);
        slide.set("span", span);
        slide.set("size", `${span * this.#size}px`);
        absoluteSize += span * this.#size;
        return slide;
      });
    this.#endSpace = this.#useEndSpace
      ? Number(this.target.lastElementChild.dataset.span || 1) *
        this.#span *
        this.#size
      : 0;
    this.#transformNorm = this.target.dataset.transformNorm
      ? new Function(
          "norm",
          "span",
          `return [${this.target.dataset.transformNorm}];`
        )
      : (norm) => [norm];
    this.set("size", `${absoluteSize + this.#endSpace}px`);
    this.set("total", this.#slides.length);
  }
  setScroll() {
    const absolutePosition = this.#horizontal
      ? globalThis.scrollX
      : globalThis.scrollY;
    this.set("absolute-position", `${absolutePosition}px`);
    let localPosition = 0;
    let index = 0;
    let slideSize = 0;
    for (const slide of this.slides) {
      slideSize = parseFloat(slide.get("span")) * this.#size;
      localPosition += slideSize;
      if (localPosition > absolutePosition) {
        localPosition -= slideSize;
        break;
      }
      index += 1;
    }
    let position = absolutePosition - localPosition;
    let current = this.slides[index];

    if (!current) {
      current = this.slides[this.slides.length - 1];
      position = this.endSpace;
      index = this.slides.length - 1;
      this.set("end", 1);
    } else {
      this.remove("end");
    }
    const span = current.get("span");

    this.set("position", `${position}px`);
    this.set("index", index);
    const norm = position / parseFloat(current.get("size"));
    this.set("norm", `${norm}`);
    let valueIndex = 0;
    for (const value of [norm].concat(this.#transformNorm(norm, span))) {
      this.set(`norm-${valueIndex++}`, value);
    }
    this.set("current-size", current.get("size"));
    this.set(
      "absolute-norm",
      `${absolutePosition / parseFloat(this.get("size"))}`
    );

    if (index === position && position === 0) {
      this.set("begin", 1);
    } else {
      this.remove("begin");
    }

    for (const slide of this.slides) {
      if (slide === current) {
        slide.remove("display-none");
        slide.set("showing", 1);
      } else {
        slide.set("display-none", "none");
        slide.remove("showing");
      }
    }
  }
  get slides() {
    return this.#slides;
  }
  get endSpace() {
    return this.#endSpace;
  }
};
export default CSSModelPresentation;
