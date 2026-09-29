# Text to DOM Nodes

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/text-to-DOM-nodes`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


Parse an HTML string into a live `NodeList` of DOM nodes. The inverse of
[DOM-nodes-to-text](../../DOM-nodes-to-text/0.0.0/readme.md). Used
internally by [simple-element](../../simple-element/0.0.0/readme.md) and
[shadow-dom.element](../../shadow-dom.element/0.0.0/readme.md).

## Usage

```javascript
import textToDOMNodes from "../../text-to-DOM-nodes/0.0.0/index.mjs";

const nodes = textToDOMNodes("<li>one</li><li>two</li>");
document.querySelector("ul").append(...nodes);
```
