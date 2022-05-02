//https://keycode.info/

import CSSModel from "../../css-model/0.0.0/index.mjs";
const CSSModelGamepads = class extends CSSModel {
  #interval;
  constructor(
    target = globalThis.document,
    prefix = "gamepad",
    limit = Infinity
  ) {
    super(target, prefix);
    0;
    this.#interval = setInterval(() => {
      const pads = navigator.getGamepads
        ? navigator.getGamepads()
        : navigator.webkitGetGamepads
        ? navigator.webkitGetGamepads
        : [];

      for (const pad of pads) {
        console.log({ pad });
        if (!pad) continue;
        const { id, index, buttons, axes } = pad;
        if (index > limit) break;
        this.set(`id`, id);
        this.set(`${index}-id`, id);
        for (let j = 0; j < buttons.length; j++) {
          const { pressed, touched, value } = buttons[j];
          this.set(`button-${j}-pressed`, pressed ? 1 : "");
          this.set(`button-${j}-touched`, touched ? 1 : "");
          this.set(`button-${j}-value`, value);
          this.set(`${index}-button-${j}-pressed`, pressed ? 1 : "");
          this.set(`${index}-button-${j}-touched`, touched ? 1 : "");
          this.set(`${index}-button-${j}-value`, value);
        }
        for (let j = 0; j < axes.length; j++) {
          this.set(`axis-${j}`, axes[j]);
          this.set(`${index}-axis-${j}`, axes[j]);
        }
      }
      if (pads[0]) {
        const pad = pads[0];
        const { id, buttons, axes } = pad;
      }
    }, 50);
  }
  detach() {
    clearInterval(this.#interval);
    return super.detach();
  }
};

export default CSSModelGamepads;
