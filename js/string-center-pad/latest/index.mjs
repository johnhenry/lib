const centerPad = (
  string,
  max = 0,
  char = " ",
  grow = false,
  startBias = true
) => {
  string = String(string);
  const diff = max - string.length;
  if (diff < 1) {
    return string;
  }
  const add = grow && diff % 2 ? 1 : 0;
  if (startBias) {
    return string
      .padEnd(string.length + Math.ceil((max - string.length) / 2), char)
      .padStart(max + add, char);
  } else {
    return string
      .padStart(string.length + Math.floor((max - string.length) / 2), char)
      .padEnd(max + grow, char);
  }
};

export default centerPad;

export const join = (
  iterator,
  joiner = ",",
  char = " ",
  grow = false,
  startBias = true
) => {
  const items = [...iterator];
  const max = Math.max(...items.map((x) => x.length));
  return items
    .map((item) => centerPad(item, max, char, grow, startBias))
    .join(joiner);
};
