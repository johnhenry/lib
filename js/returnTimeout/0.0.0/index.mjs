export default (action = () => {}, time, ...args) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(action(...args));
    }, time)
  );
