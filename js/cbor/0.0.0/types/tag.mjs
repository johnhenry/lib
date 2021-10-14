import { TAG, readFirstByte } from "./types.mjs";
import { encode, decode_bytes } from "../index.mjs";

export const Tag = class {
  constructor(tag, value) {
    this._tag = tag;
    this._value = value;
  }
  get tag() {
    return this._tag;
  }
  get value() {
    return this._value;
  }
  toString() {
    return `TAGGED:${this._tag}:${this.value}`;
  }
};

export const encodeTag = ({ tag, value }) => {
  return Uint8ClampedArray.from([TAG | tag, ...encode(value)]);
};
export const decodeTag = (bytes, offset = 0) => {
  let value;
  const { argument } = readFirstByte(bytes[offset++]);
  [value, offset] = decode_bytes(bytes, offset);
  return [new Tag(argument, value), offset];
};
