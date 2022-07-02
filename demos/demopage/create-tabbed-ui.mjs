const tabTree = (element, last) => {
  const panels = Array.prototype.filter.call(
    element.childNodes,
    (x) => x.nodeType === 1
  );
  const tabBar = last ? panels.pop() : panels.shift();
  const tabs = Array.prototype.filter.call(
    tabBar.childNodes,
    (x) => x.nodeType === 1
  );

  return { tabs, panels, tabBar };
};
const createTabbedUI = (element, { last = false } = { last: false }) => {
  const update = ({ target }) => {
    const { tabs, panels, tabBar } = tabTree(element, last);
    let i = 0;
    if (target === tabBar || !tabBar.contains(target)) {
      return;
    }
    for (const tab of tabs) {
      const panel = panels[i];
      if (tab.contains(target)) {
        tab.setAttribute("selected", "");
        panel.setAttribute("selected", "");
        panel.style.display =
          panel.dataset.display ?? element.dataset.display ?? "block";
      } else {
        tab.removeAttribute("selected");
        panel.removeAttribute("selected");
        panel.style.display = "none";
      }
      i++;
    }
  };
  element.addEventListener("click", update);
  const { tabs } = tabTree(element, last);
  const target = tabs[element.dataset.defaultIndex] || tabs[0];
  update({ target });
  return element;
};
export default createTabbedUI;
