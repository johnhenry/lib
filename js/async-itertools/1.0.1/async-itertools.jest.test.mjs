import {
  AsyncChannel,
  CHANNEL_END,
  teeSync,
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
  exhaust,
  exhaustSync,
  exhaustAsync,
  isIterator,
  isAsyncIterator,
  exhaustable,
  syncFrom,
  asyncFrom,
  count,
  transducers,
  channelDecorators,
} from "./index.mjs";

const { map, filter, take, reject, group, accumulate } = transducers;
const { countSync, countAsync, countBigSync, countBigAsync } = count;

describe("count iterators", () => {
  it("countSync generates an inclusive-bounds sequence", () => {
    expect([...countSync(3)]).toEqual([0, 1, 2, 3]);
    expect([...countSync(2, 5)]).toEqual([2, 3, 4, 5]);
    expect([...countSync(5, 2)]).toEqual([5, 4, 3, 2]);
  });
  it("countAsync generates the same sequence asynchronously", async () => {
    const out = [];
    for await (const n of countAsync(3)) {
      out.push(n);
    }
    expect(out).toEqual([0, 1, 2, 3]);
  });
  it("countBigSync/countBigAsync generate BigInt sequences", async () => {
    expect([...countBigSync(3n)]).toEqual([0n, 1n, 2n, 3n]);
    const out = [];
    for await (const n of countBigAsync(3n)) {
      out.push(n);
    }
    expect(out).toEqual([0n, 1n, 2n, 3n]);
  });
});

describe("exhaust / isIterator", () => {
  it("isIterator/isAsyncIterator/exhaustable identify iterable kinds", () => {
    expect(isIterator([1, 2, 3])).toBe(true);
    expect(isIterator((async function* () {})())).toBe(false);
    expect(isAsyncIterator((async function* () {})())).toBe(true);
    expect(exhaustable([1, 2, 3])).toBe(true);
    expect(exhaustable({})).toBe(false);
  });
  it("exhaustSync/exhaustAsync drain an iterator into an array", async () => {
    expect(exhaustSync([1, 2, 3][Symbol.iterator]())).toEqual([1, 2, 3]);
    expect(await exhaustAsync(countAsync(3))).toEqual([0, 1, 2, 3]);
  });
  it("exhaust dispatches to sync or async based on the given iterator", async () => {
    expect(exhaust([1, 2, 3][Symbol.iterator]())).toEqual([1, 2, 3]);
    expect(await exhaust(countAsync(2))).toEqual([0, 1, 2]);
    expect(() => exhaust({})).toThrow(TypeError);
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
    expect([...zipSync(countSync(1, 3), "ab")]).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });
  it("pause resolves with the given value", async () => {
    expect(await pause(1, "value")).toBe("value");
  });
  it("run drains an iterator through a render function", async () => {
    const out = [];
    await run(countSync(1, 3), (n) => out.push(n));
    expect(out).toEqual([1, 2, 3]);
  });
  it("syncFrom/asyncFrom yield each given argument in order", async () => {
    expect([...syncFrom(1, 2, 3)]).toEqual([1, 2, 3]);
    const out = [];
    for await (const item of asyncFrom(1, 2, 3)) {
      out.push(item);
    }
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
    expect([...transform(countSync(1, Infinity))]).toEqual([2, 4, 6, 8]);
  });
  it("transduceAsync filters, maps, and takes in one pass", async () => {
    const transform = transduceAsync(
      filter((x) => x % 2),
      map((x) => x + 1),
      take(LIMIT)
    );
    const out = [];
    for await (const result of transform(countAsync(1, Infinity))) {
      out.push(result);
    }
    expect(out).toEqual([2, 4, 6, 8]);
  });
  it("reject discards the first N values before yielding", () => {
    const transform = transduceSync(take(6), reject(2));
    expect([...transform(countSync(1, Infinity))]).toEqual([3, 4, 5, 6]);
  });
  it("group partitions items by quantity", () => {
    const transform = transduceSync(take(4), group(2));
    expect([...transform(countSync(1, Infinity))]).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
  it("accumulate emits running results", () => {
    const transform = transduceSync(take(4), accumulate());
    expect([...transform(countSync(1, Infinity))]).toEqual([1, 3, 6, 10]);
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

describe("teeSync", () => {
  it("splits a sync iterator into n independent iterators", () => {
    const [a, b] = teeSync(2)([1, 2, 3][Symbol.iterator]());
    expect([...a]).toEqual([1, 2, 3]);
    expect([...b]).toEqual([1, 2, 3]);
  });
  it("splits into more than 2 outputs (regression: buffers[1 - i] only ever fed index 1 or 0, so a 3rd+ output silently got nothing)", () => {
    const [a, b, c] = teeSync(3)([1, 2, 3][Symbol.iterator]());
    expect([...a]).toEqual([1, 2, 3]);
    expect([...b]).toEqual([1, 2, 3]);
    expect([...c]).toEqual([1, 2, 3]);
  });
});

describe("teeAsync", () => {
  it("splits an async iterator into n channels", async () => {
    const [a, b] = teeAsync(2)(countAsync(1, 3));
    expect(await exhaustAsync(a)).toEqual([1, 2, 3]);
    expect(await exhaustAsync(b)).toEqual([1, 2, 3]);
  });
  it("splits into more than 2 outputs", async () => {
    const [a, b, c] = teeAsync(3)(countAsync(1, 3));
    expect(await exhaustAsync(a)).toEqual([1, 2, 3]);
    expect(await exhaustAsync(b)).toEqual([1, 2, 3]);
    expect(await exhaustAsync(c)).toEqual([1, 2, 3]);
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
