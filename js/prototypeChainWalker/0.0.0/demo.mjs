import prototypeChainWalker from "./index.mjs";

const SuperString = class extends String {
  superStringThing;
};
const SuperDuperString = class extends SuperString {
  superDuperStringThing;
};

console.log(
  ...prototypeChainWalker(
    new SuperDuperString("this is a string"),
    (object, index) => ({
      index,
      object,
      keys: Object.keys(object),
    })
  )
);
