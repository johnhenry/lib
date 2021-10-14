// https://stackoverflow.com/a/17698713/1290781
import wrapString from "../wrap-number-string/0.0.0/index.mjs";

const target = globalThis.document;

const setScrollLimit = () => {
  const y = globalThis.scrollY;
  const x = globalThis.scrollX;
  const vertical =
    Math.max(
      target.body.scrollHeight,
      target.body.offsetHeight,
      target.documentElement.clientHeight,
      target.documentElement.scrollHeight,
      target.documentElement.offsetHeight
    ) - window.innerHeight;
  const horizontal =
    Math.max(
      target.body.scrollWidth,
      target.body.offsetWidth,
      target.documentElement.clientWidth,
      target.documentElement.scrollWidth,
      target.documentElement.offsetWidth
    ) - window.innerWidth;
  const vratio = y / vertical;
  const hratio = x / horizontal;

  target.documentElement.style.setProperty(
    "--window-scroll-vertical-max",
    vertical
  );
  target.documentElement.style.setProperty(
    "--window-scroll-horizontal-max",
    horizontal
  );
  target.documentElement.style.setProperty(
    "--window-scroll-vertical-max-str",
    wrapString(vertical)
  );
  target.documentElement.style.setProperty(
    "--window-scroll-horizontal-max-str",
    wrapString(horizontal)
  );

  target.documentElement.style.setProperty("--window-scroll-vertical", y);
  target.documentElement.style.setProperty("--window-scroll-horizontal", x);
  target.documentElement.style.setProperty(
    "--window-scroll-vertical-str",
    wrapString(y)
  );
  target.documentElement.style.setProperty(
    "--window-scroll-horizontal-str",
    wrapString(x)
  );

  target.documentElement.style.setProperty(
    "--window-scroll-vertical-ratio",
    vratio
  );
  target.documentElement.style.setProperty(
    "--window-scroll-horizontal-ratio",
    hratio
  );
  target.documentElement.style.setProperty(
    "--window-scroll-vertical-ratio-str",
    wrapString(vratio)
  );
  target.documentElement.style.setProperty(
    "--window-scroll-horizontal-ratio-str",
    wrapString(hratio)
  );
};

globalThis.addEventListener("load", setScrollLimit);
target.addEventListener("scroll", setScrollLimit);
globalThis.addEventListener("resize", setScrollLimit);
