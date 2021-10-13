// https://codepen.io/bramus/pen/eBZgPB
// https://css-tricks.com/how-to-map-position-in-css/
// https://codersblock.com/blog/what-can-you-put-in-a-css-variable/
// https://developer.mozilla.org/en-US/docs/Web/CSS/env()

import CSSModel from "../css-model@0.0.0/index.mjs";
const mousemove = function ({ clientY, clientX }) {
  const angle = Math.atan2(clientY, clientX) + Math.PI / 2;
  const magnitude = Math.sqrt(clientX ** 2 + clientY ** 2);
  const magnitudeNormalized = Math.sqrt(
    (clientX / globalThis.innerWidth) ** 2 +
      (clientY / globalThis.innerHeight) ** 2
  );
  this.set("x", clientX);
  this.set("y", clientY);
  this.set("ang", angle);
  this.set("mag", magnitude);
  this.set("magnorm", magnitudeNormalized);
};
const mouseup = function () {
  this.set("up", "1");
  this.set("down", "");
};
const mousedown = function () {
  this.set("up", "");
  this.set("down", "1");
};
const CSSModelMouse = class extends CSSModel {
  #mousemove;
  #mouseup;
  #mousedown;
  constructor(target = globalThis.document, prefix = "mouse") {
    super(target, prefix);
    this.set("up", "1");
    this.#mousemove = mousemove.bind(this);
    this.#mouseup = mouseup.bind(this);
    this.#mousedown = mousedown.bind(this);
    this.target.addEventListener("mousemove", this.#mousemove);
    this.target.addEventListener("mouseup", this.#mouseup);
    this.target.addEventListener("mousedown", this.#mousedown);
  }
  detach() {
    this.target.removeEventListener("mousemove", this.#mousemove);
    this.target.removeEventListener("mouseup", this.#mouseup);
    this.target.removeEventListener("mousedown", this.#mousedown);
    return super.detach();
  }
};

export default CSSModelMouse;
