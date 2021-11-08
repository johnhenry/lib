//https://coolaj86.com/articles/convert-js-bigints-to-typedarrays/

export default (buf, format = "bigint") => {
  const strs = [];
  const bytes = Uint8Array.from(buf);
  for (const byte of bytes) {
    strs.push(byte.toString(16));
  }
  switch (format.toLowerCase()) {
    case "raw":
      return strs;
    case "padded":
      return strs.map((s) => s.padStart(2, "0"));
    case "bigint":
      return BigInt(`0x${strs.map((s) => s.padStart(2, "0")).join("")}`);
  }
};
