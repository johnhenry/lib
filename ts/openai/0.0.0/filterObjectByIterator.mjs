// export default (
//   obj: { [name: string]: any },
//   iterator: Iterable<string> = [],
//   defaults: { [name: string]: any } = {},
// ) => {
//   const newObject: { [name: string]: any } = {};
//   for (const key of iterator) {
//     newObject[key] = obj[key] ?? defaults[key];
//   }
//   return newObject;
// };

export default (obj, iterator = []) => {
  const newObject = {};
  for (const key of iterator) {
    newObject[key] = obj[key];
  }
  return newObject;
};
