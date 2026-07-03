export const map = (matrix, mapper) =>
  matrix.map((row) => {
    return typeof row.map === "function" ? row.map(mapper) : mapper(row);
  });
export const width = (matrix) => matrix[0].length;
export const height = (matrix) => matrix.length;
export const row = (matrix, index) => matrix[index];
export const column = (matrix, index) => {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix[i][index]);
  }
  return result;
};
export const createCombine =
  (combiner = (a, b) => a + b) =>
  (alpha, beta) => {
    if (!beta) {
      return alpha;
    }
    if (!alpha) {
      return beta;
    }
    const result = [];
    for (let i = 0; i < alpha.length; i++) {
      if (Array.isArray(alpha[i])) {
        const r = [];
        for (let j = 0; j < alpha[i].length; j++) {
          r.push(combiner(alpha[i][j], beta[i][j]));
        }
      } else {
        result.push(combiner(alpha[i], beta[i]));
      }
    }
    return result;
  };

export const createKroneckerProduct =
  (multiply = a * b) =>
  (alpha, beta) => {
    return [...new Array(alpha.length)].map((_, index) =>
      map(beta, (b) => multiply(b, alpha[index]))
    );
  };
export const collapse = (
  vector = [],
  binaryOperation = (a, b) => a + b,
  defaultObject = 0
) => {
  if (vector.length === 0) {
    return defaultObject;
  }

  if (vector.length === 1) {
    return vector[0];
  }
  const [a, b, ...newVector] = vector;
  newVector.unshift(binaryOperation(a, b));
  return collapse(newVector, binaryOperation, defaultObject);
};

export const createMultiply =
  (add = (a, b) => a + b, multiply = (a, b) => a * b) =>
  (alpha, beta) => {
    const kroneckerProduct = createKroneckerProduct(multiply);
    const kroneckerList = [];
    for (let i = 0; i < width(alpha); i++) {
      // console.log(column(alpha,i));
      // console.log(row(beta,i))
      // console.log(kroneckerProduct(column(alpha,i),row(beta,i)))
      kroneckerList.push(kroneckerProduct(column(alpha, i), row(beta, i)));
    }
    return collapse(kroneckerList, createCombine(add));
    return kroneckerList.reduce(createCombine(add), null);
  };

export const createMultiplyOld =
  (add = (a, b) => a + b, multiply = (a, b) => a * b) =>
  (alpha, beta) => {
    // works for alpha 2x2 beta 2x1 matrices;
    // TODO: expand for generic matrix multiplication
    const [[a, b], [c, d]] = alpha;
    const [[e], [f]] = beta;
    const h = add(multiply(a, e), multiply(b, f));
    const i = add(multiply(c, e), multiply(d, f));
    return [[h], [i]];
  };
