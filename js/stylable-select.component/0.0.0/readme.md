# Stylable Select

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/stylable-select.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


A `<select>`-like custom element (`<option>`/`<optgroup>` children,
`value`/`selectedIndex` properties, `change` events, arrow-key/click
navigation) whose individual options can actually be styled with CSS —
unlike the native `<select>`, whose options can't be styled consistently
across browsers.

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/stylable-select.component/0.0.0/global.mjs"
></script>
<link
  rel="stylesheet"
  href="https://johnhenry.github.io/lib/js/stylable-select.component/0.0.0/index.css"
/>
<stylable-select>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</stylable-select>
```

See `demo.htm` for a fully-styled example with `<optgroup>`.
