export const parseFileURL = (url) => {
  const file = url;
  const folder = file.substring(0, file.lastIndexOf("/"));
  const name = file.substring(file.lastIndexOf("/") + 1);
  return { file, folder, name };
};
export default parseFileURL;
