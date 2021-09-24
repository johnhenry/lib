import { DEFAULT_OPTIONS } from "./OpenAICompletions.ts";
import { environment, join } from "./deps.ts";

const base = [
  "api_key",
  "engine",
  "prompt",
  "input_file",
  "output_file",
  "flash_message",
  "full_output",
  "format",
  "http_proxy",
  "watch_file",
  "interactive_file",
  "interactive_start",
  "interactive_restart",
  "repl",
  "verbose",
];

const createEnvironment = async (config = "openai.ts") => {
  const ENVIRONMENT: any = {};
  const env: any = Deno.env.toObject();
  const env_file: any = environment({ safe: true, allowEmptyValues: true });
  let set: any = {};

  // if (config) {
  //   const path = join(Deno.cwd(), config);
  //   if (existsSync(path)) {
  //     const protoSet = await import(path, config));
  //     set = Object.fromEntries(
  //       await Promise.all(
  //         Object.entries(protoSet).map(async ([k, v]) => [
  //           k.toUpperCase(),
  //           String((await v) ?? ""),
  //         ])
  //       )
  //     );
  //   }
  // }

  try {
    if (config) {
      const protoSet = await import(join(Deno.cwd(), config));
      set = Object.fromEntries(
        await Promise.all(
          Object.entries(protoSet).map(async ([k, v]) => [
            k.toUpperCase(),
            String((await v) ?? ""),
          ])
        )
      );
    }
  } catch (e) {
    set = {};
  }
  const keys = base
    .concat(Object.keys(DEFAULT_OPTIONS))
    .map((key: string) => `OPENAI_${key.toUpperCase()}`);
  for (const key of keys) {
    ENVIRONMENT[key] = set[key] || env[key] || env_file[key];
  }
  return ENVIRONMENT;
};
export default createEnvironment;
