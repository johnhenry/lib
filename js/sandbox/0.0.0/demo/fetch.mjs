import sandbox from "../index.mjs";
const output = await sandbox(
  `
export const global = globalThis;
export const meta = import.meta;
export default await (await fetch(${"'http://localhost:8080/demo.html'"})).text();
`
);
const response = output.global.prompt("what?");
console.log(output.meta);
console.log(output.default);
console.log(response);
