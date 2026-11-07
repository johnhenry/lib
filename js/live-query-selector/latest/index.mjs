import createMutableNodeList from "../../create-mutable-nodelist/0.0.0/index.mjs";

const liveQuerySelector = (
  selector,
  element = document.getRootNode(),
  useNodeList = false
) => {
  // Initialize results with current nodes.
  const init = element.querySelectorAll(selector);
  const result = useNodeList ? createMutableNodeList(...init) : [...init];
  // Create observer instance.
  const observer = new globalThis.MutationObserver(() => {
    while (result.length) {
      result.pop();
    }
    for (const node of element.querySelectorAll(selector)) {
      result.push(node);
    }
  });
  // Set up observer.
  observer.observe(element, { childList: true, subtree: true });
  return result;
};

export default liveQuerySelector;
