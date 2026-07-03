# Pop-Quiz

> **Source of truth:** development happens at
> [github.com/johnhenry/pop-quiz](https://github.com/johnhenry/pop-quiz).
> This directory is a snapshot published here for the CDN import URL and
> npm release; it will not track every upstream commit.

A context-independent, zero-dependency testing framework inspired by
[tape](https://github.com/substack/tape). Tests run in the same context as
your application — Node, Deno, or the browser — with no binaries or
transformations, and report using the
[Test Anything Protocol](https://testanything.org/).

## Import Syntax

Import directly from this site:

```javascript
import quiz, {
  ok,
  equal,
} from "https://johnhenry.github.io/lib/js/pop-quiz/1.0.1/index.mjs";
```

or install via npm (`npm install pop-quiz`) and import by name:

```javascript
import quiz, { ok, equal } from "pop-quiz";
```

## Usage

The default export — the "quiz" function — runs a group of assertions.
It takes a title and a (possibly asynchronous) generator, called a "test".
Assertion results are yielded from within the body of the test.

```javascript
import quiz, { ok, notok, equal, deepequal } from "pop-quiz";

await quiz("basic arithmetic", function* () {
  yield ok(1 + 1, "sums should be truthy");
  yield notok(1 - 1, "differences should be falsy");
  yield equal(2 + 2, 4);
  yield deepequal({ a: 1, b: 2 }, { b: 2, a: 1 });
});
```

The title may be omitted; passing just a test works too:

```javascript
await quiz(function* () {
  yield ok(true);
});
```

### Included Assertions

Each assertion returns its message on success and a `TestError` on failure.

| assertion                                | passes when                            |
| ---------------------------------------- | -------------------------------------- |
| `pass(message?)`                          | always                                 |
| `fail(message?)`                          | never                                  |
| `ok(actual, message?)`                    | `actual` is truthy                     |
| `notok(actual, message?)`                 | `actual` is falsy                      |
| `equal(actual, expected, message?)`       | `actual === expected`                  |
| `notequal(actual, unexpected, message?)`  | `actual !== unexpected`                |
| `deepequal(actual, expected, message?)`   | `actual` deeply equals `expected`      |
| `throws(fn, message?)`                    | calling (and awaiting) `fn` throws     |
| `doesnotthrow(fn, message?)`              | calling (and awaiting) `fn` succeeds   |
| `subtestpass(test, message?)`             | every assertion in `test` passes       |
| `subtestfail(test, message?)`             | every assertion in `test` fails        |

Writing your own assertion is easy: return a message on success and a
`TestError` (importable from `./testerror.mjs`) on failure.

### Lower-level API

`TAPRunner.mjs` exports the underlying machinery — most notably
`run(test, title?, ...formatters)`, an async generator yielding raw results,
and `print(test, title?)`, which logs TAP-formatted output.

```javascript
import { run } from "https://johnhenry.github.io/lib/js/pop-quiz/1.0.1/TAPRunner.mjs";

for await (const result of run(function* () {
  yield ok(true);
})) {
  console.log(result);
}
```

`unique/index.mjs` exports a `unique` generator for producing unique
numbers, strings, bigints, or symbols — handy for generating test fixtures.

## Demonstration

See this module's own test suite,
[popquiz.jest.test.mjs](./popquiz.jest.test.mjs), for a complete tour of the
API.
