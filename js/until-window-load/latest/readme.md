# Until Window Load

Declarative import to remove loading classes once the window has loaded.

Useful for to avoid content flash for custom components that
arrange content after loading.

## Usage

### Maunal

Define class to be removed

```js
import removeLoadingClasses from "https://johnhenry.github.io/lib/until-window-load/0.0.0/index.mjs";
removeLoadingClasses("custom-loading-class");
```

```css
.custom-loading-class {
  visibility: hidden;
}
```

```html
<custom-component class="custom-loading-class"
  >Hide me until window load</custom-component
>
```

### Automatic

Use "global" import to automatically use class name "until-window-load"

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/remove-loading-classes/0.0.0/global.mjs"
></script>
<style>
  .until-window-load {
    visibility: hidden;
  }
</style>
<custom-component class="until-window-load"
  >Hide me until window load</custom-component
>
```
