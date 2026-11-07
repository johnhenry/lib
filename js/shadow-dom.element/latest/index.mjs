export default class extends globalThis.HTMLElement {
  constructor() {
    super();
    this.slotted = globalThis.document.createElement("slot");
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(this.slotted);
  }
}
