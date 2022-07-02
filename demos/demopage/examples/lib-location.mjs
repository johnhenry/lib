export const LIB_LOCATION =
  globalThis.location.protocol === "http"
    ? `${globalThis.location.origin}/`
    : "https://johnhenry.github.io/lib/";

export default LIB_LOCATION;
