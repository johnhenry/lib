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

const API_URL = "https://api.openai.com/v1/engines";

const log = console.log;

export default async (yargs: any) => {
  const { argv } = yargs.usage(`${APPNAME} engines --flag`).help();
  const { key } = argv;
  const result: any = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  }).then((r) => r.json());
  const { data }: any = result;
  for (const { id } of data) {
    log(id);
  }
};
