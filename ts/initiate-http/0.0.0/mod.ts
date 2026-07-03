export class FetchEvent extends Event {
  #connection?: any;
  constructor(connection: any) {
    super("fetch");
    this.#connection = connection;
  }
  respondWith(...args: any[]) {
    this.#connection.respondWith(...args);
  }
  get connection() {
    return this.#connection;
  }
  get request() {
    return this.#connection.request;
  }
}
const serveHttp = async (conn: Deno.Conn) => {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const connection of httpConn) {
    globalThis.dispatchEvent(new FetchEvent(connection));
  }
};
export default async (port = 8080) => {
  // Connections to the server will be yielded up as an async iterable.
  for await (const conn of Deno.listen({ port })) {
    // In order to not be blocking, we need to handle each connection individually
    // without awaiting the function
    serveHttp(conn);
  }
};
