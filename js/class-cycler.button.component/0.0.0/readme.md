# Class Cycler Button

A `<button is="class-cycler-button">` that cycles the classes of one or
more target elements every time it's clicked, via
[localstorage-class-cycler](../../localstorage-class-cycler/0.0.0/readme.md).
Self-contained button variant — see
[class-cycler.component](../../class-cycler.component/0.0.0/readme.md)
for a global-function variant callable from anywhere.

## Attributes

| Attribute | Description |
|---|---|
| `select` | Selector for a single target element. Defaults to `html` if neither `select` nor `select-all` is set |
| `select-all` | Selector for multiple target elements (all matches get cycled together) |
| `storage-key` | localStorage key the current class value persists under |
| `classes` | Comma-delimited list of classes to cycle through |

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/class-cycler.button.component/0.0.0/global.mjs"
></script>
<button
  is="class-cycler-button"
  select="body"
  storage-key="theme"
  classes="light,dark,system"
>
  Toggle theme
</button>
```
