const target = globalThis.document;
import wrapString from "../wrap-number-string@0.0.0/index.mjs";
const setWindowSize = () => {
  target.documentElement.style.setProperty(
    "--window-width",
    globalThis.innerWidth
  );
  target.documentElement.style.setProperty(
    "--window-height",
    globalThis.innerHeight
  );
  target.documentElement.style.setProperty(
    "--window-width-str",
    wrapString(globalThis.innerWidth)
  );
  target.documentElement.style.setProperty(
    "--window-height-str",
    wrapString(globalThis.innerHeight)
  );
};
globalThis.addEventListener("load", setWindowSize);
globalThis.addEventListener("resize", setWindowSize);
