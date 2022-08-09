import transformLine from "./transform-line.mjs";
import createTokenizer from "./create-tokenizer.mjs";
import {
  process as p,
  apply as a,
  expand as e,
  compose as c,
  peek as pe,
} from "./utility.mjs";

const matchSquareBrackets = /^\[(.*)\]$/;

const stripSquareBrackets = (s) => {
  const match = matchSquareBrackets.exec(s);
  if (match) {
    return match[1].split(",");
  } else {
    return [s];
  }
};

export const transformIterator = async function* (
  jsi,
  {
    process = "__PROCESS__" + Math.random().toString().slice(16),
    apply = "__APPLY__" + Math.random().toString().slice(16),
    expand = "__EXPAND__" + Math.random().toString().slice(16),
    compose = "__COMPOSE__" + Math.random().toString().slice(16),
    peek = "__PEEK__" + Math.random().toString().slice(16),
  } = {}
) {
  const tokenizer = createTokenizer({ process, apply, expand, compose, peek });
  const output = [
    `const ${process} = ${p.toString()};`,
    `const ${apply} = ${a.toString()};`,
    `const ${expand} = ${e.toString()};`,
    `const ${compose} = ${c.toString()};`,
    `const ${peek} = ${pe.toString()};`,
  ];
  yield* output;
  const lines = jsi.match(/(?:[^;"]+|"[^"]*")+/g);
  for (const line of lines) {
    const { lineJS, vars } = await transformLine(line, process, tokenizer);
    if (vars.length) {
      yield `let ${vars.map(stripSquareBrackets).flat().join(", ")};`;
    }
    if (lineJS) {
      yield `${lineJS};`;
    }
  }
};
export const transform = async (...args) => {
  const lines = [];
  for await (const line of transformIterator(...args)) {
    lines.push(line);
  }

  return lines.join("\n");
};
export default transform;
