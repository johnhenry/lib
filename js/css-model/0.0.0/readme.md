# CSS Model

CSS Models provide a standard method
of creating declariative applications
using minimal javascript.

1. Use javascript to import (and minimally configure) how an appilcation sets specific css custom properties on the DOM.
   - These properties are updated as a result of [mouse movement](), [keyboard input](), or whatever the programmer wants.
2. Apply custom properties to DOM elements via stylesheets.

## M in MVC

Model View Controller (MVC) is a design pattern that separates functionality into three distinct parts.
There are many slightly different implementations of MVC, but this can be thought of the Model in MVC.

- Model - the data represented as a collection of css custom properties attached to the DOM
- View -
- Controller - the CSS model

CSSModel is a model for:

1. [declaratively] defining the behavior of
   certain CSS custom properties;
2. using those properties to create appications
   that are laregly unaware of
   underlying [imperative] Javascript.

## Usage

This is a base class and so,
you will not likely use it directly;
but rather a descendent.

constructors general take a element and will define
custom properties on that element to be
inherited by the element's children.

##

## WHy?
