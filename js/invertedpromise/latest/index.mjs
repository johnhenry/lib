export default () => {
  const out = {};
  out.promise = new Promise(function (resolve, reject) {
    out.resolve = resolve;
    out.reject = reject;
  });
  return out;
};
