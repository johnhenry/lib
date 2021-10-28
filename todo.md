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
