# Menu Component

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/menu-component.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


A keyboard-navigable, stateful menu/wizard element: children become
selectable items (arrow keys to move focus, enter/space to activate), and
activating one "pushes" its content (from a nested `<template>`) into view,
dispatching `pushed`/`popped`/`reset` events. `hash.mjs` optionally
connects a menu's push/pop state to `location.hash`.

No `global.mjs` yet — register the tag name yourself:

```javascript
import MenuComponent from "../../menu-component.component/0.0.0/index.mjs";
customElements.define("menu-component", MenuComponent);
```

## hash.mjs

```javascript
import { attach, detach } from "../../menu-component.component/0.0.0/hash.mjs";

const menu = document.getElementById("menu");
attach(menu); // connects pushed/popped to location.hash
// ...later, to disconnect:
detach(menu);
```
