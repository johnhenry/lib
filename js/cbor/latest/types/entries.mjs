import { MAP, BYTE_ARGUMENT, BREAKCODE, readFirstByte } from "./types.mjs";
import { encode, decode_bytes } from "../index.mjs";

export const encodeEntries = (entries) => {
  const bytes = entries
    .map(([key, value]) => [...encode(key), ...encode(value)])
    .reduce((previous, current) => [...previous, ...current], []);
  const argument = Math.min(entries.length * 2, BYTE_ARGUMENT);
  if (argument === BYTE_ARGUMENT) {
    bytes.push(BREAKCODE);
  }
  return Uint8ClampedArray.from([MAP | argument, ...bytes]);
};

export const decodeEntries = (bytes, offset = 0) => {
  const { argument } = readFirstByte(bytes[offset++]);
  const out = [];
  let allKeysString = true;
  if (argument !== BYTE_ARGUMENT) {
    let index = 0;
    while (index < argument) {
      let key, value, off;
      [key, off] = decode_bytes(bytes, offset);
      allKeysString = allKeysString && typeof key === "string";
      offset = off;
      [value, off] = decode_bytes(bytes, offset);
      out.push([key, value]);
      offset = off;
      index += 2;
    }
    if (allKeysString) {
      return [Object.fromEntries(out), offset];
    }
    return [new Map(out), offset];
  }
  while (bytes[offset] !== BREAKCODE) {
    let key, value, off;
    [key, off] = decode_bytes(bytes, offset);
    allKeysString = allKeysString && typeof key === "string";
    offset = off;
    [value, off] = decode_bytes(bytes, offset);
    out.push([key, value]);
    offset = off;
  }
  offset += 1; // skip BREAKCODE
  if (allKeysString) {
    return [Object.fromEntries(out), offset];
  }
  return [new Map(out), offset];
};
