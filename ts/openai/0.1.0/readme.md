# openai

A minimal, dependency-free [OpenAI](https://openai.com/) API client and
command line tool for [Deno](https://deno.com). It targets the current
OpenAI REST API: chat completions (`POST /v1/chat/completions`, with
optional streaming), the Responses API (`POST /v1/responses`), and model
listing (`GET /v1/models`).

> **Note:** version [0.0.0](../0.0.0/readme.md) of this module targeted the
> retired engines/completions API (`/v1/engines/*/completions`) and is
> deprecated; it no longer works against the live OpenAI API. Use 0.1.0.

## usage

### as a module

```javascript
import OpenAI, {
  completionText,
} from "https://johnhenry.github.io/lib/ts/openai/0.1.0/mod.ts";

const client = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

// Chat completion
const completion = await client.chat("Say hello in one word.");
console.log(completionText(completion));

// Streaming
for await (const delta of client.chatStream("Tell me a short story.")) {
  Deno.stdout.write(new TextEncoder().encode(delta));
}

// Responses API
const response = await client.respond("Say hello in one word.");

// List models
const models = await client.models();
```

### as a command line tool

The API key is read from the `OPENAI_API_KEY` environment variable
(or the `--key` flag).

```sh
deno run --allow-net --allow-env \
  https://johnhenry.github.io/lib/ts/openai/0.1.0/cli.ts \
  chat "Say hello in one word."
```

```sh
deno run --allow-net --allow-env \
  https://johnhenry.github.io/lib/ts/openai/0.1.0/cli.ts \
  models
```

Or install it:

```sh
deno install --global --name=openai --allow-net --allow-env \
  https://johnhenry.github.io/lib/ts/openai/0.1.0/cli.ts
openai chat "Say hello in one word." --model=gpt-4o-mini
```

Flags for `chat`: `--model`, `--system`, `--temperature`, `--max-tokens`,
`--no-stream`, `--key`. Pass `-` (or pipe with no prompt) to read the
prompt from stdin.

## testing

Tests are pure unit tests (no network, no environment variables needed):

```sh
deno task test
```
