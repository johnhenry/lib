const getBinaryWhole = (val, divisor = 2) => {
  const remainders = [];
  while (val > 0) {
    remainders.unshift(val % divisor);
    val = Math.floor(val / divisor);
  }
  return remainders;
};

const splitDecimal = (num, getBinary = false) => {
  const whole = Math.floor(num);
  if (getBinary) {
    return [getBinaryWhole(whole), getBinaryDecimal(num - whole)];
  } else {
    return [whole, num - whole];
  }
};

const getBinaryDecimal = (val, multiplyer = 2) => {
  const leaders = [];
  let [num, fraction] = splitDecimal(val);
  do {
    val = fraction * multiplyer;
    [num, fraction] = splitDecimal(val);
    leaders.push(Math.floor(num));
  } while (fraction !== 0);
  return leaders;
};

// Converts a series of bits into bytes
const compressBits = (...bits) => {
  const bytes = [];
  let shift = 7;
  let index = 0;
  for (const bit of bits) {
    bytes[index] = bytes[index] ?? 0;
    bytes[index] |= bit << shift;
    shift--;
    if (shift === -1) {
      shift = 7;
      index++;
    }
  }
  return bytes;
};

export const encode = (
  number,
  { bias = 1023, exSize = 11, size = 64 } = { bias: 1023, exSize: 11, size: 64 }
) => {
  const sign = Number(number < 0);
  const bits = new Array(size).fill(0);
  if (sign) {
    number *= -1;
  }
  let exponent;
  let together;
  // Handle infinity
  if (Math.abs(number) === Infinity) {
    exponent = [];
    while (exponent.length < exSize) {
      exponent.unshift(1);
    }
    together = [];
  } else if (number !== 0) {
    const [whole, fraction] = splitDecimal(number, true);
    together = [...whole, ...fraction].slice(1);
    let e;
    if (!whole.length) {
      // cauculate using fraction part
      e = bias - 1 - fraction.indexOf(1);
    } else {
      // cauculate using whole part
      e = whole.length - 1 + bias;
    }
    exponent = getBinaryWhole(e);
  } else {
    exponent = [];
    together = [];
  }
  while (exponent.length < exSize) {
    exponent.unshift(0);
  }
  const insert = [sign, ...exponent, ...together];
  bits.splice(0, insert.length, ...insert);
  return Uint8ClampedArray.from([...compressBits(...bits)]);
};

const reduceBits = (bitOffset, byteArrays, reducer, initial) => {
  const size = 8 * (byteArrays.length - 1) + (8 - bitOffset);
  while (bitOffset < size) {
    const currentByte = byteArrays[Math.floor(bitOffset / 8)];
    const shift = 8 - (bitOffset % 8) - 1;
    const currentBit = (currentByte >> shift) & 0b00000001;
    initial = reducer(initial, currentBit, bitOffset++);
  }
  return initial;
};

export const decode64 = (bytes, offset = 0) => {
  const first = bytes[offset++];
  const second = bytes[offset++];
  const third = bytes[offset++];
  const fourth = bytes[offset++];
  const fifth = bytes[offset++];
  const sixth = bytes[offset++];
  const seventh = bytes[offset++];
  const eighth = bytes[offset++];
  const sign = first & 0b10000000 ? -1 : 1;
  let ex_ = first & 0b01111111;
  ex_ = ex_ << 4;
  let _ponent = second & 0b11110000;
  _ponent = _ponent >> 4;
  let exponent = (ex_ | _ponent) - 1023;
  if (exponent === -1023) {
    if (
      !second &&
      !third &&
      !fourth &&
      !fifth &&
      !sixth &&
      !seventh &&
      !eighth
    ) {
      return 0;
    }
  }
  const num = reduceBits(
    4,
    [second, third, fourth, fifth, sixth, seventh, eighth],
    (previous, current, index) => {
      exponent--;
      return current ? previous + current * 2 ** exponent : previous;
    },
    2 ** exponent
  );
  return sign * num;
};
