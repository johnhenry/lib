import path from "path";
import fs from "fs";
const recursiveFileMatch = function* (startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  for (const file of fs.readdirSync(startPath)) {
    const filename = path.join(startPath, file);
    if (fs.lstatSync(filename).isDirectory()) {
      yield* recursiveFileMatch(filename, filter); //recurse
    } else if (filter.test(filename)) {
      yield filename;
    }
  }
};

export default recursiveFileMatch;
