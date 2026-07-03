/**
 * openai — a small command line tool for the OpenAI API.
 *
 * Usage:
 *   deno run --allow-net --allow-env cli.ts chat "Say hello" [--model=gpt-4o-mini] [--system=...] [--no-stream]
 *   deno run --allow-net --allow-env cli.ts models
 *
 * The API key is read from the OPENAI_API_KEY environment variable
 * (or the --key flag).
 */
import { DEFAULT_MODEL, OpenAI } from "./mod.ts";

const USAGE = `openai <command> [options]

Commands:
  chat <prompt...>   complete a chat prompt (reads stdin if prompt is "-")
  models             list available model ids

Options:
  --key=KEY          API key (default: OPENAI_API_KEY environment variable)
  --model=MODEL      model id (default: ${DEFAULT_MODEL})
  --system=TEXT      system instruction
  --temperature=N    sampling temperature
  --max-tokens=N     completion token limit
  --no-stream        wait for the full response instead of streaming
  --help             show this message`;

interface ParsedArgs {
  command?: string;
  positional: string[];
  flags: Record<string, string | boolean>;
}

/** Tiny flag parser: supports --flag, --flag=value, and positionals. */
export const parseArgs = (args: string[]): ParsedArgs => {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (const arg of args) {
    if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq === -1) {
        flags[arg.slice(2)] = true;
      } else {
        flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      }
    } else {
      positional.push(arg);
    }
  }
  const [command, ...rest] = positional;
  return { command, positional: rest, flags };
};

const main = async () => {
  const { command, positional, flags } = parseArgs(Deno.args);

  if (flags.help || !command) {
    console.log(USAGE);
    Deno.exit(command ? 0 : 1);
  }

  const apiKey = typeof flags.key === "string"
    ? flags.key
    : Deno.env.get("OPENAI_API_KEY") ?? "";
  if (!apiKey) {
    console.error("error: no API key; set OPENAI_API_KEY or pass --key");
    Deno.exit(1);
  }

  const client = new OpenAI({ apiKey });

  switch (command) {
    case "models": {
      for (const { id } of await client.models()) {
        console.log(id);
      }
      break;
    }
    case "chat": {
      let prompt = positional.join(" ");
      if (prompt === "-" || prompt === "") {
        const chunks: Uint8Array[] = [];
        for await (const chunk of Deno.stdin.readable) {
          chunks.push(chunk);
        }
        prompt = new TextDecoder().decode(
          new Uint8Array(await new Blob(chunks as BlobPart[]).arrayBuffer()),
        ).trim();
      }
      if (!prompt) {
        console.error("error: no prompt provided");
        Deno.exit(1);
      }
      const options = {
        model: typeof flags.model === "string" ? flags.model : undefined,
        system: typeof flags.system === "string" ? flags.system : undefined,
        temperature: typeof flags.temperature === "string"
          ? Number(flags.temperature)
          : undefined,
        maxTokens: typeof flags["max-tokens"] === "string"
          ? Number(flags["max-tokens"])
          : undefined,
      };
      if (flags["no-stream"]) {
        const completion = await client.chat(prompt, options);
        console.log(completion.choices[0]?.message?.content ?? "");
      } else {
        const encoder = new TextEncoder();
        for await (const delta of client.chatStream(prompt, options)) {
          await Deno.stdout.write(encoder.encode(delta));
        }
        await Deno.stdout.write(encoder.encode("\n"));
      }
      break;
    }
    default: {
      console.error(`error: unknown command "${command}"\n\n${USAGE}`);
      Deno.exit(1);
    }
  }
};

if (import.meta.main) {
  await main();
}
