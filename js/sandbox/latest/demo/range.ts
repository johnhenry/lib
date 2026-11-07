// ```javascript
import sandbox from "../index.mjs";
const [start, end] = [0, 7];
const name = `Range${start}to${end}`;
const numbers: number[] = [];
for (let i: number = start; i <= end; i++) {
  numbers.push(i);
}
const candidate = 4;
const mimeType = "text/typescript";
// ```
// ## First sttempt ❌

// ```javascript
const code = `export type {${name}} = ${numbers.join("|")};`;
console.log(code);
const { Range0to7 } = await sandbox(code, mimeType);
const result: Range0to7 = candidate;
console.log(result);
// ```
// It looks like dynamically importing a type may not be a thing
// so this won't work :(

// ## Second attempt ✔

// ```javascript
const code = `type ${name} = ${numbers.join("|")};
export const result:${name} = ${candidate};`;
console.log(code);
const { result } = await sandbox(code, mimeType);
console.log(result);
// ```
// This works where the first attempt doesn't
// because types do not cross the import boundary
