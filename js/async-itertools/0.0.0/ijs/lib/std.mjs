import { transduceAsync as tA, transduceSync as tS } from "../../index.mjs";

export const transduceAsync$ = async function (stack) {
  const newStack = [...stack];
  const iterator = newStack.shift();
  return [await tA(...newStack)(iterator)];
};

export const transduceSync$ = function (stack) {
  const newStack = [...stack];
  const iterator = newStack.shift();
  return [tS(...newStack)(iterator)];
};

export const collect$ = function (stack) {
  return [stack];
};

export const mapSync$ = function (stack) {
  const newStack = [...stack];
  const fn = newStack.pop();
  return [...newStack].map(fn);
};

export const mapAsync$ = async function (stack) {
  const newStack = [...stack];
  const fn = newStack.pop();
  return Promise.all([...newStack].map(fn));
};

export const dupe$ = function (stack) {
  return [...stack, ...stack];
};

export const drop$ = function (stack) {
  const newStack = [...stack];
  newStack.pop();
  return newStack;
};

export const reverse$ = function (stack) {
  const newStack = [...stack];
  return newStack.reverse();
};
