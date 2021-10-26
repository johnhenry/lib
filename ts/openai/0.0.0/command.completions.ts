// import { proxy } from "https://deno.land/x/opineHttpProxy@2.8.0/mod.ts";
// import opine from "https://cdn.deno.land/opine/versions/1.6.0/raw/mod.ts";
// import { readLines } from "https://deno.land/std@0.76.0/io/bufio.ts";
import { proxy, opine, readLines } from "./deps.ts";
import logLevels from "./logLevels.mjs";
import { APPNAME } from "./constants.mjs";

import hashfile from "./hashfile.ts";

import OpenAICompletions, { DEFAULT_OPTIONS } from "./OpenAICompletions.ts";
// https://books.google.com/books?id=yzgzEAAAQBAJ&pg=PT403&lpg=PT403&dq=yargs+pipe+hyphen&source=bl&ots=OhiYTMlwK5&sig=ACfU3U2262EgG07AaOXlUUrY8lhWir8__g&hl=en&sa=X&ved=2ahUKEwjOmvuP1OvyAhXsCTQIHYvEBKgQ6AF6BAgTEAM#v=onepage&q=yargs%20pipe%20hyphen&f=false

import OutWriter from "./outwriter.mjs";
import FileLog from "./filelog.ts";

import EventSource from "./EventSource.mjs";

const API_URL = "https://api.openai.com";

export default ({ ENVIRONMENT }: any) =>
  async (yargs: any) => {
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
        type: "array",
        default: ENVIRONMENT.OPENAI_STOP
          ? ENVIRONMENT.OPENAI_STOP.split(",")
          : [],
        description: "",
      })
      .nargs("x", 1)
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
      // API: Other Parameters
      .option("prompt", {
        alias: "P",
        type: "string",
        default: ENVIRONMENT.OPENAI_PROMPT || "",
        description: "",
      })
      .option("engine", {
        alias: "g",
        type: "string",
        default: ENVIRONMENT.OPENAI_ENGINE || "davinci",
        description: "",
      })
      //
      .option("flash-message", {
        alias: "f",
        type: "string",
        default: ENVIRONMENT.OPENAI_FLASH_MESSAGE || "",
        description: "flash message",
      })

      .option("input", {
        alias: "i",
        type: "string",
        default: ENVIRONMENT.OPENAI_INPUT_FILE || "",
        description: "",
      })
      .nargs("i", 1)
      .option("output", {
        alias: "o",
        type: "string",
        default: ENVIRONMENT.OPENAI_OUTPUT_FILE || "",
        description: "",
      })
      .nargs("o", 1)
      .option("append", {
        alias: "d",
        type: "boolean",
        default:
          ENVIRONMENT.OPENAI_APPEND_OUTPUT === "true"
            ? true
            : ENVIRONMENT.OPENAI_APPEND_OUTPUT === "false"
            ? false
            : undefined,
        description: "",
      })
      .option("full", {
        alias: "F",
        type: "boolean",
        default:
          ENVIRONMENT.OPENAI_FULL_OUTPUT === "true"
            ? true
            : ENVIRONMENT.OPENAI_FULL_OUTPUT === "false"
            ? false
            : undefined,
        description: "",
      })
      .option("style", {
        alias: "y",
        type: "string",
        default: ENVIRONMENT.OPENAI_FORMAT || "",
        description: "",
      })
      .nargs("f", 1)
      // modal
      .option("http-proxy", {
        alias: "H",
        default:
          ENVIRONMENT.OPENAI_HTTP_PROXY === "true"
            ? true
            : ENVIRONMENT.OPENAI_HTTP_PROXY === "false"
            ? false
            : Number(ENVIRONMENT.OPENAI_HTTP_PROXY),
        description: "proxy local",
      })
      .nargs("w", 1)
      .option("watch", {
        alias: "w",
        type: "string",
        default: ENVIRONMENT.OPENAI_WATCH_FILE || "",
        description: "file to watch",
      })
      .nargs("w", 1)
      .option("interactive-file", {
        alias: "I",
        type: "string",
        default: ENVIRONMENT.OPENAI_INTERACTIVE_FILE || "",
        description: "",
      })
      .option("interactive-start", {
        alias: "a",
        type: "string",
        default: ENVIRONMENT.OPENAI_INTERACTIVE_START || "",
        description: "",
      })
      .option("interactive-restart", {
        alias: "z",
        type: "string",
        default: ENVIRONMENT.OPENAI_INTERACTIVE_RESTART || "",
        description: "",
      })
      .option("repl", {
        alias: "R",
        type: "boolean",
        default: ENVIRONMENT.OPENAI_REPL === "true" ? true : false,
        description: "(Ctrl+C to exit)",
      });

    if (argv["stop"].length === 0) {
      argv["stop"] = null;
    }

    if (argv["interactive-file"]) {
      argv["input"] = argv["output"] = argv["watch"] = argv["interactive-file"];
      argv["echo"] = true;
    }
    if (argv["full"]) {
      argv["style"] = "full";
    }

    argv["flashMessage"] = argv["flashMessage"].replaceAll("\\n", "\n");

    argv["interactiveStart"] = argv["interactiveStart"].replaceAll("\\n", "\n");

    argv["interactiveRestart"] = argv["interactiveRestart"].replaceAll(
      "\\n",
      "\n"
    );
    if (argv["stop"]) {
      argv["stop"] = argv["stop"].map((item: string) =>
        item.replaceAll("\\n", "\n")
      );
    }

    let {
      stream,
      input,
      engine,
      key,
      output,
      style,
      watch,
      verbose,
      repl,
      httpProxy,
      httpProxyGuard,
      prompt,
      flashMessage,
      interactiveStart,
      interactiveRestart,
      append,
      proxyguard,
      _,
    } = argv;

    if (stream) {
      throw new Error("stream is not supported yet");
    }

    const StreamWriter =
      (log: any) =>
      (sse: EventSource | string, style: any, addendum: string = "") => {
        // sse.addEventListener("message", (e: any) => {
        //   const data = JSON.parse(e.data);
        //   const {
        //     id,
        //     event,
        //     data: { text },
        //   } = data;
        //   if (event === "message") {
        //     log(text);
        //   }
        // });
        // const out = console.log;
        // sse.addEventListener("error", (error: any) => {
        //   out({ error });
        // });
        // sse.addEventListener("open", (open: any) => {
        //   out({ open });
        // });
        // sse.addEventListener("close", (close: any) => {
        //   out({ close });
        // });
      };

    const log = output ? FileLog(output, append) : console.log;

    const write = stream ? StreamWriter(log) : OutWriter(log);

    const [, ...tokens] = _;

    const verboseLog = logLevels(verbose);
    if (flashMessage) {
      verboseLog(0, flashMessage);
    }
    // Log Options
    verboseLog(1, "API Options");
    verboseLog(1, "-----------");
    verboseLog(1, `  - prompt: ${prompt}`);
    verboseLog(1, `  - engine: ${engine}`);
    const optionKeys = Object.keys(DEFAULT_OPTIONS);
    for (const [key, value] of Object.entries(argv)) {
      if (optionKeys.includes(key)) {
        verboseLog(1, `  - ${key}: ${value}`);
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
        write(output, style);
        return;
      } else {
        if (watch) {
          verboseLog(1, "watching", watch);
          verboseLog(1, "Ctrl + c to quit");
          let oldHash;
          for await (const _ of Deno.watchFs(watch)) {
            const newHash = await hashfile(input);
            if (newHash === oldHash) {
              continue;
            }

            verboseLog(2, "change detected", oldHash, newHash);
            const data = (await Deno.readTextFile(input)) + interactiveStart;
            const output = await api.create(data, argv);
            write(output, style, interactiveRestart);
            oldHash = await hashfile(input);
            verboseLog(2, "updated", watch, oldHash, newHash);
          }
          return;
        } else {
          const data = await Deno.readTextFile(input);
          verboseLog(1, data);
          const output = await api.create(data, argv);
          write(output, style);
          return;
        }
      }
    } else if (repl) {
      verboseLog(1, "awaiting user input");
      verboseLog(1, "Ctrl + c to quit");
      const MAX_COUNT = 2;
      let count = 0;
      while (true) {
        let data = globalThis.prompt(">");
        if (!data) {
          count++;
          if (count === MAX_COUNT) {
            break;
          }
          continue;
        }
        count = 0;
        verboseLog(2, "updating...");
        const output = await api.create(data, argv);
        write(output, style);
        verboseLog(2, "updated.");
      }
      return;
    } else if (httpProxy || httpProxy === 0) {
      const port = httpProxy === true ? 8080 : httpProxy;
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
      verboseLog(1, "serving", port);
      verboseLog(1, "Ctrl + c to quit");
      return;
      // let proxyguard;
      // if(httpProxyGuard){
      //   proxyguard = (await import(join(Deno.cwd(), httpProxyGuard)).default;
      // }
      // initiateHTTP(port);
      // addEventListener("fetch", (event: Event): void => {
      //   const fetchEvent = event as FetchEvent;
      //   if(proxyguard){
      //     try{
      //       if(guard(event.request) instanceOf Response){
      //         return fetchEvent.respondWith(guard(event.request));
      //       }
      //     }catch({message}){
      //       return fetchEvent.respondWith(new Response(`guard error:${message}`, {status: 500}));
      //     }
      //   }
      //   fetchEvent.respondWith(
      //     fetch(new Request(event.request, {
      //     headers: {
      //       Authorization: `Bearer ${key}`,
      //     },
      //   }))););
    } else if (tokens.length > 0) {
      const data = tokens.join(" ");
      const output = await api.create(data, argv);
      write(output, style);
      return;
    } else if (prompt) {
      const data = prompt;
      const output = await api.create(data, argv);
      write(output, style);
    } else {
      throw new Error("no tokens provided");
    }
  };
