import recursiveFileMatch from "../js/recursive-file-match@0.0.0/index.mjs";
import fs from "fs";
import showdown from "showdown";
const converter = new showdown.Converter();

const reg = /(.*readme).md/;

for (const infile of recursiveFileMatch("./std/", reg)) {
  const outfile = `${reg.exec(infile)[1]}.html`;
  fs.writeFileSync(
    outfile,
    converter.makeHtml(fs.readFileSync(infile, "utf8"))
  );
  console.log(`${infile} => ${outfile}`);
}
