# Var-In-Frame-Range

The purpose of this library
is to provide a way to specify a range for an element and
and apply a result to its css properties,
based on whether on not the value of
an independent variable
is within the specified range.

`--in-frame-range`,
represents whether or not the `--frame-current`
is within the range of an element,
as defined by custome properties `--frame-min` and `--frame-max`.

A goal of this library to minimize the use of javascript.
Once the initial

## Usage

### Setup

- Import `./index.css` (or `./inclusive.css`)
  containing the `var--in-frame-range` class.
- Give any elements you wish to control said class.
- Provide a `--frame-current` custom property to the parent of said elements.
- Provide `--frame-min` and `--frame-max` variables to each of element
  (Set `--frame-max` > `--frame-min`)
- Use the calculated `--in-frame-range` and `--not-in-frame-range` custom properties to control other css properties (e.g. `opacity:var(--in-frame-range)`)
- [Use javascript](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty) to adjust the value of the `--frame-current` custom property.

### Value

If `--frame-current` is within the range defined by `--frame-min` and `--frame-max`,
its value is 1, and 0 otherwise.

Because `--in-frame-range` is an integer, many properties (e.g. `visibility`, `display`) _cannot_ be manipulated as they require values other than 0 and 1.

`visibility` can be emulated by passing the `--in-frame-range` value
to `opacity`, as this takes an integer between 0 and 1.

Additionally, one can move objects on and off screen by manipulating the value of `--in-frame-range` to control the (absolute) position of an element.

```css
@import "./index.css";
:has(.var--in-frame-range) {
  /* This syntax is used to refer to the parent element.
  It is not currently supporated in any major browser.
  https://developer.mozilla.org/en-US/docs/Web/CSS/:has
  */
  position: relative;
  --frame-current: 0;
}
.var--in-frame-range {
  position: absolute;
  opacity: var(--in-frame-range);
  top: calc(var(--not-in-frame-range) * 100vh);
  transition: opacity 0.25s, top 0.25s;
}

.item-1 {
  --frame-min: 0;
  --frame-max: 3;
}
.item-1:before {
  content: "I'm show up when --frame-current has a value between 0 and 3";
}
.item-2 {
  --frame-min: 4;
  --frame-max: 7;
}
.item-2:before {
  content: "I'm show up when --frame-current has a value between 4 and 7";
}
```

### Other Values

### Inverse

For convinience, the library also provides a custom property,
`--not-in-frame-range` as the inverse of `--in-frame-range`.

#### Exlclusion

Importing `./exclusive.css` gives access to the `var--in-frame-range_exclusive` class.
It provides the custom properties
`--in-frame-range_exclusive` and `--not-in-frame-range_exclusive`,
which function like the others, but with the bounds of the range excluded.
