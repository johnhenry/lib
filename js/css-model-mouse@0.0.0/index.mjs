// https://codepen.io/bramus/pen/eBZgPB
// https://css-tricks.com/how-to-map-mouse-position-in-css/
// https://codersblock.com/blog/what-can-you-put-in-a-css-variable/
// https://developer.mozilla.org/en-US/docs/Web/CSS/env()

import wrapString from "../wrap-number-string@0.0.0/index.mjs";
import CSSModel from "../css-model@0.0.0/index.mjs";

const CSSModelMouse = class extends CSSModel {
  constructor(target = globalThis.document) {
    super(target);
    this.set("mouse-up", "1");
    target.addEventListener("mousemove", ({ clientX, clientY }) => {
      const angle = Math.atan2(clientY, clientX) + Math.PI / 2;
      const magnitude = Math.sqrt(clientX ** 2 + clientY ** 2);
      const magnitudeNormalized = Math.sqrt(
        (clientX / globalThis.innerWidth) ** 2 +
          (clientY / globalThis.innerHeight) ** 2
      );
      this.set("mouse-x", clientX);
      this.set("mouse-y", clientY);
      this.set("mouse-x-str", wrapString(clientX));
      this.set("mouse-y-str", wrapString(clientY));
      this.set("mouse-ang", angle);
      this.set("mouse-ang-str", wrapString(angle));
      this.set("mouse-mag", magnitude);
      this.set("mouse-mag-str", wrapString(magnitude));
      this.set("mouse-magnorm", magnitudeNormalized);
      this.set("mouse-magnorm-str", wrapString(magnitudeNormalized));
    });

    target.addEventListener("mouseup", () => {
      this.set("mouse-up", "1");
      this.set("mouse-down", "");
    });

    target.addEventListener("mousedown", () => {
      this.set("mouse-up", "");
      this.set("mouse-down", "1");
    });
  }
};

export default CSSModelMouse;
