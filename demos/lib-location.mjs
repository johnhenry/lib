export const LIB_LOCATION = globalThis.location.protocol.startsWith("https")
  ? "https://johnhenry.github.io/lib/"
  : `${globalThis.location.origin}/`;

export default LIB_LOCATION;
