# Style Headings

Injects a `<style>` tag generating a font-size ramp (or any other CSS
property) across a run of heading-like selectors (`h1`..`h6` by default),
computed as `max / i + min` for heading level `i`.

## Attributes

| Attribute | Description |
|---|---|
| `preselector` | Selector prefix for each heading level, e.g. `h` produces `h1`, `h2`, ... Read once on connect |
| `selector` | Extra selector text appended after the level number, e.g. `.title` produces `h1.title` |
| `start` | First heading level. Default `1` |
| `limit` | Last heading level. Default `6` |
| `attribute` | CSS property to set. Default `font-size` |
| `unit` | Unit appended to the computed value, e.g. `rem` |
| `min` | Minimum value (also the asymptote as level grows). Default `1` |
| `max` | Controls the value's range together with `min` |
| `common` | Extra CSS declarations appended to every rule as-is |

## Usage

```html
<script
  type="module"
  src="https://johnhenry.github.io/lib/js/style-headings.component/0.0.0/global.mjs"
></script>
<style-headings min="1" max="5" unit="rem"></style-headings>

<h1>Biggest</h1>
<h6>Smallest</h6>
```
