# Define Component

HTML Component to define HTML components.

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
  src="https://johnhenry.github.io/lib/define-component.component/0.0.0/global.mjs"
></script>
<define-component
  name="custom-component"
  src="./custom-component.mjs"
></define-component>
<custom-component class="loading">Hide me until window load</custom-component>
```
