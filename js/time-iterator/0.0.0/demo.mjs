import timeIterator from "./index.mjs";
const LIMIT = 12;

for await (const x of timeIterator(1, LIMIT, 1, () => 1)) {
  console.log(x);
}
console.log("---");
for await (const x of timeIterator(1, LIMIT, 1, (x) => x * 2)) {
  console.log(x);
}
console.log("---");
for await (const x of timeIterator(1, LIMIT, 1, (x) => 1 * 2 ** (x - 1))) {
  console.log(x);
}
