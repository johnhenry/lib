import ComplexNumber from "./ComplexNumber.mjs";
import {
  createMultiply,
  createKroneckerProduct,
} from "../matrixmath/0.0.0/index.mjs";

export const add = (alpha = 0, beta = 0) =>
  new ComplexNumber(alpha + beta, alpha.i + beta.i);

export const negate = (alpha = 0) =>
  new ComplexNumber(-1 * alpha, -1 * alpha.i);

export const subtract = (alpha = 0, beta = 0) => add(alpha, negate(beta));

export const multiply = (alpha = 1, beta = 1) => {
  const a = alpha;
  const b = alpha.i;
  const c = beta;
  const d = beta.i;
  return new ComplexNumber(a * c - b * d, a * d + b * c);
};

export const reciprocal = (alpha = 1) => {
  const a = alpha;
  const b = alpha.i;
  const numerator = a ** 2 + b ** 2;
  return new ComplexNumber(a / numerator, -b / numerator);
};

export const divide = (alpha = 0, beta = 0) =>
  multiply(alpha, reciprocal(beta));

export const equal = (alpha = 1, beta = 1) =>
  (alpha.r === beta.r && alpha.i === beta.i) ||
  (alpha.m === beta.m && alpha.a === beta.a);

export const conjugate = (alpha = 1) => new ComplexNumber(alpha.r, -alpha.i);

export const round = (alpha) =>
  new ComplexNumber(Math.round(alpha.r), Math.round(alpha.i));

export const floor = (alpha) =>
  new ComplexNumber(Math.floor(alpha.r), Math.floor(alpha.i));

export const ceil = (alpha) =>
  new ComplexNumber(Math.ceil(alpha.r), Math.ceil(alpha.i));

export const trunc = (alpha, digits = 0) =>
  new ComplexNumber(
    Number(alpha.r.toFixed(digits)),
    Number(alpha.i.toFixed(digits))
  );

export const random = () => new ComplexNumber(Math.random(), Math.random());

export const sqrt = (c) => {
  const { m, a } = c;
  return new ComplexNumber(undefined, undefined, Math.sqrt(m), a / 2);
};
export const naturalLogarithm = (alpha, selector = 0) => {
  return new ComplexNumber(Math.log(alpha.m), alpha.a + 2 * Math.PI * selector);
};
export const logarithm = (alpha, base = Math.E, selectA = 0, selectB = 0) => {
  return divide(
    naturalLogarithm(alpha, selectA),
    naturalLogarithm(base, selectB)
  );
};
export const power2 = (alpha, beta) => {
  if (equal(alpha, 0) && !equal(beta, 0)) {
    return 0;
  }
  const c = beta.r;
  const d = beta.i;
  const multiplier = Math.pow(alpha.m, c) / Math.pow(Math.E, d * alpha.ang);
  const cospart = multiplier * Math.cos(d * Math.log(alpha.m) + c * alpha.ang);
  const sinpart = multiplier * Math.sin(d * Math.log(alpha.m) + c * alpha.ang);
  return new ComplexNumber(cospart, sinpart);
};

export const power = (alpha, beta = 1, selector = 0) => {
  return power2(Math.E, multiply(beta, naturalLogarithm(alpha, selector)));
};
export const matrixMultiply = createMultiply(add, multiply);
export const kroneckerProduct = createKroneckerProduct(multiply);
