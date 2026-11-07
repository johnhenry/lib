## returnTimeout

`returnTimeout` has a similar API to set the built-in `setTimeout` function.
Instead of returning and ID of a timeout, it returns a promise fulfilled with
the value of the function when called.

Note: there is currently no official way to cancel a promise in javascript.

```javascript
import returnTimeout from "..";
const joinStrs = (...str) => str.join(" ");
console.log(await returnTimeout(joinStrs, 4500, "hello", "world"));
// logs hello world after 4.5 seconds
```
