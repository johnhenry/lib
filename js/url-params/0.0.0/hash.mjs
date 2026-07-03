// export default Object.fromEntries(
//   new URLSearchParams(
//     window.location.hash ? window.location.hash.slice(1) : ""
//   ).entries()
// );

const getEntries = () =>
  new URLSearchParams(
    window.location.hash ? window.location.hash.slice(1) : ""
  ).entries();
export const entries = getEntries();
export const without = (target) =>
  Object.fromEntries([...getEntries()].filter(([key]) => key !== target));
export const toString = (
  joinerNarrow = "=",
  joinerWide = "&",
  start = "",
  end = ""
) =>
  `${start}${[...getEntries()]
    .map(([key, value]) => `${key}${joinerNarrow}${value}`)
    .join(joinerWide)}${end}`;

export const currentHash = () => Object.fromEntries(getEntries());
export default currentHash();
