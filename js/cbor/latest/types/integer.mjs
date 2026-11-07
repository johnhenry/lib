import { intToBytes, bytesToInt } from "./convertInt.mjs";

import { INT, NIN, readFirstByte } from "./types.mjs";

const ONE = BigInt(1);

export const encodeInteger = (number) => {
  const type = number < 0 ? NIN : INT;
  if (type === NIN) {
    number = number * -ONE - ONE;
  }
  if (number < 24n) {
    return Uint8ClampedArray.from([type | Number(number)]);
  }
  const bytes = intToBytes(number);
  const { length } = bytes;
  let argument;
  switch (length) {
    case 1:
      argument = 24;
      break;
    case 2:
      argument = 25;
      break;
    case 4:
      argument = 26;
      break;
    case 8:
      argument = 27;
      break;
  }
  return Uint8ClampedArray.from([type | argument, ...bytes]);
};

export const decodeInteger = (bytes, offset = 0) => {
  const { type, argument } = readFirstByte(bytes[offset++]);
  let read = 0;
  switch (argument) {
    case 24:
      read = 1;
      break;
    case 25:
      read = 2;
      break;
    case 26:
      read = 8;
      break;
    case 27:
      read = 4;
      break;
  }
  const arr = [...bytes.slice(offset, offset + read)];
  offset += read;
  if (type === INT) {
    if (argument < 24) {
      return [BigInt(argument), offset];
    }
    return [bytesToInt(arr.map(BigInt)), offset];
  } else {
    if (argument < 24) {
      return [BigInt(argument) * -ONE + ONE, offset];
    }
    return [bytesToInt(arr.map(BigInt)) * -ONE + ONE, offset];
  }
};
