import w3CodeColor from "./w3-code-color.mjs";
// const update = (element) => {
//   const handler = () => {
//     w3CodeColor(element);
//     element.addEventListener("DOMSubtreeModified", handler, { once: true });
//   };
//   element.addEventListener("DOMSubtreeModified", handler, { once: true });
// };
// export default class extends HTMLElement {
//   constructor() {
//     super();
//   }
//   connectedCallback() {
//     update(this);
//   }
// }
export default class extends HTMLElement {
  #observer;
  constructor() {
    super();
    this.#observer = new MutationObserver(this.observe.bind(this));
  }
  observe() {
    this.#observer.disconnect();
    try {
      w3CodeColor(this);
    } finally {
      this.ready();
    }
  }
  connectedCallback() {
    this.ready();
  }
  ready() {
    this.#observer.observe(this, { childList: true });
  }
}
