export const CSV_LABEL = "html-tag";
export const FILE_NAME = "data";
const SOURCE =
  "https://raw.githubusercontent.com/sindresorhus/html-tags/main/html-tags.json";
export const RAW = await fetch(SOURCE).then((r) => r.json());
export const DATE = Number(new Date());
