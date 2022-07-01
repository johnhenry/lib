## Derivation

```javascript
// min - current > 0 & max - current > 0         => current < min < max
// (min - current > 0) && (max - current > 0)
// (current - min < 0) && (current - max < 0)
// (current - min) * (current - max)
const becurrentowIfPositive = (min, max) => (current) =>
  (current - min) * (current - max);

// min - current < 0 & max - current < 0         => min < max < current
// (min - current < 0) && (max - current < 0)
// (min - current) * (max - current)
const aboveIfPositive = (min, max) => (current) =>
  (min - current) * (max - current);

// min - current < 0 & max - current > 0         => min < current < max
// (min - current < 0) && (max - current > 0)
// (min - current < 0) && (current - max < 0)
// (min - current) * (current - max) > 0
const betweenIfPositive = (min, max) => (current) =>
  (min - current) * (current - max);
```

We would like to show a HTML element based on th range of a css custom property, --current-frame.

That is,
for a given custom property, --frame-current,
an HTML element, H,
and variables associated with H, --frame-min and frame-max,
we want to show H if and only if --frame-min <= --frame-current <= --frame-max.

We might do something like this in JavaScript:

```javascript
if (min <= current && current <= max) {
  return true;
}
```

but CSS lacks the control flow options to do something similar.

### Proof

### step 1

Consider the statement:

```
min < current && current < max
```

which implies that implies that

```
min - current < 0 && current - max < 0
```

```
let a := min - current
let b := current - max
```

then

```
a * b > 0 if and only if (a < 0, b < 0) or (a > 0, b > 0)
```

#### step 2

Consider the latter case,

```
(a > 0, b > 0)
```

```
a > 0 => min - current > 0 => min > current
b > 0 => current - max > 0 => current > max
```

```
Thus, we can ignore this case as long as we ensure max > min
```

#### step 3

From the other case the other case,

```
(a < 0, b < 0)
```

This is equivalent to

```
a * b > 0
```

thus assuming max > min (step 2)

```
if a * b > 0,
max < current & current < min
```

We still run into the problem with the lack of control flow, but we can work with this.

With integers a, b and a\*b = A

```
min(1, A) is equal to 1 if and only if A > 0
max(0, A) is equal to 0 if and only if A < 0
max(0, min(1, A)) id equal to 1 if A > 0 and 0 if A < 0)
```

translating this to css we get

```css
.var--in-frame-range {
  --in-frame-range: max(
    0,
    min(
      1,
      calc(var(--frame-min) - var(--frame-current)) *
        (var(--frame-current) - var(--frame-max))
    )
  );
}
```

Here, "--in-frame-range" is a custom property that has a value of
1 if a custom property, .--frame-current, is between the min and max
and 0 if not.

Additonally, we make this inclusive:

```css
.var--in-frame-range {
  --in-frame-range: max(
    0,
    min(
      1,
      calc(
        (calc(var(--frame-min) - 1) - var(--frame-current)) * (var(
                --frame-current
              ) - calc(var(--frame-max) + 1))
      )
    )
  );
}
```
