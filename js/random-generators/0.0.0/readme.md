# Random Generators

These are methods of generating a sample, _x_, for a given random variable, _X_.

**No guarantees are made as to the distribution of the random variable.**

## Float

### X := [ 0, 1 )

```javascript
() => Math.random(); // R
```

### X := ( 0, 1 ]

```javascript
() => -(Math.random() - 1); // -(R-1)
```

### X := [ 0, N )

```javascript
(N) => Math.random() * N; // R*N
```

### X := [ M, N )

```javascript
(M, N) => Math.random() * (N - M) + M; // R*(N-M)+M
```

### X := [ 1, Infinity )

```javascript
() => -1 / (Math.random() - 1); // -1/(R-1)
```

### X := ( 1, Infinity ]

```javascript
() => Math.random() ** (-1 / Math.random()); // R^(-1/R)
```

## Integer

### X := [ 1, N ]

```javascript
(N) => Math.ceil(Math.random() * N); // ⌈R*N⌉
```

### X := [ 0, N ]

```javascript
(N) => Math.floor(Math.random() * N + 1); // ⌊R*N+1⌋
```

### X := [ M, N ]

```javascript
(M, N) => Math.floor(Math.random() * (N - M + 1) + M); // ⌊R*(N-M)+N⌋
```

## Boolean

### X := { true, false }

```javascript
() => Math.random() < 0.5; // R<0.5
```

## Multiset (Array)

### X := []:Array< any >

```javascript
(...A) => A[Math.floor(Math.random() * A.length)]; // A[⌊R*|A|⌋]
```

## Bytes

### X := TypedArray< number >(N)

```javascript
(N) => globalThis.crypto.getRandomValues(new Uint8ClampedArray(N)); // g(N)
```
