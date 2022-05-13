const createElement = (tag = "", props = {}, ...children) => {
  if (props === null) {
    props = {};
  }
  if (tag instanceof Node) {
    children.unshift(props);
    props = {};
    children.unshift(tag);
    tag = "";
  } else if (typeof props === "string" || props instanceof Node) {
    children.unshift(props);
    props = {};
  }
  const element = tag
    ? globalThis.document.createElement(tag)
    : new DocumentFragment();

  for (const [key, value] of Object.entries(props)) {
    switch (key) {
      case "children":
        if (Array.isArray(value)) {
          children = [...value, ...children];
        } else {
          children.unshift(value);
        }
        continue;
      case "class":
        if (Array.isArray(value)) {
          element.classList.add(...value);
        } else {
          element.setAttribute(key, value);
        }
        break;
      default:
        element.setAttribute(key, value);
    }
  }
  for (const child of children) {
    if (typeof child === "string") {
      element.append(globalThis.document.createTextNode(child));
    } else {
      element.append(child);
    }
  }
  return element;
};
export default createElement;
export { default as fromString } from "../../text-to-DOM-nodes/0.0.0/index.mjs";
export * from "./tags.mjs";
export const _ = (...c) => createElement(...c);
