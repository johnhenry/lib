//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
import mod from "../../mod/0.0.0/index.mjs";
let COLOR = "white";
let PCOLOR = COLOR;
let NCOLOR = "red";
export const SETDEFAULTCOLORS = {
  default(color) {
    COLOR = color;
  },
  positive(color) {
    PCOLOR = color;
  },
  negative(color) {
    NCOLOR = color;
  },
};

export const r = Symbol.for("negatable string representation");

export const NegatableString = class {
  constructor(rep = []) {
    this[r] = rep;
    Object.freeze(this[r]);
    this[r].forEach(Object.freeze);
  }
  consoleIterator(nColor = NCOLOR, pColor = PCOLOR, color = COLOR) {
    return consoleIterator(this, nColor, pColor, color);
  }
  toString(nStart = "", nEnd = "", pStart = "", pEnd = "") {
    return this[r]
      .map(([x, negative]) =>
        negative ? `${nStart}${x}${nEnd}` : `${pStart}${x}${pEnd}`
      )
      .join("");
  }
  charAt(index) {
    return new NegatableString([this[r][index]]);
  }
  get length() {
    return this[r].length;
  }
};
export const invert = (string) =>
  new NegatableString(
    string[r].map(([x, negative]) => [x, !negative]).reverse()
  );

export const equal = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[r][i][0] !== b[r][i][0] || a[r][i][1] !== b[r][i][1]) {
      return false;
    }
  }
  return true;
};

export const negater = (string = "", symbol = "~", combine = true) => {
  const rep = [];
  let negateNext = false;
  for (const char of string) {
    if (negateNext) {
      negateNext = false;
      if (char === symbol) {
        continue;
      }
      rep.push([char, true]);
      continue;
    }
    if (char === symbol) {
      negateNext = true;
      continue;
    }
    rep.push([char, false]);
  }
  let i = 0;
  // Handle adjacent inverses
  if (combine) {
    while (i < rep.length - 1) {
      if (i < 0) {
        i = 0;
      }
      const current = rep[i];
      const next = rep[i + 1];
      if (current[0] === next[0] && current[1] === !next[1]) {
        rep.splice(i, 2);
        i -= 2;
      }
      i++;
    }
  }
  return new NegatableString(rep);
};

export const ensureNegatableString = (string) => {
  if (typeof string === "string") {
    return scale(string);
  }
  return string;
};

export const concat = (alpha, beta, drop = undefined) => {
  const a = ensureNegatableString(alpha);
  const b = ensureNegatableString(beta);
  const rep = [];
  let index = 0;
  let last;
  let first;
  do {
    last = a[r][a[r].length - 1 - index];
    first = b[r][index];
    index++;
    if (first && last) {
      if (last[0] === first[0] && last[1] === !first[1]) {
        // do nothing. continue?
      } else {
        rep.push(first);
        rep.unshift(last);
      }
    } else if (first) {
      rep.push(first);
    } else if (last) {
      rep.unshift(last);
    }
  } while (first || last);
  const result = new NegatableString(rep);
  if (drop === true) {
    return flushNegative(result);
  }
  if (drop === false) {
    return flushPositive(result);
  }
  return result;
};

export const flip = (string) =>
  new NegatableString(string[r].map(([x, s]) => [x, !s]));
export const abs = (string) =>
  new NegatableString(string[r].map(([x, s]) => [x, false]));
export const nAbs = (string) =>
  new NegatableString(string[r].map(([x, s]) => [x, true]));
export const flushPositive = (string) =>
  new NegatableString(string[r].filter(([x, s]) => s));
export const flushNegative = (string) =>
  new NegatableString(string[r].filter(([x, s]) => !s));

export const scaleL = (scalar = 1, string = "") => {
  const pScalar = Math.abs(scalar);
  const rep = string[r];
  const result = [];
  const len = Math.round(pScalar * rep.length);
  for (let i = 0; i < len; i++) {
    result.push(rep[i % rep.length]);
  }
  return scalar < 0
    ? invert(new NegatableString(result))
    : new NegatableString(result);
};
export const scaleR = (scalar = 1, string = "") => {
  const pScalar = Math.abs(scalar);
  const rep = string[r];
  const result = [];
  const len = Math.round(pScalar * rep.length);
  for (let i = 1; i <= len; i++) {
    result.unshift(rep[mod(-i, rep.length)]);
  }
  return scalar < 0
    ? invert(new NegatableString(result))
    : new NegatableString(result);
};
export const scale = (scalarOrString, stringOrScalar) =>
  typeof scalarOrString !== "number"
    ? scaleL(stringOrScalar, scalarOrString)
    : scaleR(scalarOrString, stringOrScalar);
export const consoleIterator = (
  str,
  nColor = NCOLOR,
  pColor = PCOLOR,
  color = COLOR
) => {
  const colors = [];
  const string = str[r]
    .map(([x, negative]) => {
      colors.push(`color:${negative ? nColor : pColor}`);
      return `%c${x}`;
    })
    .concat("%c")
    .join("");
  colors.push(`color:${color}`);
  return [string, ...colors];
};
