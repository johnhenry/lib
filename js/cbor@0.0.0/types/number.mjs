import { SIM } from "./types.mjs";
import { encode, decode64 } from "./ieee754@0.0.0/index.mjs";
export const encodeNumber = (number) => {
  return Uint8ClampedArray.from([SIM | 27, ...encode(number)]);
};

export const decodeNumber = (bytes, offset = 0) => {
  return [decode64(bytes, offset), offset + 8];
};
