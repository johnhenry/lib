/**
 * Unit tests for initiate-http. The event dispatch mechanism is tested
 * directly — no server is started and no network access is needed.
 */
import { dispatchFetchEvent, FetchEvent } from "./mod.ts";

const assert = (condition: boolean, message: string) => {
  if (!condition) throw new Error(`assertion failed: ${message}`);
};
const assertEquals = (actual: unknown, expected: unknown) => {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`expected ${e}, got ${a}`);
};

Deno.test("FetchEvent exposes its request", () => {
  const request = new Request("http://localhost/hello");
  const event = new FetchEvent(request, () => {});
  assertEquals(event.type, "fetch");
  assert(event.request === request, "request should round-trip");
  assertEquals(event.responded, false);
});

Deno.test("respondWith resolves the dispatched request", async () => {
  const target = new EventTarget();
  target.addEventListener("fetch", (event) => {
    const fetchEvent = event as FetchEvent;
    fetchEvent.respondWith(
      new Response(`hello ${new URL(fetchEvent.request.url).pathname}`, {
        status: 200,
      }),
    );
  });
  const response = await dispatchFetchEvent(
    new Request("http://localhost/world"),
    target,
  );
  assertEquals(response.status, 200);
  assertEquals(await response.text(), "hello /world");
});

Deno.test("respondWith accepts a promise of a response", async () => {
  const target = new EventTarget();
  target.addEventListener("fetch", (event) => {
    (event as FetchEvent).respondWith(
      Promise.resolve(new Response("async", { status: 201 })),
    );
  });
  const response = await dispatchFetchEvent(
    new Request("http://localhost/"),
    target,
  );
  assertEquals(response.status, 201);
  assertEquals(await response.text(), "async");
});

Deno.test("unhandled events resolve with a 501 response", async () => {
  const response = await dispatchFetchEvent(
    new Request("http://localhost/nobody-home"),
    new EventTarget(),
  );
  assertEquals(response.status, 501);
});

Deno.test("calling respondWith twice throws InvalidStateError", () => {
  const event = new FetchEvent(new Request("http://localhost/"), () => {});
  event.respondWith(new Response("first"));
  let thrown: unknown;
  try {
    event.respondWith(new Response("second"));
  } catch (error) {
    thrown = error;
  }
  assert(thrown instanceof DOMException, "should throw DOMException");
  assertEquals((thrown as DOMException).name, "InvalidStateError");
});
