let timeout = 0;
const timeouts = new Set();
import { WAIT, LIMIT, MODE, BASE } from "./default-options.mjs";
export default (func, options, ...args) => {
  let [wait, limit, mode, base] = [WAIT, LIMIT, MODE, BASE];
  if (typeof options === "number") {
    wait = options;
  } else if (Array.isArray(options)) {
    wait = options[0] ?? wait;
    limit = options[1] ?? limit;
    mode = options[2] ?? mode;
    base = options[3] ?? base;
  } else if (options && typeof options === "object") {
    wait = options.wait ?? wait;
    limit = options.limit ?? limit;
    mode = options.mode ?? mode;
    base = options.base ?? base;
  }
  let iteration = 0;
  const localTimeout = timeout++;
  timeouts.add(localTimeout);
  const go = () => {
    try {
      func(...args);
    } catch (error) {
      if (++iteration >= limit) {
        throw new Error(`Iteration limit of ${limit} exceeded. ${error}`);
      }
      let time;
      switch (mode) {
        case "linear":
          time = wait * ++iteration;
          break;
        case "exponential":
          time = wait * base ** iteration++;
          break;
        case "constant":
        default:
          iteration++;
          time = wait;
          break;
      }
      setTimeout(async () => {
        if (timeouts.has(localTimeout)) {
          await go();
        }
      }, time);
    }
  };
  setTimeout(go);
  return localTimeout;
};

export const clear = timeouts.delete.bind(timeouts);
