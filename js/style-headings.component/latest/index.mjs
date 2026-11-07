export default class extends globalThis.HTMLElement {
  #style = null;

  setStyle() {
    const preselector = this.getAttribute("preselector") ?? "h";
    if (!this.#style || !preselector) {
      return;
    }
    const hs = [];
    const selector = this.getAttribute("selector") || "";
    const common = this.getAttribute("common");
    const start = Number(this.getAttribute("start")) || 1;
    const attribute = this.getAttribute("attribute") || "font-size";
    const unit = this.getAttribute("unit") || "";
    const limit = Number(this.getAttribute("limit")) || 6;
    const min = Number(this.getAttribute("min")) || 1;
    const max = Number(this.getAttribute("max")) - min;
    for (let i = start; i <= limit; i++) {
      hs.push(
        `${preselector}${i}${selector} {
  ${attribute}: ${max / i + min}${unit};${common ? "\n" + common : ""}
}`
      );
    }
    this.#style.innerHTML = hs.join("\n");
  }
  connectedCallback() {
    this.style.display = "none";
    this.#style = globalThis.document.createElement("style");
    this.appendChild(this.#style);
    this.setStyle();
  }
  static get observedAttributes() {
    return [
      "attribute",
      "unit",
      "limit",
      "min",
      "max",
      "spread",
      "selector",
      "start",
      "common",
    ];
  }
  attributeChangedCallback() {
    this.setStyle();
  }
}
