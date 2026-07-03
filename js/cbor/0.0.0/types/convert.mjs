// https://stackoverflow.com/questions/8482309/converting-javascript-integer-to-byte-array-and-back

// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-13.php

// https://en.wikipedia.org/wiki/IEEE_754

// https://indepth.dev/the-simple-math-behind-decimal-binary-conversion-algorithms/#:~:text=Converting%20decimal%20fraction%20to%20binary,fractional%20part%20equal%20to%20zero.

// https://www.wikihow.com/Convert-a-Number-from-Decimal-to-IEEE-754-Floating-Point-Representation

const powerOfTwo = (n) => n && (n & (n - 1)) === 0;

export const intToBytesProto = ({
  TWO_FIFTY_FIVE = 255,
  TWO_FIFTY_SIX = 256,
  ONE = 1,
  ZERO = 0,
} = {}) =>
  function (/*float*/ float, slice = true, bytes = new Uint8ClampedArray(8)) {
    // we want to represent the input as a 8-bytes array
    let sliceIndex = bytes.length - 1;
    for (let index = bytes.length - 1; index >= 0; index--) {
      const byte = float & TWO_FIFTY_FIVE;
      bytes[index] = Number(byte);
      float = (float - byte) / TWO_FIFTY_SIX;
      sliceIndex = byte ? index : sliceIndex;
    }
    if (!slice) {
      return bytes;
    }
    while (!powerOfTwo(bytes.length - sliceIndex)) {
      sliceIndex--;
    }
    return bytes.slice(sliceIndex);
  };

export const bytesToIntProto = ({ TWO_FIFTY_SIX = 256, ZERO = 0 } = {}) =>
  function (bytes, value = ZERO) {
    for (let index = 0; index < bytes.length; index++) {
      value = value * TWO_FIFTY_SIX + bytes[index];
    }
    return value;
  };
