import print from "./index.mjs";
const self = {
  foo: "bar",
  baz: ["qux"],
  quux: {
    foo: "bar",
    baz: "qux",
    quux: "corge",
  },
};
self.self = self;
print(self);
