import zip, { repeat } from "./index.mjs";
// https://docs.ruby-lang.org/en/2.0.0/syntax/literals_rdoc.html
// https://gist.github.com/jakimowicz/df1e4afb6e226e25d678
// http://www.chrisrolle.com/blog/ruby-percentage-notations
const i = (a, ...b) => {
  return zip(a.raw, b)
    .flat()
    .join("")
    .split(" ")
    .map((s) => Symbol.for(s));
};
const w = (a, ...b) => {
  return zip(a.raw, b)
    .flat()
    .join("")
    .split(" ")
    .map((s) => String(s));
};
// console.log(i`a b c d e`);
// console.log(w`1 2 3 4 5`);

console.log(repeat("abc", [1, 2, 3]).flat());
