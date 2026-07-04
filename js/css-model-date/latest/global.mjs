import Model from "./index.mjs";
const interval = 1000;
new Model(globalThis.document.documentElement, { interval });
new Model(globalThis.document.documentElement, { interval, utc: true });
