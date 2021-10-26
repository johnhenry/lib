export default (size = 8) =>
  (...bits) => {
    let word = 0;
    let count = 0;
    while (bits.length < size) {
      bits.unshift(0);
    }
    if (bits.length > size) {
      throw new Error(
        `Expected input length of: ${size}. Got : ${bits.length}`
      );
    }
    while (count < size) {
      if (bits[count] !== 0 && bits[count] !== 1) {
        throw new Error(
          `Expected: 0 or 1. Got:  ${bits[count]} at ${count} in [${bits}]`
        );
      }
      word |= (bits[count] || 0) << (size - count - 1);
      count++;
    }
    return word;
  };
