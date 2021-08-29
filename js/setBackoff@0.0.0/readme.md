# Timers

## setIntervalWait

`setIntervalWait` has a similar API to set the built-in `setInterval` function,
but it waits for the previous instance callback to be completed before
calling the next. Additonally `clearIntervalWait` returns true if the id exists,
and false if it does not.

```javascript
import setInterval, {
  clear as cleaIntervalWait,
} from "./set-interval-wait.mjs";
const id = setInterval(() => {
  /* function that must finish  */
}, 100);
setTimeout(() => clearIntervalWait(id), 2000);
```

## setRetry

`setRetry` has a similar API to set the built-in `setTimeout` and `setInterval` functions.
The difference is that it will retry the callback if it fails (throws an error) at constant intervals.

```javascript
import setRetry, { clear as clearRetry } from "./set-retry.mjs";
const id = setRetry(() => {
  /* function that may throw an error */
}, 100);
```

## setBackoff

`setRetry` has a similar API `setRetry`.
The difference is that it will retry the callback if it fails (throws an error) at exponentially increasing intervals intervals.

```javascript
import setBackoff, { clear as clearBackoff } from "./set-retry.mjs";
const id = setBackoff(() => {
  /* function that may throw an error */
}, 100);
```

## asyncTimeout

```javascript
import setTimeoutAsync from "./set-timeout-async.mjs";
const result = await setTimeoutAsync((arg) => arg, 100, "hello");
```

## asyncRetryAsync

```javascript
import setRetryAsync from "./set-retry-async.mjs";
const result = await setRetryAsync((arg) => arg, 100, "hello");
```

## asyncBackoffAsync

```javascript
import setBackoffAsync from "./set-backoff-async.mjs";
const result = await setBackoffAsync((arg) => arg, 100, "hello");
```
