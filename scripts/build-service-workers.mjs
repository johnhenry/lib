import esbuild from "esbuild";
import recursiveFileMatch from "../js/recursive-file-match@0.0.0/index.mjs";

const reg = /(.*service-worker)\.es6\.mjs/;

for (const infile of recursiveFileMatch("./", reg)) {
  const outfile = `${reg.exec(infile)[1]}.js`;
  esbuild.buildSync({
    entryPoints: [infile],
    outfile,
    bundle: true,
    format: "iife",
  });
  console.log(`${infile} => ${outfile}`);
}
