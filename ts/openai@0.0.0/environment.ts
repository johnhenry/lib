import { DEFAULT_OPTIONS } from "./OpenAICompletions.ts";

import { config as environment } from "https://deno.land/x/dotenv@v1.0.1/mod.ts";

const base = [
  "api_key",
  "engine",
  "prompt",
  "input_file",
  "output_file",
  "simple",
  "format",
  "http_proxy",
  "watch_file",
  "interactive_file",
  "repl",
];
// import { Config as settings } from "https://raw.githubusercontent.com/eankeen/config/master/mod.ts";
const ENVIRONMENT: any = {};
{
  const env: any = Deno.env.toObject();
  const env_file: any = environment({ safe: true });
  let set: any = {};
  // set = (await settings.load({
  //       file: "openai",
  //       searchDir: Deno.cwd(),
  //     })) || {};

  const keys = base
    .concat(Object.keys(DEFAULT_OPTIONS))
    .map((key: string) => `OPENAI_${key.toUpperCase()}`);
  for (const key of keys) {
    ENVIRONMENT[key] = env[key] || env_file[key] || set[key];
  }
}
export default ENVIRONMENT;
