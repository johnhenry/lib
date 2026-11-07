const { performance } = globalThis;

export default (name, fn, iterations = 1000000, results = false) => {
  const res = [];
  const start = performance.now();
  if (results) {
    for (let i = 0; i < iterations; i++) {
      res.push(fn());
    }
  } else {
    for (let i = 0; i < iterations; i++) {
      fn();
    }
  }
  return {
    name,
    end: performance.now() - start,
    results: res,
  };
};
