import { SIM, readFirstByte } from "./types.mjs";
import { encodeNumber, decodeNumber } from "./number.mjs";

export const encodeSimple = (value) => {
  if (value === false) {
    return Uint8ClampedArray.from([SIM | 20]);
  }
  if (value === true) {
    return Uint8ClampedArray.from([SIM | 21]);
  }
  if (value === null) {
    return Uint8ClampedArray.from([SIM | 22]);
  }
  if (value === undefined) {
    return Uint8ClampedArray.from([SIM | 23]);
  }
  return encodeNumber(value);
};

export const decodeSimple = (bytes, offset) => {
  const { argument } = readFirstByte(bytes[offset]);
  switch (argument) {
    case 20:
      return [false, ++offset];
    case 21:
      return [true, ++offset];
    case 22:
      return [null, ++offset];
    case 23:
      return [undefined, ++offset];
  }
  return decodeNumber(bytes, ++offset);
};
