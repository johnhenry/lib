import { WAIT, LIMIT, MODE, BASE } from "./default-options.mjs";

import asyncReturn from "./async-return.mjs";
export default (action, wait = WAIT, limit = LIMIT, mode = MODE, base = BASE) =>
  (...args) =>
    asyncReturn(action, { wait, limit, mode, base }, ...args);
