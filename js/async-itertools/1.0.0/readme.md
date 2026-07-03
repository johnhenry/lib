# Async-Itertools

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
  number,
} from "https://johnhenry.github.io/lib/js/async-itertools/1.0.0/index.mjs";
```

or install via npm (`npm install async-itertools`) and import by name:

```javascript
import { transduceAsync, transducers, number } from "async-itertools";
```

## Usage

### Transducers

Compose `map`, `filter`, `take`, `group`, and `accumulate` into a single
pass over any (a)synchronous iterable with `transduceSync` /
`transduceAsync`:

```javascript
import { transduceAsync, transducers, number } from "async-itertools";
const { map, filter, take } = transducers;

const transform = transduceAsync(
  filter((x) => x % 2),
  map((x) => x + 1),
  take(4)
);
for await (const result of transform(number.iterateAsync(Infinity))) {
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
websockets (`withWebSocket`); `teeAsync(n)` splits one async iterator into
`n` channels.

### Iterator Tools

`iterator-tools.mjs` provides the primitives: `concatSync` / `concatAsync`,
`conjoinSync` / `conjoinAsync` (append items), `reduceSync` / `reduceAsync`,
`zipSync`, `pause` (promise-based sleep), `run` (drain an iterator as a
program), and the `HAULT` sentinel used by halting transducers such as
`take`. `emptySync` / `emptyAsync` are "the" empty iterators, and
`number.iterateSync` / `number.iterateAsync` generate numeric sequences.

```javascript
import { zipSync, number } from "async-itertools";

for (const pair of zipSync(number.iterateSync(3), "abc")) {
  console.log(pair); // [1, "a"], [2, "b"], [3, "c"]
}
```

## Documentation

Extended tutorials, how-to guides, and discussion live in the
[0.0.0 docs](../0.0.0/docs/readme.md); the API is unchanged in 1.0.0.

## Demonstration

See this module's test suite,
[async-itertools.jest.test.mjs](./async-itertools.jest.test.mjs), for
working examples of every export.
