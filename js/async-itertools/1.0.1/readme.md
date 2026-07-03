# Async-Itertools

> **Source of truth:** development happens at
> [github.com/johnhenry/async-itertools](https://github.com/johnhenry/async-itertools).
> This directory is a snapshot published here for the CDN import URL and
> npm release; it will not track every upstream commit.

A collection of asynchronous (and synchronous) iterator building blocks
inspired by constructs from
[Python](https://docs.python.org/3/library/itertools.html), APL, Haskell,
and SML — recast in a form suitable for JavaScript. Together they form an
"iterator algebra" for constructing specialized, memory-efficient data
pipelines in pure JavaScript with zero dependencies.

## Import Syntax

Import directly from this site:

```javascript
import {
  transduceAsync,
  transducers,
  count,
} from "https://johnhenry.github.io/lib/js/async-itertools/1.0.1/index.mjs";
```

or install via npm (`npm install async-itertools`) and import by name:

```javascript
import { transduceAsync, transducers, count } from "async-itertools";
```

## Usage

### Transducers

Compose `map`, `filter`, `take`, `reject`, `group`, and `accumulate` into a
single pass over any (a)synchronous iterable with `transduceSync` /
`transduceAsync`:

```javascript
import { transduceAsync, transducers, count } from "async-itertools";
const { map, filter, take } = transducers;

const transform = transduceAsync(
  filter((x) => x % 2),
  map((x) => x + 1),
  take(4)
);
for await (const result of transform(count.countAsync(1, Infinity))) {
  console.log(result); // 2, 4, 6, 8
}
```

### Asynchronous Channels

`AsyncChannel` is an async-iterable queue: `put` values on one side, `take`
(or `for await`) them off the other. `break()` ends iteration; the
`CHANNEL_END` sentinel marks the end of a channel.

```javascript
import { AsyncChannel } from "async-itertools";

const channel = new AsyncChannel();
(async () => {
  for await (const item of channel) {
    console.log(item);
  }
})();
await channel.put("hello");
await channel.put("world");
await channel.break();
```

`channelDecorators` connects channels to event emitters (`withEmitter`) and
websockets (`withWebSocket`).

### Tee

`teeSync(n)` / `teeAsync(n)` split one iterator into `n` independent
iterators, each seeing every value:

```javascript
import { teeAsync, count } from "async-itertools";

const [evens, all] = teeAsync(2)(count.countAsync(1, 5));
```

### Exhaust

`exhaust` drains any iterator (sync or async — dispatching on which) into
an array; `exhaustSync` / `exhaustAsync` do so for a known kind.
`isIterator` / `isAsyncIterator` / `exhaustable` identify what you're
holding:

```javascript
import { exhaust, isIterator } from "async-itertools";

isIterator([1, 2, 3]); // true
exhaust([1, 2, 3][Symbol.iterator]()); // [1, 2, 3]
```

### Iterator Tools

`iterator-tools.mjs` provides the primitives: `concatSync` / `concatAsync`,
`conjoinSync` / `conjoinAsync` (append items), `reduceSync` / `reduceAsync`,
`zipSync`, `pause` (promise-based sleep), `run` (drain an iterator as a
program), `syncFrom` / `asyncFrom` (yield a fixed list of arguments), and the
`HAULT` sentinel used by halting transducers such as `take`. `emptySync` /
`emptyAsync` are "the" empty iterators, and `count.countSync` /
`count.countAsync` (plus BigInt variants `count.countBigSync` /
`count.countBigAsync`) generate inclusive-bounds numeric sequences.

```javascript
import { zipSync, count } from "async-itertools";

for (const pair of zipSync(count.countSync(1, 3), "abc")) {
  console.log(pair); // [1, "a"], [2, "b"], [3, "c"]
}
```

## Demonstration

See this module's test suite,
[async-itertools.jest.test.mjs](./async-itertools.jest.test.mjs), for
working examples of every export.
