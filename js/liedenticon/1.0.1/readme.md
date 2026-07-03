# Liedenticon

> **Source of truth:** development happens at
> [github.com/johnhenry/liedenticon](https://github.com/johnhenry/liedenticon).
> This directory is a snapshot published here for the CDN import URL and
> npm release; it will not track every upstream commit.

Transform a string into a unique image.

Liedenticon is a refinement of
[Identicon](https://github.com/stewartlord/identicon.js) that separates
image generation into two classes — one for SVGs and one for PNGs — with
flexible hex color support and percentage padding. Ships as plain ES
modules with zero dependencies; works in Node and the browser.

## Import Syntax

Import directly from this site:

```javascript
import {
  SVG,
  PNG,
} from "https://johnhenry.github.io/lib/js/liedenticon/1.0.1/index.mjs";
```

or install via npm (`npm install liedenticon`) and import by name:

```javascript
import { SVG, PNG } from "liedenticon";
```

## Usage

### SVG

By default the SVG class generates an svg string to be embedded in a
document.

```javascript
console.log(String(new SVG("efb8c90a13f7a1fdc4910"))); // "<svg ..."
```

Passing a truthy parameter to the `toString` method creates a string that
can be used directly as the source attribute of an image.

```javascript
new SVG("efb8c90a13f7a1fdc4910").toString(true); // "data:image/svg+xml;utf8,<svg ..."
```

Passing a second truthy parameter returns the base64-encoded string.

```javascript
new SVG("efb8c90a13f7a1fdc4910").toString(true, true); // "data:image/svg+xml;base64,..."
```

### PNG

The PNG class generates a base64 string, by default with a data-URI
preamble attached — usable directly as an image source.

```javascript
const img = document.createElement("img");
img.src = new PNG("efb8c90a13f7a1fdc4910");
document.body.appendChild(img);
```

Passing a falsy parameter to `toString` drops the preamble.

```javascript
new PNG("efb8c90a13f7a1fdc4910").toString(false); // raw base64
```

### Options

Both classes take an options object as a second argument:

```javascript
new SVG("efb8c90a13f7a1fdc4910", {
  size: 128, // width/height in pixels (default 64)
  padding: "20%", // padding — number, numeric string, or percentage
  saturation: 0.75, // derived-foreground saturation
  brightness: 0.5, // derived-foreground brightness
  background: [0, 0, 0, 0], // background color (default transparent)
  foreground: "#36c", // foreground color (default derived from hash)
});
```

#### Color Support

In addition to `[r, g, b]` / `[r, g, b, a]` arrays, colors may be given as
1, 2, 3, 4, 6, or 8 digit hex codes (with or without a leading `#`); 2, 4,
and 8 digit codes carry an alpha channel.

#### Padding vs Margin

Liedenticon replaces Identicon's "margin" option with "padding", matching
the [CSS definition](https://www.w3schools.com/cSS/css_padding.asp) most
web developers expect; percentage strings such as `"20%"` are supported.

### Extending

Both classes inherit from an internal `Graphic` class. Support other
formats by extending it and implementing `renderImage` and `toString`:

```javascript
import Graphic from "liedenticon/graphic";

class NewFormat extends Graphic {
  renderImage(hash, size, padding, background, foreground) {
    // ...
  }
  toString() {
    // ...
  }
}
```

## Demonstration

See this module's test suite,
[liedenticon.jest.test.mjs](./liedenticon.jest.test.mjs), for working
examples, and the [0.0.4 demo](../0.0.4/index.html) for an in-browser
demonstration.
