import collapsePrototypes from "./index.mjs";
let y = Object.create({ z: 26 });
y = collapsePrototypes(y, { a: 1 }, { b: 2 }, Object.getPrototypeOf(y));
console.log(y, y.a, y.b, y.c, y.d, y.z);
