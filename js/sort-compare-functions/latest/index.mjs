export const asOrdered =
  (ascending = true) =>
  (a, b) =>
    ascending ? a - b : b - a;

export const byField =
  (field = 0, ascending = true) =>
  (a, b) =>
    asOrdered(ascending)(a[field], b[field]);

export const randomly = () => Math.random() - 0.5;

export const none = () => 0;
export default asOrdered;
