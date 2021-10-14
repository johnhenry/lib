import { BYT, BYTE_ARGUMENT, BREAKCODE, readFirstByte } from "./types.mjs";

export const encodeBytes = (bytes) => {
  const argument = Math.min(bytes.length, BYTE_ARGUMENT);
  if (argument === BYTE_ARGUMENT) {
    bytes = [...bytes];
    bytes.push(BREAKCODE);
  }
  return Uint8ClampedArray.from([BYT | argument, ...bytes]);
};

export const decodeBytes = (bytes, offset = 0) => {
  const { argument } = readFirstByte(bytes[offset++]);
  if (argument !== BYTE_ARGUMENT) {
    const result = bytes.slice(offset, offset + argument);
    offset += argument;
    return [result, offset];
  }
  const out = [];
  while (bytes[offset] !== BREAKCODE) {
    out.push(bytes[offset++]);
  }
  return [Uint8ClampedArray.from(out), ++offset];
};
