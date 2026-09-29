# Text to DOM Nodes

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
