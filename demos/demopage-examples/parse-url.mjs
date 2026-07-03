export const parseURL = (url) => {
  const file = url;
  const folder = file.substring(0, file.lastIndexOf("/"));
  return { file, folder };
};
export default parseURL;
