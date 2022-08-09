export const print = console.log;
export const process = async function (iterator) {
  const stack = [];
  for await (const item of iterator) {
    if (typeof item === "function") {
      if (item.APPLY) {
        const parity = item.PARITY ?? stack.length - 1;
        const subStack = [];
        const fn = stack.pop();
        for (let i = 0; i < parity; i++) {
          subStack.unshift(stack.pop());
        }
        for (const i of await fn(subStack)) {
          stack.push(i);
        }
      } else {
        stack.push(item);
      }
    } else {
      stack.push(item);
    }
  }
  return stack;
};

export const apply = function (parity = null) {
  const a = async function (args) {
    const stack = [];
    const fn = args.pop();

    for (const arg of args) {
      stack.push(await fn(arg));
    }
    return stack;
  };
  a.APPLY = true;
  a.PARITY = parity;
  return a;
};

export const peek = function (stack) {
  console.log(...stack);
  return stack;
};

export const expand = function (stack) {
  const newStack = [];
  for (const item of stack) {
    for (const i of item) {
      newStack.push(i);
    }
  }
  return newStack;
};

export const compose = function (funcs) {
  return [
    (stack) => {
      let newStack = stack;
      for (const fn of funcs) {
        newStack = fn(newStack);
      }
      return newStack;
    },
  ];
};
