# CSS Model:Click Cycle

Attaching this to an element detects
when children are clicked and cycels a variable
through a series of values defined on them.

## Usage

Importing the global modules
attaches it to the it to
the HTML element with a default
prefix of "input".

When clicked,
if a child has the attribute "data-custom-property" defined,
a custom property related to the attribute value
cycles through the valued defined in the "data-values" property.

```html
<html style="--input-PROPERTYNAME-str:0;">
  <script type="module" src="./global.mjs"></script>
  <style>
    button::before {
      content: var(--input-PROPERTYNAME-str);
    }
  </style>
  <button
    data-custom-property="PROPERTYNAME"
    data-custom-property-values="0;1;2"
  ></button>
</html>
```

Note that the custom property must be initialized on the target element

## Advanced Usage

Import the constructor to limit the scope of the property or change the prefix.

```html
<script type="module">
  import CSSModelClickCycle from "./index.mjs";
  new CSSModelClickCycle(document.querySelector("button"), "clicked-var");
</script>
<style>
  button::before {
    content: var(--input-clicked-var-str);
  }
</style>
<button
  data-custom-property="clicked-var"
  data-custom-property-values="0;1;2"
  style="--input-clicked-var-str:0;"
></button>
```

## Demos

[demo](./demo.html)
