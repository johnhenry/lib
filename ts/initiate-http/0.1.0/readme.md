# initiate-http

Serve HTTP in [Deno](https://deno.com) using service-worker-style global
`fetch` events. Calling the default export starts a server (via
`Deno.serve`); each incoming request is dispatched on `globalThis` as a
`FetchEvent`, and listeners reply with `event.respondWith(response)` — the
same shape as the service worker and Cloudflare Workers APIs.

Version [0.0.0](../0.0.0/mod.ts) used the long-removed `Deno.serveHttp`
connection API; 0.1.0 is a rewrite on modern `Deno.serve`.

## usage

```javascript
import initiateHTTP, {
  FetchEvent,
} from "https://johnhenry.github.io/lib/ts/initiate-http/0.1.0/mod.ts";

initiateHTTP(8080);

addEventListener("fetch", (event) => {
  event.respondWith(new Response("hidey how?", { status: 200 }));
});
```

Run the included demo:

```sh
deno run --allow-net https://johnhenry.github.io/lib/ts/initiate-http/0.1.0/demo.ts
```

Requests are answered with `501 Not Implemented` when no listener responds.
`dispatchFetchEvent(request, target?)` is also exported for dispatching
against a custom `EventTarget` (useful for testing).

## testing

Tests exercise the event dispatch directly — no network access needed:

```sh
deno task test
```
