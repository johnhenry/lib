import { yargs } from "./deps.ts";

import { APPNAME, CONFIGFILE } from "./constants.mjs";
import createEnvironment from "./create-environment.ts";
import command_completions from "./command.completions.ts";
import command_engines from "./command.engines.ts";
import nny from "./no-name-yet.ts";

const args = yargs(Deno.args)
  .usage(`${APPNAME} <command> --flag`)
  .help()
  .option("config", {
    alias: "c",
    type: "string",
    default: CONFIGFILE,
    description: "API Key",
  });
const ENVIRONMENT = await createEnvironment(args.argv.config);
args
  .option("key", {
    alias: "k",
    type: "string",
    default: ENVIRONMENT.OPENAI_API_KEY || undefined,
    description: "API Key",
  })
  .option("verbose", {
    alias: "v",
    type: "count",
    default: Number(ENVIRONMENT.OPENAI_VERBOSE) || 0,
    description: "Verosity level",
  })
  .command(
    "completions",
    "download a list of files",
    command_completions({ ENVIRONMENT })
  )
  .command("engines", "show a list of engines", command_engines)
  .command("search", "search", nny({ name: "search", ENVIRONMENT }))
  .command("classify", "classify", nny({ name: "classify", ENVIRONMENT }))
  .command("answer", "answer", nny({ name: "answer", ENVIRONMENT }))
  .strictCommands()
  .demandCommand(1).argv;
