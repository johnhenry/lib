import {
  AsyncChannel,
  CHANNEL_END,
  teeAsync,
  transduceSync,
  transduceAsync,
  concatSync,
  concatAsync,
  conjoinSync,
  conjoinAsync,
  reduceSync,
  zipSync,
  pause,
  run,
  HAULT,
  emptySync,
  number,
  transducers,
  channelDecorators,
} from "./index.mjs";

const { map, filter, take, group, accumulate } = transducers;
const { iterateSync, iterateAsync } = number;

describe("number iterators", () => {
  it("iterateSync generates a bounded sequence", () => {
    expect([...iterateSync(3)]).toEqual([1, 2, 3]);
    expect([...iterateSync(2, 5)]).toEqual([3, 4, 5]);
  });
  it("iterateAsync generates the same sequence asynchronously", async () => {
    const out = [];
    for await (const n of iterateAsync(3)) {
      out.push(n);
    }
    expect(out).toEqual([1, 2, 3]);
  });
});

describe("iterator tools", () => {
  it("concatSync concatenates iterables", () => {
    expect([...concatSync([1, 2], [3], "ab")]).toEqual([1, 2, 3, "a", "b"]);
  });
  it("concatAsync concatenates iterables asynchronously", async () => {
    const out = [];
    for await (const item of concatAsync([1, 2], [3])) {
      out.push(item);
    }
    expect(out).toEqual([1, 2, 3]);
  });
  it("conjoinSync/conjoinAsync append items to an iterator", async () => {
    expect([...conjoinSync([1], 2, 3)]).toEqual([1, 2, 3]);
    const out = [];
    for await (const item of conjoinAsync([1], 2, 3)) {
      out.push(item);
    }
    expect(out).toEqual([1, 2, 3]);
  });
  it("emptySync yields nothing", () => {
    expect([...emptySync]).toEqual([]);
  });
  it("reduceSync reduces into an iterator and honors HAULT", () => {
    expect([...reduceSync([1, 2, 3], (init, item) => [item * 2], [])]).toEqual(
      [2, 4, 6]
    );
    expect([
      ...reduceSync([1, 2, 3], (init, item) => (item > 1 ? HAULT : [item]), []),
    ]).toEqual([1]);
  });
  it("zipSync zips iterators, stopping at the shortest", () => {
    expect([...zipSync(iterateSync(3), "ab")]).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });
  it("pause resolves with the given value", async () => {
    expect(await pause(1, "value")).toBe("value");
  });
  it("run drains an iterator through a render function", async () => {
    const out = [];
    await run(iterateSync(3), (n) => out.push(n));
    expect(out).toEqual([1, 2, 3]);
  });
});

describe("transducers", () => {
  const LIMIT = 4;
  it("transduceSync filters, maps, and takes in one pass", () => {
    const transform = transduceSync(
      filter((x) => x % 2),
      map((x) => x + 1),
      take(LIMIT)
    );
    expect([...transform(iterateSync(Infinity))]).toEqual([2, 4, 6, 8]);
  });
  it("transduceAsync filters, maps, and takes in one pass", async () => {
    const transform = transduceAsync(
      filter((x) => x % 2),
      map((x) => x + 1),
      take(LIMIT)
    );
    const out = [];
    for await (const result of transform(iterateAsync(Infinity))) {
      out.push(result);
    }
    expect(out).toEqual([2, 4, 6, 8]);
  });
  it("group partitions items by quantity", () => {
    const transform = transduceSync(take(4), group(2));
    expect([...transform(iterateSync(Infinity))]).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
  it("accumulate emits running results", () => {
    const transform = transduceSync(take(4), accumulate());
    expect([...transform(iterateSync(Infinity))]).toEqual([1, 3, 6, 10]);
  });
});

describe("AsyncChannel", () => {
  it("iterates values put onto it until break()", async () => {
    const channel = new AsyncChannel();
    await channel.put("hello");
    await channel.put("world");
    await channel.break();
    const out = [];
    for await (const item of channel) {
      out.push(item);
    }
    expect(out).toEqual(["hello", "world"]);
  });
  it("take resolves a pending value put later", async () => {
    const channel = new AsyncChannel();
    const taken = channel.take();
    expect(channel.pending()).toBe(true);
    await channel.put(42);
    expect(await taken).toBe(42);
  });
  it("enforces its cache limit and applies transform", async () => {
    const channel = new AsyncChannel({ limit: 1, transform: (x) => x * 2 });
    await channel.put(1);
    await expect(channel.put(2)).rejects.toThrow("cache full");
    expect(await channel.take()).toBe(2);
  });
  it("exposes CHANNEL_END and a descriptive toString", async () => {
    const channel = new AsyncChannel();
    await channel.break();
    expect(await channel.take()).toBe(CHANNEL_END);
    expect(String(new AsyncChannel())).toContain("AsyncChannel");
  });
});

describe("teeAsync", () => {
  it("splits an async iterator into n channels", async () => {
    const [a, b] = teeAsync(2)(iterateAsync(3));
    // The pump starts on a timer; wait for it to drain into the channels.
    await pause(20);
    expect([await a.take(), await a.take(), await a.take()]).toEqual([1, 2, 3]);
    expect([await b.take(), await b.take(), await b.take()]).toEqual([1, 2, 3]);
  });
});

describe("channelDecorators", () => {
  it("withEmitter pipes emitter events into a channel", async () => {
    const listeners = {};
    const emitter = {
      addListener: (name, handler) => {
        listeners[name] = handler;
      },
    };
    const channel = channelDecorators.withEmitter(new AsyncChannel(), emitter);
    await listeners.data("payload");
    await listeners.end();
    const out = [];
    for await (const item of channel) {
      out.push(item);
    }
    expect(out).toEqual(["payload"]);
  });
  it("withWebSocket wires websocket callbacks to a channel", async () => {
    const websocket = {};
    const channel = channelDecorators.withWebSocket(
      new AsyncChannel(),
      websocket
    );
    await websocket.onmessage("message");
    await websocket.onclose();
    const out = [];
    for await (const item of channel) {
      out.push(item);
    }
    expect(out).toEqual(["message"]);
  });
});
