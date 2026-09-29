# Hotkey Modal Dialog

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/hotkey-modal.dialog.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


A `<dialog is="hotkey-modal">` that opens/closes via a configurable
keyboard shortcut, built on the native `<dialog>` element (`showModal()`/
`close()`).

## Attributes

| Attribute | Description |
|---|---|
| `hotkey` | The shortcut, e.g. `k` or `ctrl+k` or `ctrl,shift+k` (comma-delimited modifiers before the final `+`). Toggles open/closed |
| `click-to-close` | If present, clicking the dialog's own backdrop area closes it |
| `no-esc-close` | If present, blocks the native Escape-key close behavior |

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/hotkey-modal.dialog.component/0.0.0/global.mjs"
></script>
<dialog is="hotkey-modal" hotkey="ctrl+k" click-to-close>
  <p>Press Ctrl+K again, click outside, or Esc to close.</p>
</dialog>
```
