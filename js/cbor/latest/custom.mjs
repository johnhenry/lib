import {
  INT,
  NIN,
  BYT,
  STR,
  ARR,
  MAP,
  TAG,
  SIM,
  readFirstByte,
} from "./types/types.mjs";
import { encodeInteger, decodeInteger } from "./types/integer.mjs";
import { encodeString, decodeString } from "./types/string.mjs";
import { encodeArray, decodeArray } from "./types/array.mjs";
import { encodeTag, decodeTag, Tag } from "./types/tag.mjs";
export { Tag };
import { encodeBytes, decodeBytes } from "./types/bytes.mjs";
import { encodeEntries, decodeEntries } from "./types/entries.mjs";
import { encodeSimple, decodeSimple } from "./types/simple.mjs";

export const encode = (item) => {
  // 0 & 1
  if (typeof item === "bigint") {
    return encodeInteger(item);
  }
  // 2
  if (item instanceof Uint8ClampedArray) {
    return encodeBytes(item);
  }
  // 3
  if (typeof item === "string") {
    return encodeString(item);
  }
  // 4
  if (Array.isArray(item)) {
    return encodeArray(item);
  }
  // 5
  if (item instanceof Map) {
    return encodeEntries([...item.entries()]);
  }
  // 5
  if (!(item instanceof Tag) && item && typeof item === "object") {
    return encodeEntries(Object.entries(item));
  }
  // 6
  if (item instanceof Tag) {
    return encodeTag(item);
  }
  // 7
  return encodeSimple(item);
};

export const decode_bytes = (bytes, offset = 0) => {
  const { type } = readFirstByte(bytes[offset]);
  switch (type) {
    case INT:
    case NIN:
      return decodeInteger(bytes, offset);
    case BYT:
      return decodeBytes(bytes, offset);
    case STR:
      return decodeString(bytes, offset);
    case ARR:
      return decodeArray(bytes, offset);
    case MAP:
      return decodeEntries(bytes, offset);
    case TAG:
      return decodeTag(bytes, offset);
    case SIM:
      return decodeSimple(bytes, offset);
  }
};
export const decode = (bytes) => decode_bytes(bytes)[0];
