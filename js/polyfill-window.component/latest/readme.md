# Polyfill Global

Polyfills a key on the global object.

## Usage

### Maunal

Define class to be removed

```js
// file:///./custom-component.mjs
export default class extends HTMLElement {
  ///...
}
```

```html
<script>
  import defineComponent from "https://johnhenry.github.io/lib/define-component.component/0.0.0/index.mjs";
  globalThis.customElements.define("define-component", defineComponent);
</script>
<define-component
  name="custom-component"
  src="./custom-component.mjs"
></define-component>
<custom-component></custom-component>
```

### Automatic

Use "global" import to automatically use component name "define-component"

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/polyfill-global.component/0.0.0/global.mjs"
></script>

<polyfill-global >Hide me until window load</custom-component>
```
