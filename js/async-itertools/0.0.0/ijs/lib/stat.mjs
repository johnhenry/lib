export const sum$ = function (stack) {
  return [stack.reduce((a, b) => a + b, 0)];
};

export const product$ = function (stack) {
  return [stack.reduce((a, b) => a * b, 1)];
};

export const mean$ = function (stack) {
  return [stack.reduce((a, b) => a + b, 0) / stack.length];
};

export const count$ = function (stack) {
  return [stack.length];
};

export const median$ = function (stack) {
  const values = [...stack].sort();
  const half = Math.floor(values.length / 2);
  if (values.length % 2) {
    return [values[half]];
  }
  return [(values[half - 1] + values[half]) / 2];
};

export const mode$ = function (stack) {
  const counts = new Map();
  let max = 0;
  for (const item of stack) {
    const value = counts.get(item) || 0;
    counts.set(item, value + 1);
    if (value === max) {
      max++;
    }
  }
  return [[...counts].find(([, value]) => value === max)[0]];
};

export const modes$ = function (stack) {
  const counts = new Map();
  let max = 0;
  for (const item of stack) {
    const value = counts.get(item) || 0;
    counts.set(item, value + 1);
    if (value === max) {
      max++;
    }
  }
  return [...counts].filter(([, value]) => value === max).map(([key]) => key);
};

export const first$ = function (stack) {
  return [stack[0]];
};

export const last$ = function (stack) {
  return [stack[stack.length - 1]];
};

export const take$ = function (stack) {
  const newStack = [...stack];
  const length = newStack.pop();
  return newStack.slice(-1 * length);
};

export const sort$ = function (stack) {
  const newStack = [...stack];
  return newStack.sort((a, b) => a - b);
};

export const sortD$ = function (stack) {
  const newStack = [...stack];
  return newStack.sort((a, b) => b - a);
};

export const randmoize$ = function (stack) {
  const newStack = [...stack];
  const randomized = newStack.sort((a, b) => 0.5 - Math.random());
  return randomized;
};
