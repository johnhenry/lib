// https://codepen.io/bramus/pen/eBZgPB
// https://css-tricks.com/how-to-map-mouse-position-in-css/
// https://codersblock.com/blog/what-can-you-put-in-a-css-variable/
// https://developer.mozilla.org/en-US/docs/Web/CSS/env()
const target = globalThis.document;
import wrapString from "../wrap-number-string/0.0.0/index.mjs";
const init = () => {
  target.documentElement.style.setProperty("--mouse-up", "1");
};
globalThis.addEventListener("load", init);

target.addEventListener("mousemove", ({ clientX, clientY }) => {
  const angle = Math.atan2(clientY, clientX) + Math.PI / 2;
  const magnitude = Math.sqrt(clientX ** 2 + clientY ** 2);
  const magnitudeNormalized = Math.sqrt(
    (clientX / globalThis.innerWidth) ** 2 +
      (clientY / globalThis.innerHeight) ** 2
  );
  target.documentElement.style.setProperty("--mouse-x", clientX);
  target.documentElement.style.setProperty("--mouse-y", clientY);
  target.documentElement.style.setProperty(
    "--mouse-x-str",
    wrapString(clientX)
  );
  target.documentElement.style.setProperty(
    "--mouse-y-str",
    wrapString(clientY)
  );
  target.documentElement.style.setProperty("--mouse-ang", angle);
  target.documentElement.style.setProperty(
    "--mouse-ang-str",
    wrapString(angle)
  );
  target.documentElement.style.setProperty("--mouse-mag", magnitude);
  target.documentElement.style.setProperty(
    "--mouse-mag-str",
    wrapString(magnitude)
  );
  target.documentElement.style.setProperty(
    "--mouse-magnorm",
    magnitudeNormalized
  );
  target.documentElement.style.setProperty(
    "--mouse-magnorm-str",
    wrapString(magnitudeNormalized)
  );
});

target.addEventListener("mouseup", () => {
  target.documentElement.style.setProperty("--mouse-up", "1");
  target.documentElement.style.setProperty("--mouse-down", "");
});

target.addEventListener("mousedown", () => {
  target.documentElement.style.setProperty("--mouse-up", "");
  target.documentElement.style.setProperty("--mouse-down", "1");
});
