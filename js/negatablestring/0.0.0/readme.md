# Negatable Strings

Ever wanted to literally subtract a string from another in your code?
Eh,... didn't thinks so...

But here's library that let's do that and then some!

## API

### String.prototype;

Import the string polyfill to use library with regular strings.

```javascript
import "./string-prototype.mjs";
```

### scale;

```javascript
import { scale } from "./index.mjs";
```

The _scale_ function transfroms a string into a negatable string object.

By default, the string representations are the same.

```javascript
"string" === scale("string").toString();
```

Negative one (-1) can be passed as a second parameter to get a negated version of the given string"

```javascript
"string" === scale("string", -1).toString().split("").reverse().join("");
```

### NegatableString.prototype.toString();

By default, the string representation is simply
the representation of the given string backwards.

```javascript
console.log(scale("string", -1).toString()); // logs "rts"
```

But this is not the full story.
Negative characters chan be highlighted
by passing a prefix parameter to _toString_ method

```javascript
console.log(scale("string", -1).toString("~")); // logs "~r~t~s"
```

Prefixes and suffixes can be added for both "negative" and "positive" characters

```javascript
const nPrefix =  '<span class="positive">':
const pPrefix =  '<span class="negative">':
const suffix =  '</span>':

console(scale("string", -1).toString(nPrefix, suffix, pPrefix, suffix));
// logs "<span class="negative">r</span><span class="negative">t</span><span class="negative">s</span>"
```

### NegatableString.prototype.consoleIterator();

Some consoles (Chrome, Deno, but not currently node)
have log methods that allow styling accepting as their
first argument a specifically formatted string;
and as their subsequent arguements, style parameters.

The "consoleIterator" method takes advantage of this. It produces an object that can be destructured into a call to console.log that will produced a result with characters
colored according to their parity.

```javascript
console.log(...scale("rts", -1).consoleIterator("red"));
// logs red "rts" on chrome and deno
// logs unformatted "rts" on  node
```

Complex example multipe strings with consoleIterator;

```javascript
const HELLO = "HELLO";
const GOODBYE = scale("HELLO", -1);
const COMBO = concat(HELLO, GOODBYE);
const [string0, ...colors0] = HELLO.consoleIterator();
const [string1, ...colors1] = GOODBYE.consoleIterator();
const [string2, ...colors2] = COMBO.consoleIterator();

console.log(...HELLO.consoleIterator());
console.log(...GOODBYE.consoleIterator());
console.log(...COMBO.consoleIterator());
console.log(
  `("${string0}" + "${string1}") = "${string2}"`,
  ...colors0,
  ...colors1,
  ...colors2
); // logs "
```

### concat

Concatenating string with negative characters is where the magic happens.

```javascript
import { concat } from "./index.mjs";
```

```javascript
console.log(concat("hello", scale("hello", -1)).toString());
//logs ""
console.log(
  concat(scale("http://", -1), "https://iamjohnhenry.com").toString()
);
//logs "https://iamjohnhenry.com"
```

### negater

You may want to construct string where not all characters are negative or positive.

```javascript
import { negater } from "./index.mjs";
```

```javascript
console.log(negater("mi~ss~issippi").toString("~"));
//logs "mssippi". Note the ~s cancelled out the s and then the i cancelled the ~i
```

```javascript
console.log(negater("mi~ss~issippi").toString("~"));
//logs "mssippi". Note the ~s cancelled out the s and then the i cancelled the ~i
```

### equals

Test if two strings represent the exact same charcters,
in the same order,
with the same parity

```javascript
import { equal } from "./index.mjs";
```

```javascript
console.log(equal("alpha", scale("alpha"))); // true
console.log(equal("beta", scale("beta", -1))); //false
```
