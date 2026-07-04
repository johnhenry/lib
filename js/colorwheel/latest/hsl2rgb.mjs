// https://stackoverflow.com/a/54014428/1290781
// input: h ∈ [0,2π],  s ∈ [0,1], ∈ [0,1]
// output: rgb ∈ [000000, FFFFFF]
export default (h, s, l) => {
  h = (360 * h) / (2 * Math.PI);
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)].map(numToHex).join("");
};
const numToHex = (num) =>
  Math.floor(num * 255)
    .toString(16)
    .padStart(2, "0");
