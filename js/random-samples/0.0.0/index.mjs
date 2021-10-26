export const sampleRepeats = function* (count = Infinity, ...samples) {
  let i = 0;
  while (i < count) {
    const index = Math.floor(Math.random() * samples.length);
    yield samples[index];
    i++;
  }
};

export const sample = function* (count = Infinity, ...samples) {
  let i = 0;
  while (i < count) {
    const index = Math.floor(Math.random() * samples.length);
    yield samples[index];
    samples.splice(index, 1);
    i++;
  }
};

export const genString = (string, count) => {
  const chars = string.split("");
  const gen = sample(count, ...chars);
  return Array.from(gen).join("");
};
export const genStringRepeats = (string, count) => {
  const chars = string.split("");
  const gen = sampleRepeats(count, ...chars);
  return Array.from(gen).join("");
};
