export default Object.fromEntries(
  new URLSearchParams(
    window.location.hash ? window.location.hash.slice(1) : ""
  ).entries()
);
