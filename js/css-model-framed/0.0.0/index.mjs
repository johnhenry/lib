import CSSModel from "../../css-model/0.0.0/index.mjs";
const TOP = globalThis.self === globalThis.top;
const CSSModelFramed = class extends CSSModel {
  constructor(target = globalThis.document, prefix = "framed") {
    super(target, prefix);
    this.set("top", TOP ? 1 : 0);
    this.set("iframe", TOP ? 0 : 1);
  }
};

export default CSSModelFramed;
