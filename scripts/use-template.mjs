import template from "../templates/html.mjs";
import { readFileSync, writeFileSync } from "fs";
const args = process.argv.slice(2);

if (args.length !== 2) {
  throw new Error(
    "must provide exactly two urls: a source and a destination. Use '%20' in place of spaces"
  );
}

const [source, destination] = args;

writeFileSync(destination, template(readFileSync(source, "utf8")));
