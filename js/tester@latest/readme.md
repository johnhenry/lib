# Tester

A context-independent testing framework inspired by [tape](https://github.com/substack/tape).

## context-agnostic

Tests run in same context as your application. No special executables needed.

## TAP Output

Tester outputs to the console using a partial implementation of the [Test Anything Protocol](https://testanything.org/tap-specification.html).

## Usage

The default export of ./index.mjs is an asynchronous function,
_tester_, that takes a test in the form of an asynchronous iterator.

```javascript
import tester from "./index.mjs";
await tester(async function* () {
  /* define test here s*/
});
```

### Title

Optionally _tester_ takes a string as it's first argument.
This will be printed out before each test.

```javascript
import tester from "./index.mjs";
await tester("test title", async function* () {
  /* define test here s*/
});
```

### Definition and format

When creating a test, simply yield the result of an assertion.

```javascript
import tester from "./index.mjs";
import ok from "./assertions/ok.mjs";
await tester("test title", async function* () {
  yield ok(true);
});
```

There are 7 built in assertions
included alongside the default export for convinience.

```javascript
import tester, {
  ok,
  notok,
  equal,
  notequal,
  deepequal,
  pass,
  fail,
} from "./index.mjs";
```

### with plan argument

The first argument to the test is a _plan_ function which is used to
announce then number of tests before they take place via TAP.

```javascript
import tester from "./index.mjs";
import ok from "./assertions/ok.mjs";
await tester("test title", async function* (plan) {
  plan(1);
  yield ok(true);
});
```

## assetions

Assertions are functions.
They take any number of arguments
and return either a success message string
or an instance of TestError ("/testerror.mjs").

### included assertions

#### ok

```javascript
import { ok } from "/index.mjs";
const result = ok(true);
if (result instanceof Error) {
  throw result;
}
```

#### notok

```javascript
import { notok } from "/index.mjs";
const result = notok(false);
if (result instanceof Error) {
  throw result;
}
```

#### equal

```javascript
import { equal } from "/index.mjs";
const result = equal(true, true);
if (result instanceof Error) {
  throw result;
}
```

#### notequal

```javascript
import { notequal } from "./index.mjs";
const result = notequal(true, false);
if (result instanceof Error) {
  throw result;
}
```

#### deepequal

```javascript
import { deepequal } from "./index.mjs";
const result = deepequal({ a: true }, { a: true });
if (result instanceof Error) {
  throw result;
}
```

#### pass

```javascript
import { pass } from "./index.mjs";
const result = pass();
if (result instanceof Error) {
  throw result;
}
```

#### fail

```javascript
import { fail } from "./index.mjs";
const result = fail();
if (result instanceof Error) {
  throw result;
}
```

#### subtestpass

```javascript
import { subtestpass, pass } from "./index.mjs";
const result = await subtestpass(function* () {
  yield pass();
});
if (result instanceof Error) {
  throw result;
}
```

#### subtestfail

```javascript
import { subtestfail, fail } from "./index.mjs";
const result = await subtestfail(function* () {
  yield fail();
});
if (result instanceof Error) {
  throw result;
}
```

### creating external assertions

Assertions have the following general form:

```javascript
export default (...args) => {
  if(/*test of args passes*/){
    // return a string to indicate success.
  } else {
    // return instance of TestError
  }
}
```

## TAPRunner, print, run

The file "/TAPRunner.mjs" export methods "print" and "run".
"print" functions similarly to the default export of "index.mjs" --
both of which rely on "run" to execute underlying code.

When called with as single argument (a test),
"run" yields only the results of the test (string or Error) without additional processing.
