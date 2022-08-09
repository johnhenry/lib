#!/usr/bin/env node
import { transform } from "../src/index.mjs";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { extname } from "node:path";
import walk from "./walk.mjs";
import process from "node:process";
import path from "node:path";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const EXTENSION = "mjs";
const switchExtension = (file, ext) => {
  const index = file.lastIndexOf(".") + 1;
  return `${file.substring(0, index)}${ext}`;
};
const { log } = console;
const { argv } = yargs(hideBin(process.argv))
  .scriptName("ijs")
  .usage("$0 [infile] [outfile]")
  .option("project", {
    alias: "p",
    describe: "path to project to convert",
  })
  .option("include", {
    alias: "i",
    describe: "extension to include",
    default: ["ijs"],
  })
  .option("outdir", {
    alias: "o",
    describe: "project output directory",
    type: "string",
  })
  .option("extension", {
    alias: "e",
    describe: "extenison to use for converted files",
    default: EXTENSION,
  })
  .help("help");
const {
  project,
  include,
  outdir,
  extension,
  _: [infile, outfile],
} = argv;

if (infile) {
  const output = await transform(readFileSync(infile, "utf8"));
  if (!outfile) {
    log(output);
  } else {
    await writeFileSync(outfile, output);
  }
} else if (project) {
  try {
    const includes = Array.isArray(include) ? [...include] : [include];
    const files = await walk(project);
    for await (const i of files) {
      const infile = path.resolve(process.cwd(), project, i);
      let outfile = path.resolve(process.cwd(), outdir || project, i);
      const ext = extname(i).slice(1);
      let transformContent = false;
      if (includes.includes(ext)) {
        outfile = switchExtension(outfile, extension);
        transformContent = true;
      }
      if (infile !== outfile) {
        await mkdirSync(path.dirname(outfile), { recursive: true });
        if (transformContent) {
          const output = await transform(readFileSync(infile, "utf8"));
          await writeFileSync(outfile, output);
        } else {
          await writeFileSync(outfile, readFileSync(infile, "utf8"));
        }
      }
    }
  } catch (e) {
    throw e;
  }
}
