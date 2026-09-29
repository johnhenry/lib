# Shadow Dom Element

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/shadow-dom.element`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


> **Deprecated alias.** This is a strict subset of
> [simple-element](../../simple-element/0.0.0/readme.md)'s `shadowOpen` —
> see its readme's "Composing content in an open shadow root" section.
> Kept for backward compatibility; prefer `shadowOpen` directly in new code.

Wraps its content in an open shadow root containing a single `<slot>`.

```html
<shadow-dom>
  <style></style>
</shadow-dom>
```
