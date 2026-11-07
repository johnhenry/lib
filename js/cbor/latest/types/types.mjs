// const BIT0 = 2 << 6; // 2**7 === 0b10000000 === 128
// const BIT1 = 2 << 5; // 2**6 === 0b01000000 === 64
// const BIT2 = 2 << 4; // 2**5 === 0b00100000 === 32
// const BIT3 = 2 << 3; // 2**4 === 0b00010000 === 16
// const BIT4 = 2 << 2; // 2**3 === 0b00001000 === 8
// const BIT5 = 2 << 1; // 2**2 === 0b00000100 === 4
// const BIT6 = 2 << 0; // 2**1 === 0b00000010 === 2
// const BIT7 = 2 >> 1; // 2**0 === 0b00000001 === 1

export const INT = 0 << 5; // 0000 + 0000 + 0000 === 0b00000000 === 0
export const NIN = 1 << 5; // 0000 + 0000 + 2**5 === 0b00100000 === 32
export const BYT = 2 << 5; // 0000 + 2**6 + 0000 === 0b01000000 === 64
export const STR = 3 << 5; // 0000 + 2**6 + 2**5 === 0b01100000 === 96
export const ARR = 4 << 5; // 2**7 + 0000 + 0000 === 0b10000000 === 128
export const MAP = 5 << 5; // 2**7 + 0000 + 2**5 === 0b10100000 === 160
export const TAG = 6 << 5; // 2**7 + 2**6 + 0000 === 0b11000000 === 192
export const SIM = 7 << 5; // 2**7 + 2**6 + 2**5 === 0b11100000 === 224
export const BYTE_ARGUMENT = 0b00011111; // 31
export const BREAKCODE = 0b11111111; // 255
export const readFirstByte = (byte) => ({
  type: byte & SIM,
  argument: byte & BYTE_ARGUMENT,
});
export const getTypeString = (type) => {
  switch (type) {
    case INT:
      return "INT";
    case NIN:
      return "NIN";
    case BYT:
      return "BYT";
    case STR:
      return "STR";
    case ARR:
      return "ARR";
    case TAG:
      return "TAG";
    case MAP:
      return "MAP";
    case SIM:
      return "SIM";
  }
  return type;
};
