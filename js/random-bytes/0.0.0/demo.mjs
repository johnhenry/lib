import randomBytes from "./index.mjs";

const x = randomBytes(8);
const y = randomBytes(x, "BigInt").toString(16);
const z = randomBytes(x, "hex");
console.log({ x, y, z });

const a = randomBytes(8, "hex");
const b = randomBytes(3, "color");
const c = randomBytes(3, "color+alpha");
console.log({ a, b, c });
console.log(randomBytes(1, "color")); //
console.log(randomBytes(2, "color")); //
console.log(randomBytes(3, "color")); //
console.log(randomBytes(3, "color24")); //
console.log(randomBytes(4, "color32")); //
