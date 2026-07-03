#!/usr/bin/env node
// node gen-stops.mjs > stops.css
const STOPS = ["0", "256px", "512px", "1024px"];
const h = function* (min, max) {
  if (min === max) {
    return;
  }
  for (const w of ["width", "height"]) {
    if (max && min) {
      yield `@media (min-${w}: ${min}) and (max-${w}: ${max}) {
  .hide-and-show.hide-and-show-${w}-${min}-${max} {
    display: var(--hide-and-show-display, block);
  }
}`;
    } else if (min) {
      yield `@media (min-${w}: ${min}) {
  .hide-and-show.hide-and-show-${w}-${min} {
    display: var(--hide-and-show-display, block);
  }
}`;
    } else if (max) {
      yield `@media (max-${w}: ${max}) {
  .hide-and-show.hide-and-show-${w}--${max} {
    display: var(--hide-and-show-display, block);
  }
}`;
    }
  }
};
const s = function* (min, max) {
  if (min === max) {
    return;
  }

  for (const w of ["width", "height"]) {
    if (max && min) {
      yield `@media (min-${w}: ${min}) and (max-${w}: ${max}) {
  .show-and-hide.show-and-hide-${w}-${min}-${max} {
    display: none;
  }
}`;
    } else if (min) {
      yield `@media (min-${w}: ${min}) {
  .show-and-hide.show-and-hide-${w}-${min} {
    display: none;
  }
}`;
    } else if (max) {
      yield `@media (max-${w}: ${max}) {
  .show-and-hide.show-and-hide-${w}--${max} {
    display: none;
  }
}`;
    }
  }
};
const hs = function* (min, max) {
  yield* h(min, max);
  yield* s(min, max);
};

const generate = function* (stops) {
  for (let i = 0; i < stops.length; i++) {
    const min = stops[i];
    yield* hs(min);
    yield* hs(undefined, min);
    for (let j = i + 1; j < stops.length; j++) {
      const max = stops[j];
      if (max) {
        yield* hs(min, max);
      }
    }
  }
};
for (const rule of generate(STOPS)) {
  console.log(rule);
}
