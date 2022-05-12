import createElement, { _ } from "../../create-element/0.0.0/index.mjs";
const REACT_FRAGMENT_SYMBOL = Symbol.for("react.fragment");
const reactToDom = ({ $$typeof = REACT_FRAGMENT_SYMBOL, props = {} }) => {
  if ($$typeof === REACT_FRAGMENT_SYMBOL) {
    const { children } = props;
    return _(...children.map(reactToDom));
  }
  const children =
    "children" in props
      ? Array.isArray(props.children)
        ? props.children
        : [props.children]
      : [];
  return createElement(react.type, { ...react.props, children });
};
export default reactToDom;
