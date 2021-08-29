import { ARR, BYTE_ARGUMENT, BREAKCODE, readFirstByte } from "./types.mjs";
import { encode, decode_bytes } from "../index.mjs";

export const encodeArray = (array) => {
  const bytes = array
    .map(encode)
    .reduce((previous, current) => [...previous, ...current], []);
  const argument = Math.min(array.length, BYTE_ARGUMENT);
  if (argument === BYTE_ARGUMENT) {
    bytes.push(BREAKCODE);
  }
  return Uint8ClampedArray.from([ARR | argument, ...bytes]);
};

export const decodeArray = (bytes, offset = 0) => {
  const { argument } = readFirstByte(bytes[offset++]);
  const out = [];
  if (argument !== BYTE_ARGUMENT) {
    let index = 0;
    while (index < argument) {
      const [res, off] = decode_bytes(bytes, offset);
      out.push(res);
      offset = off;
      index++;
    }
    return [out, offset];
  }
  while (bytes[offset] !== BREAKCODE) {
    const [res, off] = decode_bytes(bytes, offset);
    out.push(res);
    offset = off;
  }
  return [out, ++offset];
};
