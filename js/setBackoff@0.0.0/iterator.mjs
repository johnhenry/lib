import { WAIT, LIMIT, MODE, BASE } from "./default-options.mjs";

export default async function* (options) {
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
  while (true) {
    if (iteration >= limit) {
      throw new Error(`iteration limit: ${limit}`);
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
    await new Promise((resolve) => setTimeout(resolve, time));
    yield time;
  }
}
