import CSSModel from "../../css-model/0.0.0/index.mjs";
const CSSModelClickCycle = class extends CSSModel {
  constructor(target = null, prefix = "input", key = "customProperty") {
    super(target, prefix);
    this.target.addEventListener("click", ({ target }) => {
      const { dataset } = target;
      const prop = dataset[key];
      if (!prop) {
        return;
      }
      const values = (dataset["values"] || "").split(";");
      const current = this.get(prop);
      const index = values.indexOf(current);
      const next = values[(index + 1) % values.length];
      this.set(prop, next);
    });
  }
};
export default CSSModelClickCycle;
