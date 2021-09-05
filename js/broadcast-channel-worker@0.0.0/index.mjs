const DEFAULT_CHANNEL_NAME = "default";

export default class extends EventTarget {
  #id;
  #channel;
  #peers = new Set();
  #onmessage = (message, from, to) => {};
  #errorBound;
  constructor(options = {}, channel = DEFAULT_CHANNEL_NAME) {
    super();
    this.#id =
      typeof options.id === "number"
        ? options.id
        : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.onmessage = options.onmessage;
    this.#peers;
    this.#channel =
      typeof channel === "string" ? new BroadcastChannel(channel) : channel;
    this.#channel;
    this.#channel.onmessage = ({ data }) => {
      if (!data || typeof data !== "object") {
        return;
      }
      const { from, to, message, leave, ping, ack, newId } = data;
      if (!this.#peers.has(from)) {
        this.dispatchEvent(new CustomEvent("join", { detail: from }));
      }
      this.#peers.add(from);
      if (leave) {
        if (this.#peers.has(from)) {
          this.dispatchEvent(new CustomEvent("leave", { detail: from }));
        }
        this.#peers.delete(from);
        if (typeof newId === "number") {
          if (!this.#peers.has(newId)) {
            this.dispatchEvent(new CustomEvent("join", { detail: newId }));
          }
          this.#peers.add(newId);
        }
        return;
      }
      if (ping) {
        // this is a ping
        this.dispatchEvent(new CustomEvent("ping", { detail: from }));
        if (!to || to === this.#id) {
          // send acknowledgement if ping was not directed or for me
          return this.#channel.postMessage({ from: this.#id, ack: true });
        } else {
          return;
        }
      }
      if (ack) {
        // this is an acknowledgment to a ping.
        this.dispatchEvent(new CustomEvent("ack", { detail: from }));
        return;
      }
      if (!to || to === this.#id) {
        this.dispatchEvent(
          new CustomEvent("message", { detail: { message, from, to } })
        );
        this.#onmessage(message, from, to);
      }
    };
    this.#errorBound = this.errorEvent.bind(this);
    this.#channel.addEventListener("messageerror", this.#errorBound);
    globalThis.addEventListener("beforeunload", () => {
      this.leave();
    });
    if (options.announce) {
      this.ping();
    }
  }
  errorEvent(event) {
    this.dispatchEvent(event);
  }
  close(leave = true) {
    if (leave) {
      this.leave();
    }
    this.#channel.removeEventListener("messageerror", this.#errorBound);
    this.#channel.close();
  }
  set onmessage(func) {
    if (typeof func === "function") {
      this.#onmessage = func;
    }
  }
  get onmessage() {
    return this.#onmessage;
  }
  set onmessageerror(func) {
    if (typeof func === "function") {
      this.#channel.onmessageerror = func;
    }
  }
  get onmessageerror() {
    return this.#channel.onmessageerror;
  }
  get channel() {
    return this.#channel;
  }
  get id() {
    return this.#id;
  }
  get peers() {
    return this.#peers;
  }
  postMessage(message = "", to = undefined) {
    this.#channel.postMessage({ from: this.#id, to, message });
  }
  ping(to = undefined) {
    this.#channel.postMessage({ from: this.#id, to, ping: true });
  }
  leave() {
    this.#channel.postMessage({ from: this.#id, leave: true });
  }
  update(newId = undefined) {
    if (typeof newId !== "number") {
      throw new Error("new id must be number");
    }
    this.id = newId;
    this.#channel.postMessage({ from: this.#id, leave: true, newId });
  }
}
