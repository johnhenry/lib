# TODO:

- write "readme"s/tests

- build index pages from
  {css, html, js}
  ----|index.html => <a href="/project">project</a><a href="/project2">project2</a>...
  ----|project1
  --------|index.html => <a href="/0.0.0">project</a><a href="/0.1.1">project2</a>...

- Transform {css, js}/\*\* readme.md into index.html w/pandoc

- Create search page

  - As part of CI, create searchable index.json from {css, js}/\*\* for use in real-time search

- Search latest version for package.json and trigger npm publish

  - (check for readme.md, test.mjs, package.json|publish=true+version=folderfolder)

- convert js/\*\*/index.mjs to mod.ts to can be compiled to index.mjs

- modularize css files to be both global and class-based

```html
<html class="box-sizing no-margin unstyled-links">
  <link rel="stylesheet" href="box-sizing/0.0.0/universal.css" />
  <link rel="stylesheet" href="no-margin/0.0.0/universal.css" />
  <link rel="stylesheet" href="unstyled-links/0.0.0/universal.css" />
  <link rel="stylesheet" href="box-sizing/0.0.0/class.css" />
  <link rel="stylesheet" href="no-margin/0.0.0/class.css" />
  <link rel="stylesheet" href="unstyled-links/0.0.0/class.css" />
</html>
```

-- Inline graphs?

- sin(x) = .·˙·.·˙·

* sin(x) = ˙·.·˙·.·

- cos(x) = ·˙·.·˙·.

* cos(x) = ·.·˙·.·˙

- tan(x) = ╷·╹
- arctan(x) = ...·˙˙˙

⡀https://en.wikipedia.org/wiki/Braille_Patterns
⨌https://en.wikibooks.org/wiki/Unicode/List_of_useful_symbols
https://en.wikipedia.org/wiki/Box-drawing_character
