const makeStops = function (
  { from, to, unit = "", frames } = { from: 0, to: 0, unit: "", frames: 1 }
) {
  const step = (to - from) / frames;
  const stops = [];
  stops.push(`${from}${unit}`);
  let cursor = from + step;
  do {
    stops.push(`${cursor++}${unit}`);
  } while (cursor <= to);
  stops.push(`${to}${unit}`);
  return stops;
};

const next = (target, prop, values) => {
  target[prop] = values.shift();
  if (values.length) {
    window.requestAnimationFrame(() => next(target, prop, values));
  }
};

const styleAnimator = (element) => {
  return new Proxy(element.style, {
    // get(target, prop, receiver) {
    //   return Reflect.get(target, prop, receiver);
    // },
    async set(target, prop, value, reciever) {
      if (prop in target) {
        const kind = typeof value;
        if (value === null || typeof value !== "object") {
          target[prop] = value;
        } else {
          let [f, fu] = [0, ""];
          if (/(\d+)(\D+)?/.exec(target[prop])) {
            [, f, fu] = /(\d+)(\D+)?/.exec(target[prop]);
          }
          const { from = Number(f) || 0, to, unit = fu, frames = 1 } = value;
          next(target, prop, makeStops({ from, to, frames, unit }));
        }
      }
    },
  });
};
export default styleAnimator;
