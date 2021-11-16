# Thro

[Throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) as a functions.

Useful in places where you want to throw an error, but need an expression.

## Usage

```javascript
import thro from "...";

const doAThing = (
  arg = thro(new Error("1st arg required")),
  result = "done"
) => {
  // do a thing...
  console.log(`${arg} ${result}`);
};
doAThing("something"); // logs "something done";
doAThing(); // throws "1st arg required" error
```
