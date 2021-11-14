import CSSModel from "../../css-model/0.0.0/index.mjs";
const { AnalyserNode } = globalThis;

const eightBitToColor = (num, ...order) => {
  const colors = {};
  if (!order.includes("red")) {
    order.push("red");
  }
  if (!order.includes("green")) {
    order.push("green");
  }
  if (!order.includes("blue")) {
    order.push("blue");
  }
  colors[order.shift()] = (224 & num).toString(16).padStart(2, "0");
  colors[order.shift()] = (28 & num).toString(16).padStart(2, "0");
  colors[order.shift()] = (3 & num).toString(16).padStart(2, "0");
  return `#${colors.red}${colors.green}${colors.blue}`;
};

export default class extends AnalyserNode {
  #running = false;
  #model;
  #timeDomainData;
  #frequencyData;
  #float;
  #colorOrder;
  constructor(
    context,
    options,
    moreOptions = {},
    target = globalThis.document.documentElement,
    prefix = "audio"
  ) {
    super(context, options);
    this.#model = new CSSModel(target, prefix);
    const { float = false, start = true, colorOrder } = moreOptions;

    this.#colorOrder = colorOrder;
    this.#float = float;
    if (this.#float) {
      this.#timeDomainData = new Float32Array(this.fftSize);
      this.#frequencyData = new Float32Array(this.frequencyBinCount);
    } else {
      this.#timeDomainData = new Uint8Array(this.fftSize);
      this.#frequencyData = new Uint8Array(this.frequencyBinCount);
    }
    if (start) {
      this.start();
    }
  }
  set(...args) {
    this.#model.set(...args);
  }
  get(...args) {
    this.#model.get(...args);
  }
  loop() {
    if (!this.#running) {
      return;
    }
    if (this.#float) {
      this.getFloatTimeDomainData(this.#timeDomainData);
      this.getFloatFrequencyData(this.#frequencyData);
    } else {
      this.getByteFrequencyData(this.#frequencyData);
      this.getByteTimeDomainData(this.#timeDomainData);
    }
    this.set(
      `total`,
      Math.sqrt(
        this.#timeDomainData.reduce((p, c) => p + c * c, 0) / this.fftSize
      )
    );
    for (let x = 0; x < this.fftSize; x++) {
      if (this.#colorOrder) {
        this.set(
          `td-color-${x}`,
          eightBitToColor(this.#timeDomainData[x], ...this.#colorOrder)
        );
      } else {
        this.set(`td-${x}`, this.#timeDomainData[x]);
      }
    }
    for (let x = 0; x < this.frequencyBinCount; x++) {
      if (this.#colorOrder) {
        this.set(
          `f-color-${x}`,
          eightBitToColor(this.#frequencyData[x], ...this.#colorOrder)
        );
      } else {
        this.set(`f-${x}`, this.#frequencyData[x]);
      }
    }
    globalThis.requestAnimationFrame(() => this.loop());
  }
  pause() {
    this.#running = false;
  }
  async start() {
    this.#running = true;
    this.loop();
  }
}
