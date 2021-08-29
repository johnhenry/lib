import { intToBytesProto, bytesToIntProto } from "./convert.mjs";
const TWO_FIFTY_FIVE = BigInt(255);
const TWO_FIFTY_SIX = BigInt(256);
const ONE = BigInt(255);
const ZERO = BigInt(0);

export const intToBytes = intToBytesProto({
  ONE,
  ZERO,
  TWO_FIFTY_FIVE,
  TWO_FIFTY_SIX,
});

export const bytesToInt = bytesToIntProto({ TWO_FIFTY_SIX, ZERO });
