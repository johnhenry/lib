export default Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);