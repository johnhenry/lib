import { STR, BYTE_ARGUMENT, BREAKCODE, readFirstByte } from "./types.mjs";
import { intToBytes as intToBytesFloat } from "./convertFloat.mjs";

export const encodeString = (string) => {
  const bytes = [...string]
    .map((point) => [...intToBytesFloat(point.codePointAt())])
    .flat();
  const argument = Math.min(bytes.length, BYTE_ARGUMENT);
  if (argument === BYTE_ARGUMENT) {
    bytes.push(BREAKCODE);
  }
  return Uint8ClampedArray.from([STR | argument, ...bytes]);
};

export const decodeString = (bytes, offset = 0) => {
  const { argument } = readFirstByte(bytes[offset++]);
  if (argument !== BYTE_ARGUMENT) {
    const result = String.fromCodePoint(
      ...bytes.slice(offset, offset + argument)
    );
    offset += argument;
    return [result, offset];
  }
  const out = [];
  while (bytes[offset] !== BREAKCODE) {
    out.push(bytes[offset++]);
  }
  offset++;
  return [String.fromCodePoint(...out), offset];
};
