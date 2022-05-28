// insert into prototype chain.
const assignPrototypes = (...prototypeChain) => {
  for (let i = 0; i < prototypeChain.length; i++) {
    const [item, prototype] = prototypeChain.slice(i);
    if (item === undefined || prototype === undefined) {
      break;
    }
    Object.setPrototypeOf(item, prototype);
  }
  return prototypeChain[0];
};

export default assignPrototypes;
