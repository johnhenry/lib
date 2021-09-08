import { proxy } from "https://deno.land/x/opineHttpProxy@2.8.0/mod.ts";
import opine from "https://cdn.deno.land/opine/versions/1.6.0/raw/mod.ts";

import { readLines } from "https://deno.land/std@0.76.0/io/bufio.ts";
import logLevels from "./logLevels.mjs";
import { APPNAME } from "./constants.mjs";

import OpenAICompletions, { DEFAULT_OPTIONS } from "./OpenAICompletions.ts";
// https://books.google.com/books?id=yzgzEAAAQBAJ&pg=PT403&lpg=PT403&dq=yargs+pipe+hyphen&source=bl&ots=OhiYTMlwK5&sig=ACfU3U2262EgG07AaOXlUUrY8lhWir8__g&hl=en&sa=X&ved=2ahUKEwjOmvuP1OvyAhXsCTQIHYvEBKgQ6AF6BAgTEAM#v=onepage&q=yargs%20pipe%20hyphen&f=false

import ENVIRONMENT from "./environment.ts";
import OutWriter from "./outwriter.mjs";
import FileLog from "./filelog.ts";

import EventSource from "./EventSource.mjs";

const API_URL = "https://api.openai.com";

export default async (yargs: any) => {
  const { argv } = yargs
    .usage(`${APPNAME} completions --flag`)
    .help()
    // API: JSON Parameters
    .option("max_tokens", {
      alias: "m",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_MAX_TOKENS) || undefined,
      description: "",
    })
    .option("temperature", {
      alias: "t",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_TEMPERATURE) || undefined,
      description: "",
    })
    .option("top_p", {
      alias: "p",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_TOP_P) || undefined,
      description: "",
    })
    .option("n", {
      alias: "n",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_N) || undefined,
      description: "",
    })
    .option("stream", {
      alias: "s",
      type: "boolean",
      default:
        ENVIRONMENT.OPENAI_STREAM === "true"
          ? true
          : ENVIRONMENT.OPENAI_STREAM === "false"
          ? false
          : undefined,
      description: "(not yet supported)",
    })
    .option("logprobs", {
      alias: "l",
      type: "boolean",
      default:
        ENVIRONMENT.OPENAI_LOGPROBS === "true"
          ? true
          : ENVIRONMENT.OPENAI_LOGPROBS === "false"
          ? false
          : undefined,
      description: "",
    })
    .option("echo", {
      alias: "e",
      type: "boolean",
      default:
        ENVIRONMENT.OPENAI_ECHO === "true"
          ? true
          : ENVIRONMENT.OPENAI_ECHO === "false"
          ? false
          : undefined,
      description: "",
    })
    .option("stop", {
      alias: "x",
      type: "boolean",
      default:
        ENVIRONMENT.OPENAI_STOP === "true"
          ? true
          : ENVIRONMENT.OPENAI_STOP === "false"
          ? false
          : undefined,
      description: "",
    })
    .option("presence_penalty", {
      alias: "r",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_PRESENCE_PENALTY) || undefined,
      description: "",
    })
    .option("frequency_penalty", {
      alias: "q",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_FREQUENCY_PENALTY) || undefined,
      description: "",
    })
    .option("best_of", {
      alias: "b",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_BEST_OF) || undefined,
      description: "",
    })
    .option("logit_bias", {
      alias: "l",
      type: "number",
      default: Number(ENVIRONMENT.OPENAI_LOGIT_BIAS) || undefined,
      description: "",
    })
    // API:URL Parameters
    .option("engine", {
      alias: "g",
      type: "string",
      default: "davinci",
      description: "",
    })
    //
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "file to watch",
    })
    .option("input", {
      alias: "i",
      type: "string",
      description: "",
    })
    .nargs("i", 1)
    .option("output", {
      alias: "o",
      type: "string",
      description: "",
    })
    .nargs("o", 1)
    .option("simple", {
      alias: "S",
      type: "boolean",
      description: "",
    })
    .option("format", {
      alias: "f",
      type: "string",
      default: "json",
      description: "",
    })
    .nargs("f", 1)
    // modal
    .option("http-proxy", {
      alias: "H",
      description: "proxy local",
    })
    .nargs("w", 1)
    .option("watch", {
      alias: "w",
      type: "string",
      description: "file to watch",
    })
    .nargs("w", 1)
    .option("interactive_file", {
      alias: "I",
      type: "string",
      description: "",
    })
    .option("repl", {
      alias: "R",
      type: "boolean",
      description: "",
    });
  if (argv["interactive_file"]) {
    argv["input"] = argv["output"] = argv["watch"] = argv["interactive_file"];
    argv["format"] = "simple";
    argv["echo"] = true;
  }
  if (argv["simple"]) {
    argv["format"] = "simple";
  }
  let {
    stream,
    input,
    engine,
    key,
    output,
    format,
    watch,
    verbose,
    echo,
    interactive_file,
    repl,
    httpProxy,
    _,
  } = argv;
  if (stream) {
    throw new Error("stream is not supported yet");
  }
  const StreamWriter = (log: any) => (sse: EventSource, format: any) => {
    sse.addEventListener("message", (e: any) => {
      const data = JSON.parse(e.data);
      const {
        id,
        event,
        data: { text },
      } = data;
      if (event === "message") {
        log(text);
      }
    });
    sse.addEventListener("error", (error: any) => {
      console.log({ error });
    });
    sse.addEventListener("open", (open: any) => {
      console.log({ open });
    });
    sse.addEventListener("close", (close: any) => {
      console.log({ close });
    });
  };

  const log = output ? FileLog(output) : console.log;

  const write = stream ? StreamWriter(log) : OutWriter(log);

  const [, ...tokens] = _;

  const verboseLog = logLevels(Number(verbose) || 0);
  // Log Options
  verboseLog(1, "API Options");
  verboseLog(1, "-----------");
  verboseLog(1, `  engine: ${engine}`);
  const optionKeys = Object.keys(DEFAULT_OPTIONS);
  for (const [key, value] of Object.entries(argv)) {
    if (optionKeys.includes(key)) {
      verboseLog(1, `  ${key}: ${value}`);
    }
  }
  const api = new OpenAICompletions(engine, key);
  if (input) {
    if (input === "-") {
      const lines = [];
      for await (const line of readLines(Deno.stdin)) {
        lines.push(line);
      }
      const data = lines.join("\n");
      verboseLog(1, data);
      const output = await api.create(data, argv);
      write(output, format);
      return;
    } else {
      if (watch) {
        let oldData;
        for await (const event of Deno.watchFs(watch)) {
          const data = await Deno.readTextFile(input);
          if (data === oldData) {
            continue;
          }
          verboseLog(1, "updating...");
          const output = await api.create(data, argv);
          write(output, format);
          verboseLog(1, "updated.");
          oldData = await Deno.readTextFile(input);
        }
        return;
      } else {
        const data = await Deno.readTextFile(input);
        verboseLog(1, data);
        const output = await api.create(data, argv);
        write(output, format);
        return;
      }
    }
  } else if (repl) {
    const MAX_COUNT = 2;
    let count = 0;
    while (true) {
      let data = prompt(">");
      if (!data) {
        count++;
        if (count === MAX_COUNT) {
          break;
        }
        continue;
      }
      count = 0;
      verboseLog(1, "updating...");
      const output = await api.create(data, argv);
      write(output, format);
      verboseLog(1, "updated.");
    }
    return;
  } else if (httpProxy) {
    const port = httpProxy === true ? 8080 : Number(httpProxy);
    const app: any = opine();
    app.use(
      "/",
      proxy(API_URL, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      })
    );
    app.listen({ port });
    return;
  } else if (tokens.length > 0) {
    const data = tokens.join(" ");
    const output = await api.create(data, argv);
    write(output, format);
    return;
  } else {
    throw new Error("no tokens provided");
  }
};
