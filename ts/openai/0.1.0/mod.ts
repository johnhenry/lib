/**
 * openai — a minimal, dependency-free OpenAI API client for Deno.
 *
 * Targets the current OpenAI REST API:
 *   - POST /v1/chat/completions (messages array, optional SSE streaming)
 *   - POST /v1/responses (the newer Responses API)
 *   - GET  /v1/models
 *
 * Everything is plain `fetch`; the fetch implementation is injectable so the
 * request-building and response-parsing logic is testable without a network.
 */

export const DEFAULT_BASE_URL = "https://api.openai.com/v1";
export const DEFAULT_MODEL = "gpt-4o-mini";

export type Role = "system" | "developer" | "user" | "assistant" | "tool";

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface ChatOptions {
  /** Model id, e.g. "gpt-4o-mini". Defaults to {@linkcode DEFAULT_MODEL}. */
  model?: string;
  /** Upper bound on generated tokens (sent as `max_completion_tokens`). */
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  /** Number of choices to generate. */
  n?: number;
  /** Up to 4 stop sequences. */
  stop?: string | string[];
  presencePenalty?: number;
  frequencyPenalty?: number;
  /** Optional system/developer instruction prepended to the messages. */
  system?: string;
}

export interface ChatChoice {
  index: number;
  message: { role: string; content: string | null };
  finish_reason: string | null;
}

export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface Model {
  id: string;
  object: string;
  created?: number;
  owned_by?: string;
}

export interface ClientOptions {
  /** OpenAI API key (typically from the OPENAI_API_KEY environment variable). */
  apiKey: string;
  /** Override the API root; defaults to {@linkcode DEFAULT_BASE_URL}. */
  baseUrl?: string;
  /** Injectable fetch implementation (used by tests; defaults to global fetch). */
  fetch?: typeof fetch;
}

/** Error thrown for non-2xx API responses. */
export class OpenAIError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`OpenAI API error ${status}: ${body}`);
    this.name = "OpenAIError";
    this.status = status;
    this.body = body;
  }
}

/** Normalize a prompt string (or ready-made message array) into messages. */
export const toMessages = (
  input: string | ChatMessage[],
  system?: string,
): ChatMessage[] => {
  const messages: ChatMessage[] = typeof input === "string"
    ? [{ role: "user", content: input }]
    : [...input];
  if (system) {
    messages.unshift({ role: "system", content: system });
  }
  return messages;
};

/** Build the JSON body for POST /v1/chat/completions. */
export const buildChatBody = (
  input: string | ChatMessage[],
  options: ChatOptions = {},
  stream = false,
): Record<string, unknown> => {
  const body: Record<string, unknown> = {
    model: options.model ?? DEFAULT_MODEL,
    messages: toMessages(input, options.system),
  };
  if (options.maxTokens !== undefined) {
    body.max_completion_tokens = options.maxTokens;
  }
  if (options.temperature !== undefined) body.temperature = options.temperature;
  if (options.topP !== undefined) body.top_p = options.topP;
  if (options.n !== undefined) body.n = options.n;
  if (options.stop !== undefined) body.stop = options.stop;
  if (options.presencePenalty !== undefined) {
    body.presence_penalty = options.presencePenalty;
  }
  if (options.frequencyPenalty !== undefined) {
    body.frequency_penalty = options.frequencyPenalty;
  }
  if (stream) body.stream = true;
  return body;
};

/** Build a fetch Request for an API call. */
export const buildRequest = (
  path: string,
  apiKey: string,
  body?: unknown,
  baseUrl: string = DEFAULT_BASE_URL,
): Request =>
  new Request(`${baseUrl.replace(/\/+$/, "")}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

/** Extract the text of the first choice of a chat completion. */
export const completionText = (completion: ChatCompletion): string =>
  completion.choices?.[0]?.message?.content ?? "";

/**
 * Parse a server-sent-events byte stream, yielding each `data:` payload
 * (as a string) until the stream ends or an "[DONE]" sentinel is seen.
 */
export async function* sseData(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<string> {
  const decoder = new TextDecoder();
  let buffer = "";
  for await (const chunk of stream) {
    buffer += decoder.decode(chunk, { stream: true });
    let index: number;
    while ((index = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, index).replace(/\r$/, "");
      buffer = buffer.slice(index + 1);
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") return;
      if (data) yield data;
    }
  }
}

/**
 * Turn a chat-completions SSE byte stream into a stream of content deltas
 * (the incremental text of the first choice).
 */
export async function* chatStreamText(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<string> {
  for await (const data of sseData(stream)) {
    const parsed = JSON.parse(data) as {
      choices?: { delta?: { content?: string | null } }[];
    };
    const delta = parsed.choices?.[0]?.delta?.content;
    if (delta) yield delta;
  }
}

/** Minimal OpenAI API client. */
export class OpenAI {
  #apiKey: string;
  #baseUrl: string;
  #fetch: typeof fetch;

  constructor({ apiKey, baseUrl = DEFAULT_BASE_URL, fetch: fetchImpl }: ClientOptions) {
    if (!apiKey) {
      throw new Error("apiKey is required (set OPENAI_API_KEY)");
    }
    this.#apiKey = apiKey;
    this.#baseUrl = baseUrl;
    this.#fetch = fetchImpl ?? fetch;
  }

  async #call(path: string, body?: unknown): Promise<Response> {
    const response = await this.#fetch(
      buildRequest(path, this.#apiKey, body, this.#baseUrl),
    );
    if (!response.ok) {
      throw new OpenAIError(response.status, await response.text());
    }
    return response;
  }

  /** Create a chat completion. Accepts a prompt string or a messages array. */
  async chat(
    input: string | ChatMessage[],
    options: ChatOptions = {},
  ): Promise<ChatCompletion> {
    const response = await this.#call(
      "/chat/completions",
      buildChatBody(input, options),
    );
    return await response.json() as ChatCompletion;
  }

  /** Create a streaming chat completion; yields text deltas as they arrive. */
  async *chatStream(
    input: string | ChatMessage[],
    options: ChatOptions = {},
  ): AsyncGenerator<string> {
    const response = await this.#call(
      "/chat/completions",
      buildChatBody(input, options, true),
    );
    if (!response.body) {
      throw new Error("response has no body");
    }
    yield* chatStreamText(response.body);
  }

  /** Call the Responses API (POST /v1/responses); returns the raw response object. */
  async respond(
    input: string,
    options: { model?: string; instructions?: string } = {},
  ): Promise<Record<string, unknown>> {
    const response = await this.#call("/responses", {
      model: options.model ?? DEFAULT_MODEL,
      input,
      ...(options.instructions ? { instructions: options.instructions } : {}),
    });
    return await response.json() as Record<string, unknown>;
  }

  /** List available models (GET /v1/models). */
  async models(): Promise<Model[]> {
    const response = await this.#call("/models");
    const { data } = await response.json() as { data: Model[] };
    return data;
  }
}

export default OpenAI;
