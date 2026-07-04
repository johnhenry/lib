import FetchEvent from "./FetchEvent.mjs";

export default class extends EventTarget {
  constructor(listener) {
    super();
    this.listener = listener;
    this.start();
  }
  async start() {
    for await (const connection of this.listener) {
      this.dispatchEvent(new FetchEvent(connection));
    }
  }
  close() {
    this.listener.close();
    const closeEvent = new Event("close");
    this.dispatchEvent(closeEvent);
    if (this.onclose) {
      this.onclose(closeEvent);
    }
  }
}
