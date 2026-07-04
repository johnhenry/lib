/**
 * Unit tests for the openai module. No network access: the client is
 * exercised with an injected fake fetch, and stream parsing is fed
 * in-memory ReadableStreams.
 */
import {
  buildChatBody,
  buildRequest,
  chatStreamText,
  completionText,
  DEFAULT_BASE_URL,
  DEFAULT_MODEL,
  OpenAI,
  OpenAIError,
  sseData,
  toMessages,
} from "./mod.ts";
import { parseArgs } from "./cli.ts";

const assert = (condition: boolean, message: string) => {
  if (!condition) throw new Error(`assertion failed: ${message}`);
};
const assertEquals = (actual: unknown, expected: unknown) => {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`expected ${e}, got ${a}`);
};

const bytes = (...parts: string[]): ReadableStream<Uint8Array> => {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const part of parts) controller.enqueue(encoder.encode(part));
      controller.close();
    },
  });
};

Deno.test("toMessages wraps a string prompt as a user message", () => {
  assertEquals(toMessages("hello"), [{ role: "user", content: "hello" }]);
});

Deno.test("toMessages prepends a system instruction", () => {
  assertEquals(toMessages("hi", "be brief"), [
    { role: "system", content: "be brief" },
    { role: "user", content: "hi" },
  ]);
});

Deno.test("toMessages copies an existing messages array", () => {
  const input = [{ role: "user" as const, content: "x" }];
  const output = toMessages(input);
  assertEquals(output, input);
  assert(output !== input, "should be a copy");
});

Deno.test("buildChatBody maps options to API parameter names", () => {
  const body = buildChatBody("hi", {
    model: "gpt-4o",
    maxTokens: 32,
    temperature: 0.5,
    topP: 0.9,
    stop: ["\n"],
    presencePenalty: 0.1,
    frequencyPenalty: 0.2,
  });
  assertEquals(body.model, "gpt-4o");
  assertEquals(body.max_completion_tokens, 32);
  assertEquals(body.temperature, 0.5);
  assertEquals(body.top_p, 0.9);
  assertEquals(body.stop, ["\n"]);
  assertEquals(body.presence_penalty, 0.1);
  assertEquals(body.frequency_penalty, 0.2);
  assert(!("stream" in body), "stream flag should be absent by default");
});

Deno.test("buildChatBody defaults model and omits unset options", () => {
  const body = buildChatBody("hi");
  assertEquals(body.model, DEFAULT_MODEL);
  assertEquals(Object.keys(body).sort(), ["messages", "model"]);
});

Deno.test("buildChatBody sets stream when requested", () => {
  assertEquals(buildChatBody("hi", {}, true).stream, true);
});

Deno.test("buildRequest builds an authorized POST with JSON body", async () => {
  const request = buildRequest("/chat/completions", "sk-test", { a: 1 });
  assertEquals(request.url, `${DEFAULT_BASE_URL}/chat/completions`);
  assertEquals(request.method, "POST");
  assertEquals(request.headers.get("authorization"), "Bearer sk-test");
  assertEquals(request.headers.get("content-type"), "application/json");
  assertEquals(await request.json(), { a: 1 });
});

Deno.test("buildRequest builds a GET when there is no body", () => {
  const request = buildRequest("/models", "sk-test");
  assertEquals(request.method, "GET");
  assertEquals(request.url, `${DEFAULT_BASE_URL}/models`);
});

Deno.test("buildRequest normalizes a trailing slash in baseUrl", () => {
  const request = buildRequest("/models", "k", undefined, "http://x/v1/");
  assertEquals(request.url, "http://x/v1/models");
});

Deno.test("completionText extracts first-choice content", () => {
  const completion = {
    id: "c",
    object: "chat.completion",
    created: 0,
    model: "m",
    choices: [{
      index: 0,
      message: { role: "assistant", content: "hello there" },
      finish_reason: "stop",
    }],
  };
  assertEquals(completionText(completion), "hello there");
});

Deno.test("sseData yields data payloads and stops at [DONE]", async () => {
  const stream = bytes(
    'data: {"a":1}\n\n',
    "data: ",
    '{"b":2}\n\ndata: [DONE]\n\ndata: {"never":true}\n\n',
  );
  const seen: string[] = [];
  for await (const data of sseData(stream)) seen.push(data);
  assertEquals(seen, ['{"a":1}', '{"b":2}']);
});

Deno.test("chatStreamText yields content deltas only", async () => {
  const chunk = (content: string | null) =>
    `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`;
  const stream = bytes(
    chunk("Hel"),
    chunk("lo"),
    `data: ${JSON.stringify({ choices: [{ delta: {} }] })}\n\n`,
    "data: [DONE]\n\n",
  );
  const parts: string[] = [];
  for await (const delta of chatStreamText(stream)) parts.push(delta);
  assertEquals(parts.join(""), "Hello");
});

Deno.test("OpenAI.chat sends the right request via injected fetch", async () => {
  let captured: Request | undefined;
  const fake = ((input: Request | URL | string) => {
    captured = input as Request;
    return Promise.resolve(
      new Response(
        JSON.stringify({
          id: "c",
          object: "chat.completion",
          created: 0,
          model: DEFAULT_MODEL,
          choices: [{
            index: 0,
            message: { role: "assistant", content: "ok" },
            finish_reason: "stop",
          }],
        }),
        { headers: { "Content-Type": "application/json" } },
      ),
    );
  }) as typeof fetch;

  const client = new OpenAI({ apiKey: "sk-test", fetch: fake });
  const completion = await client.chat("ping", { system: "pong" });

  assert(captured !== undefined, "fetch should be called");
  assertEquals(captured!.url, `${DEFAULT_BASE_URL}/chat/completions`);
  assertEquals(captured!.headers.get("authorization"), "Bearer sk-test");
  const body = await captured!.json();
  assertEquals(body.messages, [
    { role: "system", content: "pong" },
    { role: "user", content: "ping" },
  ]);
  assertEquals(completionText(completion), "ok");
});

Deno.test("OpenAI.models unwraps the data array", async () => {
  const fake = (() =>
    Promise.resolve(
      new Response(
        JSON.stringify({ data: [{ id: "gpt-4o", object: "model" }] }),
      ),
    )) as typeof fetch;
  const client = new OpenAI({ apiKey: "k", fetch: fake });
  assertEquals(await client.models(), [{ id: "gpt-4o", object: "model" }]);
});

Deno.test("OpenAI throws OpenAIError on non-2xx responses", async () => {
  const fake = (() =>
    Promise.resolve(
      new Response("nope", { status: 401 }),
    )) as typeof fetch;
  const client = new OpenAI({ apiKey: "bad", fetch: fake });
  let thrown: unknown;
  try {
    await client.chat("hi");
  } catch (error) {
    thrown = error;
  }
  assert(thrown instanceof OpenAIError, "should throw OpenAIError");
  assertEquals((thrown as OpenAIError).status, 401);
});

Deno.test("OpenAI constructor requires an apiKey", () => {
  let thrown = false;
  try {
    new OpenAI({ apiKey: "" });
  } catch {
    thrown = true;
  }
  assert(thrown, "empty apiKey should throw");
});

Deno.test("cli parseArgs handles commands, flags, and values", () => {
  const parsed = parseArgs([
    "chat",
    "say",
    "hello",
    "--model=gpt-4o",
    "--no-stream",
  ]);
  assertEquals(parsed.command, "chat");
  assertEquals(parsed.positional, ["say", "hello"]);
  assertEquals(parsed.flags, { model: "gpt-4o", "no-stream": true });
});
