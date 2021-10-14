import Link from "./index.mjs";
const c = new Link("c");
const b = new Link("b", c);
const a = new Link("a", b);
console.log(a.toString(), a.length);
console.log(b.toString(), b.length);
console.log(c.toString(), c.length);
c.at().tail = new Link("d");
console.log(c.toString(), c.length);
const z = new Link("z");
const y = new Link("y", z);
const x = new Link("x", y);
a.tail = y;
console.log(a.toString(), a.length);
a.tail = x;
console.log(a.toString(), a.length);
const r = new Link("r", new Link("s", new Link("t")));
console.log(r.toString(), r.length);
r.penultimate().tail = undefined;
console.log(r.toString(), r.length);
r.penultimate().tail = undefined;
console.log(r.toString(), r.length);
console.log(r.penultimate().tail, 0);

let link = new Link(1, new Link(2, new Link(3)));
while (link) {
  console.log(link.toString());
  link = link.tail;
}

let squares;
let num = 0;
while (num < 100) {
  squares = new Link(num ** 2, squares);
  num++;
}
console.log(squares.toString());
