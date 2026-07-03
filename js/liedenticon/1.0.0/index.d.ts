export type Color =
  | string
  | number
  | [number, number, number]
  | [number, number, number, number];

export interface GraphicOptions {
  /** Image width/height in pixels. Default 64. */
  size?: number;
  /** Padding as a fraction of size, a numeric string, or a percentage string such as "20%". Default 0. */
  padding?: number | string;
  /** Foreground color saturation (0–1) when derived from the hash. Default 0.75. */
  saturation?: number;
  /** Foreground color brightness (0–1) when derived from the hash. Default 0.5. */
  brightness?: number;
  /** Background color. Default transparent ([0, 0, 0, 0]). */
  background?: Color;
  /** Foreground color. Defaults to a hue derived from the hash. */
  foreground?: Color;
}

/**
 * A hash represented as an SVG.
 */
export class SVG {
  constructor(hash: string, options?: GraphicOptions);
  /**
   * @param preamble prepend a data-URI preamble. Default false.
   * @param base64 base64-encode the SVG. Default false.
   */
  toString(preamble?: boolean, base64?: boolean): string;
}

/**
 * A hash represented as a PNG.
 */
export class PNG {
  constructor(hash: string, options?: GraphicOptions);
  /**
   * @param preamble prepend a data-URI preamble. Default true.
   */
  toString(preamble?: boolean): string;
}
