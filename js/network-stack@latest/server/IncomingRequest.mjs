// https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/request
import InvertedPromise from "../../invertedpromise@0.0.0/index.mjs";
import InvertedIterator from "../../invertediterator@0.0.0/index.mjs";

const decoder = new TextDecoder();
export default class {
  constructor(connection) {
    this.stage = 0;
    this.chunk = new Uint8ClampedArray(1);
    this.init(connection);

    const { promise: methodReadyPromise, resolve: methodReadyResolve } =
      InvertedPromise();
    this.methodReady = methodReadyPromise;
    this.methodReadyResolve = methodReadyResolve;

    const { promise: pathReadyPromise, resolve: pathReadyResolve } =
      InvertedPromise();
    this.pathReady = pathReadyPromise;
    this.pathReadyResolve = pathReadyResolve;

    const { promise: versionReadyPromise, resolve: versionReadyResolve } =
      InvertedPromise();
    this.versionReady = versionReadyPromise;
    this.versionReadyResolve = versionReadyResolve;

    const { promise: headersReadyPromise, resolve: headersReadyResolve } =
      InvertedPromise();
    this.headersReady = headersReadyPromise;
    this.headersReadyResolve = headersReadyResolve;

    const {
      promise: headerIteratorReadyPromise,
      resolve: headerIteratorReadyResolve,
    } = InvertedPromise();
    this.headerIteratorReady = headerIteratorReadyPromise;
    this.headerIteratorReadyResolve = headerIteratorReadyResolve;

    const { promise: bodyStartedPromise, resolve: bodyStartedResolve } =
      InvertedPromise();
    this.bodyStarted = bodyStartedPromise;
    this.bodyStartedResolve = bodyStartedResolve;

    this._headers = new Headers();
  }
  async init(connection, timeout = 100, highWaterMark = 1024) {
    const chars = [];
    const headersIteratorController = InvertedIterator();
    while (true) {
      const { promise: timeoutPromise, resolve: timeoutPromiseResolve } =
        InvertedPromise();
      setTimeout(timeoutPromiseResolve, timeout, null);
      const count = await Promise.race([
        timeoutPromise,
        connection.read(this.chunk),
      ]);
      if (!count) {
        break;
      } else {
        const char = decoder.decode(this.chunk);
        if (this.stage < 3) {
          if (
            char === " " ||
            (chars[chars.length - 1] === "\r" && char === "\n")
          ) {
            switch (this.stage) {
              case 0:
                this.methodReadyResolve(chars.join(""));
                break;
              case 1:
                this.pathReadyResolve(chars.join(""));
                break;
              case 2:
                chars.pop(); //remove '\r'
                this.versionReadyResolve(chars.join(""));
                this.headerIteratorReadyResolve(
                  headersIteratorController.iterator
                );
                break;
            }
            while (chars.length) {
              chars.pop();
            }
            this.stage++;
          } else {
            chars.push(char);
          }
        } else if (this.stage === 3) {
          if (chars[chars.length - 1] === "\r" && char === "\n") {
            chars.pop();
            if (chars.length) {
              const [key_, value_] = chars.join("").split(":");
              const key = key_.trim().toLowerCase();
              const value = value_.trim();
              this._headers.append(key, value);
              headersIteratorController.resolve([key, value.trim()]);
              while (chars.length) {
                chars.pop();
              }
            } else {
              headersIteratorController.end();
              this.headersReadyResolve(this._headers);
              this.stage++;
              break;
            }
          } else {
            chars.push(char);
          }
        }
      }
    }
    let totalRead = 0;
    const max = this.headers.has("content-length")
      ? Number(this.headers.get("content-length"))
      : undefined;
    const pull = Number.isInteger(max)
      ? async (controller) => {
          // Read set content length
          const { desiredSize } = controller;
          const chunk = new Uint8ClampedArray(desiredSize);
          const count = await connection.read(chunk);
          if (count) {
            totalRead += count;
            controller.enqueue(chunk.subarray(0, count));
            if (totalRead === max) {
              controller.close();
              this._bodyUsed = true; // TODO: Should this be set before the final read?
            }
          }
        }
      : async (controller) => {
          //Read chunked
          let desiredSize;
          if (desiredSize !== undefined) {
            //reading number
            const count = await connection.read(this.chunk);
            if (!count) {
              return;
            } else {
              const char = decoder.decode(this.chunk);
              if (chars[chars.length - 1] === "\r" && char === "\n") {
                chars.pop();
                desiredSize = parseInt(char.join(""), 16);
                while (chars.length) {
                  chars.pop();
                }
              } else {
                chars.push(char);
              }
            }
          } else {
            //reading and enqueing data
            const chunk = new Uint8ClampedArray(desiredSize + 2);
            const count = await connection.read(chunk);
            if (!count) {
              return;
            } else {
              controller.enqueue(chunk.subarray(0, desiredSize));
              if (desiredSize === 0) {
                controller.close();
                this._bodyUsed = true;
              }
              desiredSize = undefined;
            }
          }
        };

    // https://streams.spec.whatwg.org/#qs

    this._body = new ReadableStream(
      { pull },
      new ByteLengthQueuingStrategy({ highWaterMark })
    );
    this.bodyStartedResolve(this._body);
    // Respond
    // connection.close();
  }
  get cache() {}
  get credentials() {}
  get destination() {}
  get headers() {
    return this._headers;
  }
  get integrity() {}
  get method() {}
  get mode() {}
  get redirect() {}
  get referrer() {}

  get referrerPolicy() {}
  get url() {}
  get clone() {}
  // body methods
  get body() {
    return this._body;
  }
  get bodyUsed() {
    return !!this._bodyUsed;
  }
  async typedArray() {
    const array = [];
    const reader = this.body.getReader();
    // let d;
    // do{
    //   const {done, value} = await reader.read();
    //   d = done;
    //   if(!done){
    //     for(const v of value.values()){
    //       array.push(v);
    //     }
    //   }
    // }  while(!d);
    let d;
    while (!d) {
      const { done, value } = await reader.read();
      d = done;
      if (value) {
        for (const v of value.values()) {
          array.push(v);
        }
      }
    }
    queueMicrotask(() => (this._bodyUsed = true));
    return new Uint8ClampedArray(array);
  }
  async arrayBuffer() {
    return (await this.typedArray()).buffer;
  }
  async blob() {
    return new Blob(await this.typedArray());
  }
  async formData() {
    const text = decoder.decode(await this.typedArray());
    const params = new URLSearchParams(text);
    const data = new FormData();
    for (const [key, value] of params.entries()) {
      data.append(key, value);
    }
    return data;
  }
  async json() {
    return JSON.parse(decoder.decode(await this.typedArray()));
  }
  async text() {
    return decoder.decode(await this.typedArray());
  }
}
