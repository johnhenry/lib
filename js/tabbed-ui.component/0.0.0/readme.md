# Tabbed UI

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/tabbed-ui.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


A tabs/panels custom element. One child (marked `slot="tab-bar"`, or the
first child by default) holds the clickable tabs; each of its own children
corresponds, by position, to one of the element's remaining children as
that tab's panel — clicking a tab shows its panel (`selected` attribute +
`display`) and hides the rest.

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/tabbed-ui.component/0.0.0/global.mjs"
></script>
<tabbed-ui>
  <div slot="tab-bar">
    <button>One</button>
    <button>Two</button>
  </div>
  <div>Panel one</div>
  <div>Panel two</div>
</tabbed-ui>
```
