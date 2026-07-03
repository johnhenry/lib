// export default Object.fromEntries(
//   new URLSearchParams(window.location.search).entries()
// );

export const getEntries = () =>
  new URLSearchParams(window.location.search).entries();
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
export const currentQuery = () => Object.fromEntries(getEntries());
export default currentQuery();
