const { document } = globalThis;
export default (tagName = true) => {
  if (document.body.firstChild) {
    return document.body.firstChild;
  }
  if (tagName) {
    const element = document.createElement(
      typeof tagName === "string" ? tagName : "div"
    );
    document.prepend(element);
    return element;
  }
  throw new Error("element not available");
};
export const html = document.documentElement;
export const body = document.body;
export const head = document.head;
