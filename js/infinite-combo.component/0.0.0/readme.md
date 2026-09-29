# Infinite Combo

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/infinite-combo.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


A combo-box/autocomplete element that loads more options on demand — as
the user types or scrolls near the end of the list, `onsearch` is called
to fetch and append more `<option>` markup, for effectively unbounded
option lists.

## Attributes

| Attribute | Description |
|---|---|
| `onsearch` | Async function body (as a string, like `onclick`) returning HTML option markup to append. Receives an event with the current input text |
| `onselect` | Function body run when an option is selected |
| `size` | Number of visible options, like native `<select size>` |
| `select-tag` | Tag name used for the internal options list. Defaults to `select` |
| `loading` | Function body run while a search is in flight |

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/infinite-combo.component/0.0.0/global.mjs"
></script>
<script>
  window.search = async (event) =>
    `<option>${event.data}</option>`;
</script>
<infinite-combo onsearch="window.search(event)" size="5"></infinite-combo>
```

See `demo.htm` for a fuller working example.
