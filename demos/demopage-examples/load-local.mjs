export const loadLocal = (folder, page, kind = "text") =>
  globalThis.fetch(`${folder}/${page}`).then((response) => response[kind]());

export default loadLocal;
