const meanMap = (...items) => {
  const { length } = items;
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += items[i];
  }
  sum /= length;
  return new Array(length).fill(sum);
};
export default meanMap;
