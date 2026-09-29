# Define Tag

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/definetag`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


A curried `customElements.define` wrapper: `(elementClass) => (name) =>
customElements.define(name, elementClass)`. Useful for separating "what a
component's class is" from "what tag name it gets registered under" —
several `.component` modules' `define.mjs`/`global.mjs` files use this
instead of calling `customElements.define` directly. See
[define-component-by-content.component](../../define-component-by-content.component/0.0.0/readme.md)
for a real consumer.

## Usage

```js
import definetag from "../../definetag/0.0.0/index.mjs";
import MyComponent from "./my-component.mjs";

definetag(MyComponent)("my-component");
```
