export const query = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);
export const hash = Object.fromEntries(
  new URLSearchParams(
    window.location.hash ? window.location.hash.slice(1) : ""
  ).entries()
);
