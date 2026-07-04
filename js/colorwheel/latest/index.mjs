import hsl2rgb from "./hsl2rgb.mjs";

export default class {
  constructor(
    { saturation, lightness, max = Number.MAX_SAFE_INTEGER } = {
      max: Number.MAX_SAFE_INTEGER,
    }
  ) {
    this.max = max;
    if (saturation) {
      this.saturation = saturation;
    } else {
      this.lightness = lightness;
    }
  }
  color(angle = 0, magnitude = 0, { saturation, lightness } = {}) {
    if (this.saturation !== undefined || saturation !== undefined) {
      return hsl2rgb(
        angle,
        saturation ?? this.saturation,
        magnitude / this.max
      );
    } else {
      return hsl2rgb(angle, magnitude / this.max, (lightness, this.lightness));
    }
  }
}
