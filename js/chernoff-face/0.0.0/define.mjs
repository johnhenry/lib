import DefineComponent from "./component.mjs";
export default (name) =>
  globalThis.customElements.define(name, DefineComponent);
