# Create-Mutable-NodeList

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/create-mutable-nodelist`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


Create a mutable "subclass" (not technically a subclass) of NodeList.

Adds **push**, **pull**, **shift**, and **unshift** methods.

Note: the MutableNodeList is available as an export, but it cannot be used directly as a constructor. Use the default factory export instead.

```javascript
import createMutableNodeList from "...";
const nodeList = createMutableNodeList(...document.querySelectorAll("*"));
```
