# Consistency Goals

(I still have a lot of refactoring before this is completely true.)

- All module folder names are in kebab case ("kebab-case");
- Each module folder has an associated readme.md minimally containing:
  - Module Name
  - A brief description description
  - Import Syntax
  - Links to at least demonstration of its use.
- Each module folder contains at least one -- perhaps both -- of a global export file (global.mjs or global.css) and a module export file (index.mjs).

  - **index.mjs** contains named exports that can be imported into a file and manipulated.

    ```javascript
    import MainClass, { associatedFunction } from "./some-js-module/index.mjs";
    // Do something using "MainClass" and "associatedFunction" ...
    ```

  - **global.mjs** or **global.css** indicates a global file. These add behaviors to the environment with no additional manipulation required by a developer and thus names are not needed.

  The prefered method of import is to use a tag:

  ```html
  <script type="module" src="./some-js-module/global.mjs"></script>
  <link rel="stylesheet" link="./some-css-module/global.css" />
  ```

  but they can be imported using their native language syntax as well:

  ```javascript
  import "./some-js-module/global.mjs";
  ```

  ```css
  @import "./some-css-module/global.css";
  ```

  Unless and until the [CSS Module Scripts proposal](https://web.dev/css-module-scripts/) is widely adopted, all css modules are global.

- Exported module naming conventions
  - camel case ("camelCase") if the module is a function
  - pascal case ("PascalCase") if the module is a class
  - upper snake case ("UPPER_SNAKE_CASE") if the module is a constant
- Web components are named using their default component name (followed by ".component").
  Importing a web component's global file will registers that name.

  ```html
  <script
    type="module"
    src="https://johnhenry.github.io/lib/define-component.component/0.0.0/global.mjs"
  ></script>
  <!-- registers the  "<define-component>" tag -->
  ```

- Spelling should be checked
