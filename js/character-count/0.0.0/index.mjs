export default (charsString, codePoints = true) => {
  const counts = {};
  for (const char of codePoints ? charsString : charsString.split("")) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
};
