# serverless-workers

Mount fetch-style handlers ("workers") at URL paths on a small
[Deno](https://deno.com) HTTP server. Requests are routed to the mounted
handler with the longest matching path prefix and served with `Deno.serve`.

Version [0.0.0](../0.0.0/index.md) was a design sketch for a worker/daemon
CLI that mounts fetch and express-style modules on managed servers; 0.1.0
implements the core of that idea — a `Server` with `mount`/`unmount`,
prefix routing, and `start`/`stop` — as a working module.

## usage

```javascript
import Server from "https://johnhenry.github.io/lib/ts/serverless-workers/0.1.0/mod.ts";

const server = new Server();

// Mount a fetch handler at a path prefix.
await server.mount((request) => new Response("random"), { path: "/random" });

// Or mount a module whose default export is a fetch handler.
await server.mount("./random.fetch.mjs", { path: "/random1" });

server.start(8080);

server.mounts; // [{ id, path, handler, mountedAt }, ...]
server.port; // 8080
server.uptime; // ms since start

await server.stop();
```

Run a file using it:

```sh
deno run --allow-net my-server.ts
```

Unmatched requests get a `404` (customizable via
`new Server({ notFound })`). `server.handler` is a plain
`(request) => Response` function, so it can also be passed straight to
`Deno.serve` or called directly in tests.

## testing

Tests call `server.handler` directly — no network access needed:

```sh
deno task test
```
