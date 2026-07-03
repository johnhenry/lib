const zip = (...arrays) => {
  const out = [];
  const length = Math.max(...arrays.map((a) => a.length));
  for (let i = 0; i < length; i++) {
    const current = [];
    for (const array of arrays) {
      if (i in array) {
        current.push(array[i]);
      }
    }
    out.push(current);
  }
  return out;
};

const repeat = (...arrays) => {
  const out = [];
  const length = Math.max(...arrays.map((a) => a.length));
  for (let i = 0; i < length; i++) {
    const current = [];
    for (const array of arrays) {
      current.push(array[i % array.length]);
    }
    out.push(current);
  }
  return out;
};

export default zip;
export { repeat, zip };
