## Stack Functions

Stack functions are functions that are applied to a stack and return a stack. By convention, included stack functions end with "$".

Here are the built in stack functions:

### identity

Does nothing to the stack.

```javascript
import { identity } from "...";
1 2 3 identity!! @!!; /* prints "1 2 3" */
```

### clear

Clears the stack.

```javascript
import { clear } from "...";
1 2 3 clear!! @!!; /* prints *nothing* */
```

### peek

Prints the stack.
(aliased by `@`)

```javascript
import { peek$ } from "...";
1 2 3 peek$!!; /* prints "1 2 3" */
```

### expand

Expands an iterator into the current stack.
(aliased by `.`)

```javascript
import { expand$ } from "...";
[1 2 3]. expand$!!; /* prints "1 2 3" */
```

### compose

Composes multiple functions into a single function.
(aliased by `:`)

```javascript
import { compose$, dupe$ } from "...";
import { product$ } from "jth/stats";
dupe$ product$ compose$!! -> [square$]
3 square$!; /* prints "9" */
```
