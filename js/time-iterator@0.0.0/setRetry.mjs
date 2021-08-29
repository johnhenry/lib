let timeout = 0;
const timeouts = new Set();
import timeIterator from "./index.mjs";
const DEFAULT_TRANSFORM = ($) => $;
const DEFAULT_LIMIT = Infinity;
const DEFAULT_RETURN_ASYNC = false;
export const clear = timeouts.delete.bind(timeouts);
export default (func, options, ...args) => {
  let [limit, transform, returnAsync] = [
    DEFAULT_LIMIT,
    DEFAULT_TRANSFORM,
    DEFAULT_RETURN_ASYNC,
  ];
  if (typeof options === "number") {
    limit = options;
  } else if (typeof options === "function") {
    transform = options;
  } else if (typeof options === "boolean") {
    returnAsync = options;
  } else if (Array.isArray(options)) {
    limit = options[0] ?? limit;
    transform = options[1] ?? transform;
    returnAsync = options[2] ?? returnAsync;
  } else if (options && typeof options === "object") {
    limit = options.limit ?? limit;
    transform = options.transform || transform;
    returnAsync = options.async ?? returnAsync;
  }
  let localTimeout;
  const go = async () => {
    let lastError;
    for await (const x of timeIterator(1, limit, undefined, transform)) {
      if (!returnAsync && !timeouts.has(localTimeout)) {
        return;
      }
      try {
        const result = await func(...args);
        clear(localTimeout);
        return result;
      } catch (error) {
        lastError = error;
        if (!returnAsync && !timeouts.has(localTimeout)) {
          return;
        }
      }
    }
    throw new Error(
      `Iteration limit of ${limit} exceeded. Last Error: ${lastError}`
    );
  };
  if (returnAsync) {
    return go();
  }
  localTimeout = timeout++;
  timeouts.add(localTimeout);
  go();
  return localTimeout;
};
