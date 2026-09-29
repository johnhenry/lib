# dom-to-React

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/dom-to-React`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


Convert a real DOM node into a React-element-shaped plain object
(`$$typeof`, `type`, `props`, etc.) — the reverse of
[react-to-dom](../../react-to-dom/0.0.0/readme.md).

## Usage

```js
import domToReact from "../../dom-to-React/0.0.0/index.mjs";

const reactElement = domToReact(document.querySelector("#app"));
```
