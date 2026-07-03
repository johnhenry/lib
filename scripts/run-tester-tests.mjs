import recursiveFileMatch from "../js/recursive-file-match@0.0.0/index.mjs";

const startPath = "./js/";
const reg = /(.+)\.popquiz\.test\.mjs/;
for await (const file of recursiveFileMatch(startPath, reg)) {
  console.log(`running test: ${file}`);
  await import(`../${file}`);
}
