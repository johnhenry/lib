# Hide-N-Show

CSS Utilities to control visibility of elements

## /landscape.css

Utility classes to hide elements that had an element,
unless the viewport is in landscape mode.

This is useful to "progressively enhance" mobile-first applications.

Usage:

```html
<link rel="stylesheet" href="../hide-n-show/0.0.0/landscape.css" />
<nav>
  Always Visible
  <span class="hide-n-show-landscape"> [Only visible in landscape mode] </span>
</nav>
```

Control visible display property by using `hide-n-show-landscape-<display value>`

Values supported:

- block
- flex
- grid
- inline
- inline-block
- inline-flex
- inline-grid
