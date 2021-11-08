import toHex from "./to-hex.mjs";
import toBigInt from "./to-bigint.mjs";

export default (N = 0, format = "raw", prefix) => {
  const bytes =
    typeof N === "number"
      ? globalThis.crypto.getRandomValues(new Uint8ClampedArray(N))
      : N;

  switch (format.toLowerCase()) {
    case "color":
      return `#${toBigInt(bytes, "padded")
        .join("")
        .padStart(bytes.length * 2, "0")}`;
    case "color24":
      return `#${toBigInt(bytes, "padded").slice(0, 3).join("")}`;
    case "color32":
      return `#${toBigInt(bytes, "padded").slice(0, 4).join("")}`;
    case "hex":
      return toHex(bytes);
    case "bigint":
      return toBigInt(bytes);
    case "raw":
    default:
      return bytes;
  }
};

// export default (N) =>
//   globalThis.crypto.getRandomValues(new Uint8ClampedArray(N));
