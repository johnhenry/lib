import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";

import { APPNAME } from "./constants.mjs";
import command_completions from "./command.completions.ts";

yargs(Deno.args)
  .usage(`${APPNAME} <command> --flag`)
  .help()
  .option("key", {
    alias: "k",
    type: "string",
    default: "",
    description: "API Key",
  })
  .command("completions", "download a list of files", command_completions)
  .strictCommands()
  .demandCommand(1).argv;
