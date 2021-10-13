//https://keycode.info/

import CSSModel from "../css-model@0.0.0/index.mjs";

const buildString = (
  preamble = "",
  { altKey, ctrlKey, metaKey, shiftKey, code }
) =>
  [
    preamble,
    altKey ? "alt" : "",
    ctrlKey ? "ctrl" : "",
    metaKey ? "meta" : "",
    shiftKey ? "shift" : "",
  ]
    .filter((x) => x)
    .concat([code])
    .join("-");

const keyup = function (event) {
  this.set(buildString("pressed", event), "");
};

const keydown = function (event) {
  this.set(buildString("pressed", event), "1");
};

const CSSModelKeyboard = class extends CSSModel {
  #keyup;
  #keydown;
  constructor(target = globalThis.document, prefix = "key") {
    super(target, prefix);
    this.#keyup = keyup.bind(this);
    this.#keydown = keydown.bind(this);
    this.target.addEventListener("keyup", this.#keyup);
    this.target.addEventListener("keydown", this.#keydown);
  }
  detach() {
    this.target.removeEventListener("keyup", this.#keyup);
    this.target.removeEventListener("keydown", this.#keydown);
    return super.detach();
  }
};

export default CSSModelKeyboard;
