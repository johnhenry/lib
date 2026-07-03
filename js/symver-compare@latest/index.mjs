export default (str0 = "..", str1 = "") => {
  const [maj, min, pat] = str0.split(".").map(Number);
  const [major, minor, patch] = str1.split(".").map(Number);
  if (maj > major) {
    return 1;
  }
  if (major > maj) {
    return -1;
  }
  if (min > minor) {
    return 1;
  }
  if (minor > min) {
    return -1;
  }
  if (pat > patch) {
    return 1;
  }
  if (patch > pat) {
    return -1;
  }
  return 0;
};
