# CSS Model

CSS Models provide a [declariative] method
of creating applications
using CSS custom properties
and minimal javascript.

Note that the "user", in this document,
referres to developer
who creates an application
by importing and instantiating
the CSSModel class (or one of its descendants).
This is distinct from the "developer",
who creates the model;
or the "end user" who does not interact with code.

## List of CSS Models:

- [CSS Model Audio Node](https://johnhenry.github.io/lib/js/css-model-audio-node/0.0.0/)
- [CSS Model Cycle Click](https://johnhenry.github.io/lib/js/css-model-cycle-click/0.0.0/)
- [CSS Model Date](https://johnhenry.github.io/lib/js/css-model-date/0.0.0/)
- [CSS Model Gamepad](https://johnhenry.github.io/lib/js/css-model-gamepad/0.0.0/)
- [CSS Model Input](https://johnhenry.github.io/lib/js/css-model-input/0.0.0/)
- [CSS Model Keyboard](https://johnhenry.github.io/lib/js/css-model-keyboard/0.0.0/)
- [CSS Model Mouse](https://johnhenry.github.io/lib/js/css-model-mouse/0.0.0/)
- [CSS Model Output](https://johnhenry.github.io/lib/js/css-model-output/0.0.0/)
- [CSS Model Presentation](https://johnhenry.github.io/lib/js/css-model-presentation/0.0.0/)
- [CSS Model Random](https://johnhenry.github.io/lib/js/css-model-random/0.0.0/)
- [CSS Model Scroll](https://johnhenry.github.io/lib/js/css-model-scroll/0.0.0/)
- [CSS Model Window](https://johnhenry.github.io/lib/js/css-model-window/0.0.0/)

## Model-View-Controller

Although implementations vary slightly,
a [CSS Model](.) can be though of
as the "M" in the [MVC (Model-View-Controller)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern.
It is a collection of data
represented as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (variables)
attached to the DOM.

The "V", or "view", is the stylesheet
that uses the CSS custom properties
to style the DOM.

The "C", or "controller", is a instance of
the CSSModel class
that creates and manipulates the model.
Ideally the controllers is exposed
to the user of the CSSModel
as little as possible.
Once attached to the DOM,
it should "get out of the way".

## Usage

This is a base class.
You will not likely use it directly,
but rather an ancestor from which to inherit.

Desecenants should be constructed to work in the following manner:

1. Use javascript to import (and minimally configure) how an appilcation sets specific css custom properties on the DOM.
   - These properties are updated as a result of [mouse movement](), [keyboard input](), or whatever the programmer wants.
2. Apply custom properties to DOM elements via stylesheets.

CSS Models _should_, when possible, provide a global file that the user can import withouth having to configure the model. This file should provide smart defaults to the Model's constructor.

```html
<script type="module" src"../global.mjs" ></script>
```

or

```javascript
import "../global.mjs";
```

### API

The API is described for those creating CSS models of their own.

#### CSSClass.constructor(target, prefix)

- target -- the DOM element to which the CSS custom properties will be attached.
  - properties attached to some models will depend on attributes attached to the target as well as children of the target
- previx -- prefix attached to CSS custom properties to avoid name collisions.

#### CSSClass.#set(name, value)

Sets a value for a css property.
Note, this also sets a string representation of the value with the suffix "-str"

```javascript
const css = new CSSClass(document.body, "css-model");

css.model.set("color", "red"); // sets the css custom property '--css-model-color' to 'red' on the document's body
// Also sets the css custom property '--css-model-color-str' to '"red"
```

```css
body {
  background-color: var(--css-model-color); /* background-color is red */
}
body::before {
  content: var(--css-model-color-str); /* content is "red";*/
}
```

#### CSSClass.#get(name)

Returns the value for a given set key, ignoring the prefix.

```javascript
const css = new CSSClass(document.body, "css-model");
css.model.set("color", "red");
css.mode.get("color"); // returns the value of the css custom property '--css-model-color', "red"
```

#### CSSClass.#remove(name)

Removes the value for a given set key, ignoring the prefix.

```javascript
const css = new CSSClass(document.body, "css-model");
css.model.set("color", "red");
css.mode.remove("color");
css.mode.get("color"); // returns undefined
```
