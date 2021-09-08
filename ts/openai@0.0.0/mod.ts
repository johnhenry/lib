import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";

import { APPNAME } from "./constants.mjs";
import ENVIRONMENT from "./environment.ts";
import command_completions from "./command.completions.ts";
import command_engines from "./command.engines.ts";

yargs(Deno.args)
  .usage(`${APPNAME} <command> --flag`)
  .help()
  .option("key", {
    alias: "k",
    type: "string",
    default: ENVIRONMENT.OPENAI_API_KEY || undefined,
    description: "API Key",
  })
  .command("completions", "download a list of files", command_completions)
  .command("engines", "show a list of engines", command_engines)
  .strictCommands()
  .demandCommand(1).argv;
