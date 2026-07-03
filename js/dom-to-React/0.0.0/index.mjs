const $$typeof = Symbol.for("react.element");
const REACT_FRAGMENT_SYMBOL = Symbol.for("react.fragment");
const domToReact = (dom) => {
  if (dom instanceof DocumentFragment) {
    for (const child of dom.childNodes) {
      children.push(domToReact(child));
    }
    return {
      $$typeof,
      type: REACT_FRAGMENT_SYMBOL,
      key: null,
      ref: null,
      props: {
        children,
      },
      _owner: null,
      _store: {},
    };
  } else if (dom.nodeType === Node.ELEMENT_NODE) {
    const element = dom.tagName.toLowerCase();
    const props = {};
    const children = [];
    for (const [key, value] of Object.entries(dom.attributes)) {
      switch (key) {
        case "class":
          if (Array.isArray(value)) {
            props.className = value.join(" ");
          } else {
            props.className = value;
          }
          break;
        default:
          props[key] = value;
      }
    }
    for (const child of dom.childNodes) {
      children.push(domToReact(child));
    }
    return {
      $$typeof,
      type: element,
      key: null,
      ref: null,
      props: {
        ...props,
        children,
      },
      _owner: null,
      _store: {},
    };
  } else if (dom.nodeType === Node.TEXT_NODE) {
    return dom.nodeValue;
  }
};
export default domToReact;
