const CREATE_URL = (engine_id: string): string =>
  `https://api.openai.com/v1/engines/${engine_id}/completions/browser_stream`;
const STREAM_URL = (engine_id: string): string =>
  `https://api.openai.com/v1/engines/${engine_id}/completions`;
import filterObjectByIterator from "./filterObjectByIterator.mjs";

import EventSource from "./EventSource.mjs";
export const DEFAULT_OPTIONS = {
  max_tokens: 16,
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: false,
  logprobs: null,
  echo: false,
  stop: null,
  presence_penalty: 0,
  frequency_penalty: 0,
  best_of: 1,
  logit_bias: null,
};

const OpenAICompletion = class {
  #apiKey: string = "";
  #createURL: string = "";
  #streamURL: string = "";
  constructor(engine_id: string = "", apiKey = "") {
    this.#apiKey = apiKey;
    this.#createURL = CREATE_URL(engine_id);
    this.#streamURL = STREAM_URL(engine_id);
  }
  stream(
    prompt: string = "",
    options: { [name: string]: any } = DEFAULT_OPTIONS
  ) {
    options = filterObjectByIterator(options, Object.keys(DEFAULT_OPTIONS));

    return new EventSource(
      `${this.#createURL}?${new URLSearchParams({ prompt, ...options } as {})}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.#apiKey}`,
        },
      }
    );
  }
  create(
    prompt: string = "",
    options: { [name: string]: any } = DEFAULT_OPTIONS
  ) {
    if (options.stream) {
      return this.stream(prompt, options);
    }
    options = filterObjectByIterator(options, Object.keys(DEFAULT_OPTIONS));
    return fetch(`${this.#streamURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.#apiKey}`,
      },
      body: JSON.stringify({ prompt, ...options }),
    }).then((r) => r.json());
  }
};

export default OpenAICompletion;
