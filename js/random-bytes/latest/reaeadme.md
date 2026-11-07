# Random Bytes

This is a utility to generate random bytes and transform bytes between different formats.

## Usage

### Default: Generate a Uint8ClampedArray of containing N random bytes

```javascript
import randomBytes from "./index.mjs";
console.log(randomBytes(1)); // Uint8ClampedArray(0) [ 137]
console.log(randomBytes(1)); // Uint8ClampedArray(1) [ 34 ]
console.log(randomBytes(3)); // Uint8ClampedArray(3) [ 149, 85, 186 ]]
```

### Generate a hex string representing N random bytes

```javascript
console.log(randomBytes(1, "hex")); // b3
console.log(randomBytes(1, "hex")); // 35
console.log(randomBytes(3, "hex")); // cf9ffe
```

### Generate n BigInt representing N random bytes

```javascript
console.log(randomBytes(1, "BigInt")); // 9n
console.log(randomBytes(1, "BigInt")); // 148n
console.log(randomBytes(3, "BigInt")); // 2500205n
```

### Generate a color representing N random bytes

```javascript
console.log(randomBytes(1, "color")); // #a4
console.log(randomBytes(2, "color")); // #8417
console.log(randomBytes(3, "color")); // #b9ebff
console.log(randomBytes(3, "color24")); // #93565e
console.log(randomBytes(4, "color32")); // #8fede57f
```

### default export will transform bytes accordingly if given bytes rather than a number

```javascript
const bytes = new Uint8ClampedArray([137, 34, 149, 85, 186]);
console.log(randomBytes(bytes)); // Uint8ClampedArray(5) [ 137, 34, 149, 85, 186 ]
console.log(randomBytes(bytes, "hex")); //89229555ba
console.log(randomBytes(bytes, "BigInt")); // 588990731706n
console.log(randomBytes(bytes, "color")); // #89229555ba
console.log(randomBytes(bytes, "color24")); // #892295
console.log(randomBytes(bytes, "color32")); // #89229555
```
