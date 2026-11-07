import { Request } from "../server/index.mjs";
const encoder = new TextEncoder();

export default class extends Event {
  constructor(connection, eventInit) {
    super("fetch", eventInit);
    this.__connection = connection;
    this.__request = new Request(connection);
  }
  get clientId() {
    throw new Error("clientId not implementd");
  }
  get preloadResponse() {
    throw new Error("preloadResponse not implementd");
  }
  get replacesClientId() {
    throw new Error("replacesClientId not implementd");
  }
  get resultingClientId() {
    throw new Error("replacesClientId not implementd");
  }
  get request() {
    return this.__request;
  }
  async respondWith(res) {
    const response = await res;

    const connection = this.__connection;
    console.log(1);
    connection.write(encoder.encode((await response.versionReady) + " "));
    console.log(2, await response.versionReady);
    connection.write(encoder.encode(String(await response.statusReady) + " "));
    console.log(3, await response.statusReady);
    connection.write(encoder.encode((await response.statusTextReady) + "\r\n"));
    console.log(4, await response.statusTextReady);
    console.log("C");
    for await (const header of await response.headersIteratorReady) {
      console.log({ header });
      connection.write(encoder.encode(header.join(":") + "\r\n"));
    }
    // connection.write(encoder.encode('\r\n'));
    connection.write(encoder.encode("\r\n"));
    console.log(5, await response.headersIteratorReady);

    for await (const chunk of await response.bodyIteratorReady) {
      connection.write(encoder.encode(chunk));
    }
    console.log(6);

    connection.close();
  }
  async waitUntil() {}
}
