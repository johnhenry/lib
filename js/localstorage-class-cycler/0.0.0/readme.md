# LocalStorage Cycler

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/localstorage-class-cycler`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


Cycle local storage values through a given list of strings.
Renders cycled value as class on given element.

## Usage

```javascript
import classStorageCycler from "..";
const updateBodyClass = classStorageCycler(
  document.body,
  "my-key",
  "a",
  "b",
  "c"
);
updateBodyClass();
```
