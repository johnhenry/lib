import { readFileSync } from "fs";
import binaryConvert from "../../binary-convert/0.0.0/index.mjs";
const bufferToArrayBuffer = binaryConvert("buffer", "Arraybuffer");
import { encode, decode } from "./index.mjs";
const out = readFileSync("./out.wbn");
console.log(decode(bufferToArrayBuffer(out)));
console.log(decode(encode(decode(bufferToArrayBuffer(out)))));
