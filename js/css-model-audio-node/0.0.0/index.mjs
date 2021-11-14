import CSSModel from "../../css-model/0.0.0/index.mjs";
const { AnalyserNode } = globalThis;

export default class extends AnalyserNode {
  #running = false;
  #model;
  #timeDomainData;
  #frequencyData;
  #float;
  constructor(
    context,
    options,
    moreOptions = {},
    target = globalThis.document.documentElement,
    prefix = "audio"
  ) {
    super(context, options);
    this.#model = new CSSModel(target, prefix);
    const { float = false, start = true } = moreOptions;
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
      this.set(`td-${x}`, this.#timeDomainData[x]);
    }
    for (let x = 0; x < this.frequencyBinCount; x++) {
      this.set(`f-${x}`, this.#frequencyData[x]);
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
