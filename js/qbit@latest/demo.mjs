import { QBit, Bit, Byte, H } from "./index.mjs";
// const byte = Byte(new QBit(), new QBit(), new QBit(), new QBit(), new QBit(), new QBit(), new QBit(), new QBit());
// console.log(Uint8ClampedArray.from([byte]));

const MAX = 1000;
let [A, B, C] = [0, 0, 0];
for (let i = 0; i < MAX; i++) {
  const a = new QBit(1, 0);
  const b = H(a);
  const c = H(b);
  A += a;
  B += b;
  C += c;
}
// console.log(`A:${(100*A/MAX)}%`);
// console.log(`B:${(100*B/MAX)}%`);
// console.log(`C:${(100*C/MAX)}%`);
