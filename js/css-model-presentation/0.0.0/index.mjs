// https://stackoverflow.com/a/17698713/1290781
import CSSModel from "../../css-model/0.0.0/index.mjs";
import unsuitable from "./unsuitable.mjs";
const CSSModelPresentation = class extends CSSModel {
  #target;
  #sizeFactor = 1;
  #slides = [];
  #horizontal = false;
  #reset;
  #setScroll;
  #endSpace;
  constructor(
    target = globalThis.document,
    prefix = "presentation",
    { sizeFactor = 1, horizontal = false } = { sizeFactor: 1 }
  ) {
    super(target, prefix);
    this.#reset = this.reset.bind(this);
    this.#setScroll = this.setScroll.bind(this);
    this.#target = target;
    this.#sizeFactor = sizeFactor;
    this.#horizontal = horizontal;
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
  reset(scroll = true) {
    if (scroll) {
      globalThis.scrollTo(0, 0);
    }
    let absoluteSize = 0;
    const size =
      this.orientation === "vertical"
        ? globalThis.innerHeight
        : globalThis.innerWidth;
    this.set("size", `${size}px`);
    this.#slides = [...this.#target.children]
      .filter(
        (child) =>
          child.nodeType === Node.ELEMENT_NODE &&
          !unsuitable.includes(child.tagName.toLowerCase())
      )
      .map((child) => {
        const sizeFactor =
          Number(child.dataset.sizeFactor || 1) * this.#sizeFactor * size;
        const slide = new CSSModel(child, `${this.prefix}-slide`);
        slide.set("size-factor", sizeFactor);
        slide.set("size", `${sizeFactor}px`);
        absoluteSize += sizeFactor;
        return slide;
      });
    this.#endSpace =
      Number(this.#target.lastElementChild.dataset.sizeFactor || 1) *
      this.#sizeFactor *
      size;
    this.set("size", `${absoluteSize + this.#endSpace}px`);
    this.set("total", this.#slides.length);
  }
  setScroll() {
    const absolutePosition =
      this.orientation === "vertical" ? globalThis.scrollY : globalThis.scrollX;
    this.set("absolute-position", `${absolutePosition}px`);
    let localPosition = 0;
    let index = 0;
    let slideSize = 0;
    for (const slide of this.slides) {
      slideSize = parseFloat(slide.get("size-factor"));
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
    }
    this.set("position", `${position}px`);
    this.set("index", index);
    this.set("norm", `${position / parseFloat(current.get("size-factor"))}`);
    this.set("current-size", `${current.get("size-factor")}px`);
    for (const slide of this.slides) {
      if (slide === current) {
        slide.remove("display-none");
      } else {
        slide.set("display-none", "none");
      }
    }
  }
  get orientation() {
    return this.#horizontal ? "horizontal" : "vertical";
  }
  get slides() {
    return this.#slides;
  }
  get endSpace() {
    return this.#endSpace;
  }
};
export default CSSModelPresentation;
