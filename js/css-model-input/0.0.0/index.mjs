import CSSModel from "../../css-model/0.0.0/index.mjs";
const CSSModelInput = class extends CSSModel {
  constructor(target = null, prefix = "input", key = "customProperty") {
    super(target, prefix);
    this.target.addEventListener("input", ({ target }) => {
      const { dataset } = target;
      const prop = dataset[key];
      if (!prop) {
        return;
      }
      if (target.type === "checkbox") {
        if (target.indeterminate) {
          this.set(prop, 0);
        } else {
          this.set(prop, target.checked ? 1 : "");
        }
      } else {
        this.set(prop, target.value);
      }
    });
  }
};
export default CSSModelInput;
