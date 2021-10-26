// dev.to
// https://docs.forem.com/api/
import recursiveFileMatch from "../js/recursive-file-match@0.0.0/index.mjs";
import fs from "fs";
import showdown from "showdown";
const converter = new showdown.Converter();

const reg = /(.+).md/;

for (const infile of recursiveFileMatch("./notes/", reg)) {
  const outfile = `${reg.exec(infile)[1]}.html`;
  fs.writeFileSync(
    outfile,
    converter.makeHtml(fs.readFileSync(infile, "utf8"))
  );
  console.log(`converting: ${infile} => ${outfile}`);
}
