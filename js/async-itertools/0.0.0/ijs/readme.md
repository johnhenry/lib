# IJS

IJS is an alternative syntax for javascript
centerered around squential data processing.

Because it compiles to javascript,
it is compatibale with existing libraries.

## Syntax

### Stack

IJS is similar to other languages like joy and forth,
in that the primary API is a stack.

The following produces an stack holding the number 1.

```
1;
```

Multiple items are can be added to the stack using the space (" ") character.
The following produces an stack holding the number 1, 2, and 3.

```
1 2 3;
```

### Execute (!!)

Any objects can be added to the stack, including functions.

Use the execute ("!!") opeator after a function to invoke it on the items before it in the stack.

The following produces a stack holding the numbre 6, the sum of 1, 2, and 3.

```
import { sum } from "./stat.mjs";
1 2 3 sum!!;
```

#### Parity (!{n})

Parity may be specified by following the execute operator witn an integer.

The following produces a stack holding two numbers numbre 1 and 5 (previously the lat two numbers on the stack)

```
import { sum } from "./stat.mjs";
1 2 3 sum!{2};
```

To specify single parity, use "!".
To specify infinite parity, use "!{undefined}".

### Print (@)

Print the current context of a stack using the "!!" operator.

This is disctinct from the "!" which must be used alongside it.

The following prints the string "hello world" and leaves it on the stack.

```
"hello world" @!;
```

### Store (->)

Use "->" to store the current context of a stack in a variable.

The following stores a stack with tne name "numbers".

```
1 2 3 -> numbers;
```

#### Destructuring ([])

Destructure the stack using the "[]" operator to extract specific parts of the stack.

The following stores the second and third items on a stack, ignoring the first.

```
1 2 3 -> [,two, three];
```

### Expand (.)

use "." to replace an array on the stack with its members.

The following produces a stack holding the numbers 1 through 9.

```
1 2 3 -> start;
7 8 9 -> end;
start .! 4 5 6 end .!;
```

## Lazy Iterators

### Transduction

Infinity iterateAsync transducer(filter, map, take) ! ! console.log map!

2 4 6 (dupe \* compose!) !; // 2 4 32

dupe \* compose ! -> [square];
dupe + compose ! -> [double];

2 4 6 square !; // [2 4 36]

2 4 6 square ! square !; // [2 16 36]

![1, 2, 3] square; // [4 16 36]

2 -> two;

1 2 3 + !2 -> sum --> [itrator1];// 1 5

1 2 3

const expand = function*(stack){
const item = take(1)(stack);
yield* item;
yield stack;
}

1 2 3 4 5 2 take ! --> iterator2; // 4 5

iterator1 . ! iterator2 . ! --> iterator3;

iterator1 iterator2 sequence ! --> iterator3;

iterator3 log !; // logs `1 5 4 5`

keyboard.keys expand ! toUpperCase !! log !! --> iterator4

compose -- sequeintaillay apply functions

! -- apply last function to previous parameters
may specify !n to use exactly n parameters

f:iterator -> iterator;

!! -- apply transformer to a parameters sequentially as they come in

{iterator, otherthing} export !;

5 10 fromTo ! -->; 5 6 7 8 9

5 from ! -->; 5 6 7 8 9 ...

```

```

```

```

```

```
