import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="JS Library/Tester/Docs" />

# Tester

/lib/js/tester@latest/index.mjs

Tester is a javascript testing framework based on [Tape](https://github.com/substack/tape).

Like Tape, tester

- can be run directly using [node](https://nodejs.org) without any additional binaries or transformations.
- produces output using the standard [Test Anything Protocol](https://testanything.org/).

Unlike Tape, tester

- can be run directly in the browser or using [deno](https://deno.land) without any additional binaries/transformations,
  along with node.
- uses external assertions and makes it easy to write your own.

## API

Tester's API consist of two manin components:

- The "tester" function acts on a group of assertions.
- The assertions themselves, which return errors if a given condition is not satisfied.

### Tester

The tester function is the default export.

It takes as its only argument a [possibly asynchronous] generator. We call this a "test".

Results of assertions are yielded from within the body of a test.

```javascript
import tester from "./index.mjs";

tester(function* () {
  yield /*some assertion result*/;
  yield /*some other assertion result*/;
});
```

### Assertions

The named exports are assertions.

Call them within a test and yield their results.

```javascript
import tester, { ok, notok } from "./index.mjs";

tester(function* () {
  yield ok(true);
  yield notok(false);
});
```

#### Included Assertions

Besides ok and notok, there are a number of assertions included:

- ok -- test passes if and only if the given argument to a test is TRUTHY.
- notok -- test passes if and only if the given argument to a test is FALSH.
- equal -- test passes if and only if the two given arguments are THE SAME object.
- notequal -- test passes if and only if the two given arguments are NOT THE SAME object.
- pass -- test ALWAYS PASSES
- fail -- test ALWAYS FAILS
- subtestpass -- test passes if and only if the given argument is a test in which ALL THE ASSERTIONS PASS.
- subtestfail -- test passes if and only if the given argument is a test in which AT LEAST ONE ASSERTION FAILS.
- throws -- test passes if and only if the given function THROWS AN ERROR when called
- doesnotthrow -- test passes if and only if the given function DOES NOT THROW AN ERROR when called

### plan

When using the run function, the first argument passed to given generator is a function.
We'll call it "plan", but you can name it anyting you like ("expect", "assertions", etc.)
When _plan_ is called with an integer, it dictates the number of expected assertions in a given test function.

import tester, { ok } from "./index.mjs";

```javascript
tester(function* (plan) {
  plan(1);
  yield ok(true);
});
```

## Creating Assertions

When creating assertions, use the examples in _./assertions_ for inspiration.
Here are a few things to keep in mind:

- Assertions are functions that test for a desired conditon.
- If the given conditions meet the desired conditions,
  - an accepted message is returned.
  - Otherwise, an instance of TestError is returned.

```javascript
import TestError from "./testerror.mjs";

const assertion = (/*given conditions*/)=>{
  if(/*conditions are met*/){
    return /*some message*/;
  }
  return new TestError(/*some message*/);
}
```

### Conventions

This library follows a specific convetion for its assertions.
It's recommended that you follow these conventions when creating your own assertions,
but feel free to come up with your own.

- The last item is an _operator string_, which is used for the TAP protocol and can be overridden.
- The next-to-last item is a _default expected message_ that can also be overridden.
- The preceeding arguments are given conditions to be tested.
- The returned TestError is constructed using the default expected message
  along with an object detailing the difference between what's expected and what's not.

```javascript
import TestError from "./testerror.mjs";

const assertion = (/*given conditions*/, message, operatorString)=>{
  if(/*conditions are met*/){
    return message;
  }
  return new TestError(message, /*some object*/));
}
```

### TestError API

The test error is constructed with two items:

- An expected messages
- An object who's key-value pairs are displayed as part of TAP output

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
