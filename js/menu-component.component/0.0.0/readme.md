# Menu Component

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
