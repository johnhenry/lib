/**
 * serverless-workers — mount fetch-style handlers (workers) at URL paths
 * on a small Deno HTTP server.
 *
 * Version 0.0.0 was a design sketch (see ../0.0.0/index.md) for a "worker"
 * tool that mounts fetch/express-style modules on managed servers. 0.1.0
 * implements the core of that idea as a working module: a {@linkcode Server}
 * that routes requests to mounted handlers by longest path prefix, served
 * with modern `Deno.serve`.
 */

/** A web-standard fetch handler, as used by service/Cloudflare workers. */
export type FetchHandler = (
  request: Request,
) => Response | Promise<Response>;

export interface MountOptions {
  /** URL path prefix to mount at (default "/"). */
  path?: string;
}

export interface Mount {
  id: string;
  path: string;
  handler: FetchHandler;
  mountedAt: number;
}

export interface ServerOptions {
  /** Handler used when no mount matches (default: 404 response). */
  notFound?: FetchHandler;
}

const normalizePath = (path: string): string => {
  let normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized.length > 1) normalized = normalized.replace(/\/+$/, "");
  return normalized;
};

const defaultNotFound: FetchHandler = () =>
  new Response("Not Found", { status: 404 });

/** A server that routes requests to mounted worker handlers. */
export class Server {
  #mounts = new Map<string, Mount>();
  #nextId = 0;
  #notFound: FetchHandler;
  #server?: Deno.HttpServer<Deno.NetAddr>;
  #port?: number;
  #startedAt?: number;

  constructor({ notFound = defaultNotFound }: ServerOptions = {}) {
    this.#notFound = notFound;
  }

  /**
   * Mount a fetch handler (or a module specifier whose default export is a
   * fetch handler) at a path prefix. Returns the mount id.
   */
  async mount(
    worker: FetchHandler | string | URL,
    { path = "/" }: MountOptions = {},
  ): Promise<string> {
    let handler: FetchHandler;
    if (typeof worker === "function") {
      handler = worker;
    } else {
      const module = await import(worker.toString());
      if (typeof module.default !== "function") {
        throw new TypeError(
          `module "${worker}" has no default fetch-handler export`,
        );
      }
      handler = module.default as FetchHandler;
    }
    const id = `${this.#nextId++}`;
    this.#mounts.set(id, {
      id,
      path: normalizePath(path),
      handler,
      mountedAt: Date.now(),
    });
    return id;
  }

  /** Remove a mount by id; returns whether it existed. */
  unmount(id: string): boolean {
    return this.#mounts.delete(id);
  }

  /** Current mounts, in mount order. */
  get mounts(): Mount[] {
    return [...this.#mounts.values()];
  }

  /** Port the server is listening on (undefined when stopped). */
  get port(): number | undefined {
    return this.#port;
  }

  /** Milliseconds since start (0 when stopped). */
  get uptime(): number {
    return this.#startedAt === undefined ? 0 : Date.now() - this.#startedAt;
  }

  /**
   * Route a request to the mounted handler with the longest matching path
   * prefix. Usable directly (e.g. in tests, or as a Deno.serve handler)
   * without starting the built-in server.
   */
  handler: FetchHandler = (request) => {
    const { pathname } = new URL(request.url);
    let best: Mount | undefined;
    for (const mount of this.#mounts.values()) {
      const matches = mount.path === "/" ||
        pathname === mount.path ||
        pathname.startsWith(`${mount.path}/`);
      if (matches && (best === undefined || mount.path.length > best.path.length)) {
        best = mount;
      }
    }
    return (best?.handler ?? this.#notFound)(request);
  };

  /** Start serving with Deno.serve. */
  start(
    port = 8080,
    options: { hostname?: string; signal?: AbortSignal } = {},
  ): Deno.HttpServer<Deno.NetAddr> {
    if (this.#server) {
      throw new Error("server is already running");
    }
    this.#server = Deno.serve({ port, ...options }, this.handler);
    this.#port = this.#server.addr.port;
    this.#startedAt = Date.now();
    return this.#server;
  }

  /** Stop the server (no-op when not running). */
  async stop(): Promise<void> {
    if (!this.#server) return;
    await this.#server.shutdown();
    this.#server = undefined;
    this.#port = undefined;
    this.#startedAt = undefined;
  }
}

export default Server;
