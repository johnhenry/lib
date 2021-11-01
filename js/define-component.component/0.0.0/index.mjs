import defineTag from "../../definetag/0.0.0/index.mjs";

const define = async (src, name, imp) => {
  const { href } = globalThis.location;
  const indexQM = href.lastIndexOf("?");
  const withoutQuery = indexQM === -1 ? href : href.substring(0, indexQM);
  const indexS = withoutQuery.lastIndexOf("/");
  const dirname =
    indexS === -1 ? withoutQuery : withoutQuery.substring(0, indexS);
  const url = new URL(src, dirname + "/");
  const module = await import(url.href);
  const E = module[imp ?? "default"];
  return defineTag(E)(name);
};

export default class extends globalThis.HTMLElement {
  #name = "";
  #src = "";
  #import = null;
  constructor() {
    super();
  }
  connectedCallback() {
    this.#name = this.getAttribute("name");
    this.#src = this.getAttribute("src");
    this.#import = this.getAttribute("import");
    define(this.#src, this.#name, this.#import);
  }
  static get observedAttributes() {
    return ["name", "src", "import"];
  }
  attributeChangedCallback(name, old, current) {
    switch (name) {
      case "name":
        this.#name = current;
        break;
      case "src":
        this.#src = current;
        break;
      case "import":
        this.#import = current;
        break;
    }
    if (this.#src && this.#name) {
      // define(this.#src, this.#name, this.#import);
    }
  }
}
