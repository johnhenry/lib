import collideXY from "./collideXY.mjs";
// Given two arrays, yield pairs of elements that collide.
export default function* (subjects, subs, collide = collideXY, self = false) {
  for (const i of subjects) {
    for (const j of subs) {
      if (collide(i, j, self)) {
        yield [i, j];
      }
    }
  }
}
