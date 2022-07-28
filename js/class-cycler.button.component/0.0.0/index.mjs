import classCycler from "../../localstorage-class-cycler/0.0.0/index.mjs";

const DEFAULT_SELECTOR = "html";
export default class extends globalThis.HTMLButtonElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.updateBound = this.update.bind(this);
    this.addEventListener("click", this.updateBound);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.updateBound);
  }
  update() {
    const selectors = [];
    if (this.getAttribute("select")) {
      selectors.push(document.querySelector(this.getAttribute("select")));
    } else if (this.getAttribute("select-all")) {
      selectors.push(
        ...document.querySelectorAll(this.getAttribute("select-all"))
      );
    }
    if (
      !selectors.length &&
      this.getAttribute("selector") !== "" &&
      this.getAttribute("select") !== ""
    ) {
      selectors.push(document.querySelector(DEFAULT_SELECTOR));
    }
    const storageKey = this.getAttribute("storage-key");
    const classes = (this.getAttribute("classes") || "").split(",");
    classCycler(selectors, storageKey, ...classes)();
  }
  static get observedAttributes() {
    return ["select", "storage-key", "select-all", "classes"];
  }
}
