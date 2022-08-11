#!/usr/bin/env node
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from "node:fs";
import { extname } from "node:path";
import process from "node:process";
import path from "node:path";
import { transform, preamble } from "../../jth-transform/src/index.mjs";
import { spawn } from "node:child_process";

import nodeRepl from "node:repl";

import walk from "./walk.mjs";

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const EXTENSION = "mjs";
const switchExtension = (file, ext) => {
  const index = file.lastIndexOf(".") + 1;
  return `${file.substring(0, index)}${ext}`;
};

const { log } = console;
const yargsInstance = yargs(hideBin(process.argv))
  .scriptName("jth")
  .usage("$0 [flags] [infile] [outfile]")
  .option("project", {
    alias: "p",
    describe: "path to project to convert",
  })
  .option("include", {
    alias: "i",
    describe: "extension to include",
    default: ["jth"],
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
  .option("run", {
    alias: "r",
    describe: "run node file",
  })
  .option("repl", {
    alias: "l",
    describe: "run repl",
  })
  .help("h")
  .alias("h", "help")
  .alias("v", "version");
const { argv } = yargsInstance;
const {
  project,
  include,
  outdir,
  extension,
  run,
  repl,
  _: [infile, outfile],
} = argv;

if (infile) {
  const output = await transform(readFileSync(infile, "utf8"));
  if (!outfile) {
    if (run) {
      const randFile = `${path.dirname(infile)}/${Math.random()
        .toString()
        .slice(2)}.${extension}`;
      await writeFileSync(randFile, output);
      const child = spawn("node", [randFile], {
        stdio: "inherit",
      });
      child.on("exit", (code) => {
        unlinkSync(randFile);
        process.exit(code);
      });
    } else {
      log(output);
    }
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
} else if (repl) {
  const child = spawn("node", ["-i"], {
    stdio: ["pipe", "pipe", null],
    shell: true,
  });
  // const pre = ;
  let outerCallback;
  child.stdout.on("data", (chunk) => {
    if (!outerCallback) {
      return;
    }
    let string = chunk.toString();
    if (string.endsWith("\n")) {
      string = string.slice(0, -1);
    }
    const match = /^(?:undefined\n> )?(?:\.{3} )*$/;
    const match2 = /^(?:.*)\n> $/;
    if (string && !match.test(string)) {
      if (match2.test(string)) {
        const [, out] = string.match(match2);
        outerCallback(null, out);
      } else {
        outerCallback(null, string);
      }
    } else {
      outerCallback(null);
    }
  });
  // child.stderr.on("error", (err) => {
  //   outerCallback(err);
  // });
  let first = true;
  const evaluate = (cmd, context, filename, callback) => {
    outerCallback = callback;

    transform(cmd, undefined, false).then((c) => {
      if (first) {
        child.stdin.write(Buffer.from(preamble().join("\n")));
        first = false;
      }
      child.stdin.write(c);
    });
  };

  nodeRepl.start({
    useGlobal: true,
    ignoreUndefined: true,
    eval: evaluate,
  });
} else {
  yargsInstance.showHelp();
}
