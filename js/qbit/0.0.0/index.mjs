import {
  add,
  subtract,
  multiply,
  divide,
  sqrt,
  power,
  negate,
  matrixMultiply,
} from "../complexnumber/0.0.0/ComplexMath.mjs";
import i from "../complexnumber/0.0.0/i.mjs";
import "../complexnumber/0.0.0/number-prototype.mjs";
export const QBit = class {
  constructor(
    ket0 = Math.SQRT1_2,
    ket1 = sqrt(subtract(1, multiply(ket0, ket0)))
  ) {
    this.ket0 = ket0;
    this.ket1 = ket1;
  }
  valueOf() {
    return (
      this.val ??
      (this.val =
        Math.random() < Math.abs(multiply(this.ket0, this.ket0)) ? 0 : 1)
    );
  }
  toString() {
    return `${this.ket0}|0⟩ + ${this.ket1}|1⟩`;
  }
  get measured() {
    return this.val !== undefined;
  }
};
export const Bit = class extends QBit {
  constructor(val = 0) {
    super(1 - val, val);
    this.val = val;
    Object.freeze(this);
  }
  valueOf() {
    return this.val;
  }
};

export const matrixTransform = (matrix) => (qbit) =>
  new QBit(...matrixMultiply(matrix, [[qbit.ket0], [qbit.ket1]]).flat());

export const H = matrixTransform([
  [Math.SQRT1_2, Math.SQRT1_2],
  [Math.SQRT1_2, -1 * Math.SQRT1_2],
]);

export const phaseShift = (phi) =>
  matrixTransform([
    [1, 0],
    [0, power(Math.E, multiply(i, phi))],
  ]);

export const X = matrixTransform([
  [0, 1],
  [1, 0],
]);

export const Y = matrixTransform([
  [0, negate(i)],
  [i, 0],
]);

export const Z = matrixTransform([
  [1, 0],
  [0, -1],
]);

// export const Z = phaseShift(Math.PI);

export const T = phaseShift(Math.PI / 4);

export const sNOT = matrixTransform([
  [divide(add(1, i), 2), subtract(subtract(1, i), 2)],
  [subtract(subtract(1, i), 2), divide(add(1, i), 2)],
]);

export const Word = (...values) => {
  let val;
  return {
    bitAt(index) {
      return values[index];
    },
    valueOf() {
      if (val !== undefined) {
        return val;
      }
      val = 0;
      for (let i = values.length - 1; i >= 0; i--) {
        const m = values.length - 1 - i;
        val += values[i] * 2 ** m;
      }
      return val;
    },
  };
};

export const Byte = (...values) => {
  while (values.length > 8) {
    values.pop();
  }
  while (values.length < 8) {
    values.unshift(Bit(0));
  }
  return Word(...values);
};
