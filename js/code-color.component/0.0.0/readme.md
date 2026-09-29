# Code Color

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/code-color.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


Syntax-highlights its contents using
[w3-code-color](./w3-code-color.mjs) (a vendored variant of W3Schools'
color-coder), re-running highlighting whenever its child content changes
(via `MutationObserver`).

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/code-color.component/0.0.0/global.mjs"
></script>
<code-color>
  <pre>const x = 1;</pre>
</code-color>
```
