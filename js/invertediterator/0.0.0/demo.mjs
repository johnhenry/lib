import InvertedGenerator from "./index.mjs";

const ig = InvertedGenerator();
let i = 0;
setInterval(() => ig.resolve(i++), 1000);
for await (const output of ig.iterator) {
  console.log(`Here's ${output}!`);
}
