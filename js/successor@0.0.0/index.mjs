export const successor = (a = 0) => a + 1;

export const next =
  (prev, c = 1) =>
  (a, b = 0) => {
    const res = [];
    while (b) {
      res.push(a);
      b--;
    }
    return res.reduce(prev, c === null ? a : c);
  };

// https://codegolf.stackexchange.com/questions/11520/evaluate-the-nth-hyperoperation

const f = (n) => (x, y) => {};
