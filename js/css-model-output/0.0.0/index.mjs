import CSSModel from "../../css-model/0.0.0/index.mjs";
const PRE = "--input-";
const DANGEROULSY_SET_PREFIX = "DANGEROULSY_SET_";

const stripProp = (property, PRE = "") => {
  let prop = property;
  if (prop.startsWith(PRE)) {
    prop = prop.slice(PRE.length);
  }
  return prop;
};

const CSSModelOutputs = class extends CSSModel {
  #observer;
  constructor(
    target = null,
    prefix = "input",
    key = "data-custom-property-output",
    keyBind = "data-custom-property-bind"
  ) {
    super(target, prefix);
    this.#observer = new globalThis.MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const property of mutation.target.style) {
          this.track(stripProp(property, PRE), false);
        }
      }
      for (const property of this.tracked) {
        const prop = stripProp(property, PRE);
        const elements = [
          ...this.target.querySelectorAll(`[${key}="${prop}"]`),
          ...this.target.querySelectorAll(`[${keyBind}="${prop}"]`),
        ];

        for (const item of elements) {
          const { dataset, tagName } = item;
          let writeKey = "innerText";
          if (
            tagName === "INPUT" ||
            tagName === "TEXTAREA" ||
            tagName === "SELECT"
          ) {
            writeKey = "value";
          }
          if (dataset.customPropertyWriteKey) {
            writeKey = dataset.customPropertyWriteKey;
          }
          if (writeKey !== "innerHTML" && writeKey !== "outerHTML") {
            if (writeKey === `${DANGEROULSY_SET_PREFIX}innerHTML`) {
              writeKey = "innerHTML";
            }
            if (writeKey === `${DANGEROULSY_SET_PREFIX}outerHTML`) {
              writeKey = "outerHTML";
            }
            const current = item[writeKey];
            const value = this.get(prop);
            if (current !== value) {
              item[writeKey] = this.get(prop);
            }
          } else {
            console.warn(
              `use "${DANGEROULSY_SET_PREFIX}innerHTML" or "${DANGEROULSY_SET_PREFIX}outerHTML" to set html value.`
            );
          }
        }
      }

      this.target
        .querySelectorAll(`[custom-propetry=""]`)
        .forEach((element) => {});
    });
    this.#observer.observe(this.target, {
      attributes: true,
      attributeFilter: ["style"],
      attributeOldValue: true,
    });
  }
  detach() {
    super.detach();
    this.#observer.disconnect();
  }
};
export default CSSModelOutputs;
