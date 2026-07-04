//https://keycode.info/
const target = globalThis.document;

const buildString = (
  preamble = "",
  { altKey, ctrlKey, metaKey, shiftKey, code }
) =>
  [
    preamble,
    altKey ? "alt-" : "",
    ctrlKey ? "ctrl-" : "",
    metaKey ? "meta-" : "",
    shiftKey ? "shift-" : "",
  ]
    .concat([code])
    .join("");

target.addEventListener("keyup", (event) => {
  target.documentElement.style.setProperty(
    buildString(`--key-pressed-`, event),
    ""
  );
});

target.addEventListener("keydown", (event) => {
  target.documentElement.style.setProperty(
    buildString(`--key-pressed-`, event),
    "1"
  );
});
