// export default Object.fromEntries(
//   new URLSearchParams(window.location.search).entries()
// );
export const entries = new URLSearchParams(window.location.search).entries();
export const without = (target) =>
  Object.fromEntries([...entries].filter(([key]) => key !== target));
export const toString = (
  joinerNarrow = "=",
  joinerWide = "&",
  start = "",
  end = ""
) =>
  `${start}${[...entries]
    .map(([key, value]) => `${key}${joinerNarrow}${value}`)
    .join(joinerWide)}${end}`;
export default Object.fromEntries(entries);
