const REP = "𝑖";
const createStringRep = ({ r, i }, rep = REP) => {
  const fin = Math.abs(i) === 1 ? "" : rep;
  const op = i < 0 ? "-" : "+";
  const sign = i < 0 ? "-" : "";
  const iA = Math.abs(i);
  if (r && iA) {
    if (i >= 0) {
      return `${r}${op}${iA}${fin}`;
    }
    return `${r}${op}${iA}${fin}`;
  } else if (r) {
    return `${r}`;
  } else if (iA) {
    if (!fin) {
      return `${sign}${rep}`;
    }
    return `${sign}${iA}${fin}`;
  } else {
    return "0";
  }
};
export const ComplexNumber = class {
  constructor(r = undefined, i = undefined, m = undefined, a = undefined) {
    if (typeof m !== "number" && typeof a !== "number") {
      m = Math.sqrt(r ** 2 + i ** 2);
      a = Math.atan2(i, r);
    } else if (typeof r !== "number" && typeof i !== "number") {
      r = m * Math.cos(a);
      i = m * Math.sin(a);
    }
    this.r = r.valueOf();
    this.i = i.valueOf();
    this.m = m.valueOf();
    this.a = a.valueOf();
    this._cachedRep = createStringRep(this);
    Object.freeze(this); // the number itself will be immutable
  }
  toString(rep = undefined) {
    if (rep) {
      return createStringRep(this, rep);
    }
    return this._cachedRep;
  }
  valueOf() {
    return this.r;
  }
  inspect(rep) {
    return this.toString(rep);
  }
};

export const fromRectangular = (real = 0, imaginary = 0) =>
  new ComplexNumber(real, imaginary);
export const fromPolar = (magnitude = 0, angle = 0) =>
  new ComplexNumber(undefined, undefined, magnitude, angle);
export default ComplexNumber;
