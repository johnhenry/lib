/**
 * initiate-http — serve HTTP by listening for service-worker-style
 * "fetch" events on globalThis, powered by Deno.serve.
 *
 * The default export starts a server; each incoming request is dispatched
 * as a {@linkcode FetchEvent} whose listener responds via
 * `event.respondWith(response)` — the same shape as the service worker /
 * Cloudflare Workers API.
 */

/** A service-worker-style fetch event carrying a Request. */
export class FetchEvent extends Event {
  #request: Request;
  #respond: (response: Response | Promise<Response>) => void;
  #responded = false;

  constructor(
    request: Request,
    respond: (response: Response | Promise<Response>) => void,
  ) {
    super("fetch");
    this.#request = request;
    this.#respond = respond;
  }

  get request(): Request {
    return this.#request;
  }

  /** Whether respondWith has already been called. */
  get responded(): boolean {
    return this.#responded;
  }

  respondWith(response: Response | Promise<Response>): void {
    if (this.#responded) {
      throw new DOMException(
        "respondWith() has already been called",
        "InvalidStateError",
      );
    }
    this.#responded = true;
    this.#respond(response);
  }
}

/**
 * Dispatch a request as a FetchEvent on a target (globalThis by default)
 * and resolve with the response supplied via respondWith. If no listener
 * responds synchronously, resolves with a 501 response.
 */
export const dispatchFetchEvent = (
  request: Request,
  target: EventTarget = globalThis,
): Promise<Response> =>
  new Promise<Response>((resolve) => {
    const event = new FetchEvent(request, resolve);
    target.dispatchEvent(event);
    if (!event.responded) {
      resolve(new Response("Not Implemented", { status: 501 }));
    }
  });

/**
 * Start an HTTP server that dispatches "fetch" events on globalThis.
 * Returns the underlying Deno.HttpServer (await `.finished`, or call
 * `.shutdown()` to stop).
 */
export default (
  port = 8080,
  options: {
    hostname?: string;
    signal?: AbortSignal;
    onListen?: (localAddr: Deno.NetAddr) => void;
  } = {},
): Deno.HttpServer<Deno.NetAddr> =>
  Deno.serve(
    { port, ...options },
    (request: Request) => dispatchFetchEvent(request),
  );
