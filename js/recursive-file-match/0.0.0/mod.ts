import { existsSync, walkSync } from "https://deno.land/std@0.88.0/fs/mod.ts";

const recursiveFileMatch = async function* (startPath, filter) {
  if (!existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  for (const file of walkSync(startPath)) {
    if (file.isDirectory) {
      continue;
    } else if (filter.test(file.path)) {
      yield file.path;
    }
  }
};
export default recursiveFileMatch;
