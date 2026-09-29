# Class Cycler

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/class-cycler.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


Exposes a [localstorage-class-cycler](../../localstorage-class-cycler/0.0.0/readme.md)
instance as a named global function, so it can be called from anywhere
(e.g. a plain `<button onclick="...">`). Container/global variant — see
[class-cycler.button.component](../../class-cycler.button.component/0.0.0/readme.md)
for a self-contained `<button>` element that cycles its own classes.

## Attributes

| Attribute | Description |
|---|---|
| `global` | Name to assign the cycler function to on `globalThis` (required — removing this attribute, or disconnecting the element, unassigns it) |
| `selector` | Selector for the element whose classes get cycled. Defaults to `body` |
| `storage-key` | localStorage key the current class value persists under |
| `classes` | Comma-delimited list of classes to cycle through |

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/class-cycler.component/0.0.0/global.mjs"
></script>
<class-cycler
  global="cycleTheme"
  selector="body"
  storage-key="theme"
  classes="light,dark,system"
></class-cycler>
<button onclick="cycleTheme()">Toggle theme</button>
```
