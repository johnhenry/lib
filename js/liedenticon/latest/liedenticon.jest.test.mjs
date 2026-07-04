import { SVG, PNG } from "./index.mjs";
import colorToArray from "./color-to-array.mjs";
import hsl2rgb from "./hsl2rgb.mjs";

const HASH = "efb8c90a13f7a1fdc4910";

describe("liedenticon SVG", () => {
  it("generates an svg string by default", () => {
    const svg = String(new SVG(HASH));
    expect(svg.startsWith("<svg xmlns=")).toBe(true);
    expect(svg.endsWith("</svg>")).toBe(true);
    expect(svg).toContain("<rect");
  });
  it("prepends a data-URI preamble when toString is passed true", () => {
    expect(new SVG(HASH).toString(true).startsWith("data:image/svg+xml;utf8,<svg")).toBe(
      true
    );
  });
  it("base64 encodes when toString is passed two truthy arguments", () => {
    const output = new SVG(HASH).toString(true, true);
    expect(output.startsWith("data:image/svg+xml;base64,")).toBe(true);
    const decoded = atob(output.slice("data:image/svg+xml;base64,".length));
    expect(decoded).toBe(new SVG(HASH).toString());
  });
  it("is deterministic per hash and varies across hashes", () => {
    expect(String(new SVG(HASH))).toBe(String(new SVG(HASH)));
    expect(String(new SVG(HASH))).not.toBe(
      String(new SVG("000000000000000000000"))
    );
  });
  it("honors size, foreground, and percentage padding options", () => {
    const svg = String(
      new SVG(HASH, { size: 128, padding: "20%", foreground: "#36c" })
    );
    expect(svg).toContain("width='128'");
    expect(svg).toContain("height='128'");
    expect(svg).toContain("rgba(51,102,204,1)");
  });
  it("rejects non-string hashes", () => {
    expect(() => new SVG(12345)).toThrow("hash must be a string");
  });
});

describe("liedenticon PNG", () => {
  it("generates a base64 data URI by default", () => {
    const output = String(new PNG(HASH));
    expect(output.startsWith("data:image/png;base64,")).toBe(true);
  });
  it("drops the preamble when toString is passed false", () => {
    const raw = new PNG(HASH).toString(false);
    expect(raw.startsWith("data:")).toBe(false);
    const bytes = Buffer.from(raw, "base64");
    // PNG magic number
    expect([...bytes.subarray(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
  });
  it("is deterministic per hash", () => {
    expect(String(new PNG(HASH))).toBe(String(new PNG(HASH)));
  });
  it("rejects non-string hashes", () => {
    expect(() => new PNG(null)).toThrow("hash must be a string");
  });
});

describe("liedenticon colorToArray", () => {
  it("parses hex colors of length 1, 2, 3, 4, 6, and 8", () => {
    expect(colorToArray("f")).toEqual([255, 255, 255, 255]);
    expect(colorToArray("f8")).toEqual([255, 255, 255, 136]);
    expect(colorToArray("#fff")).toEqual([255, 255, 255, 255]);
    expect(colorToArray("123f")).toEqual([17, 34, 51, 255]);
    expect(colorToArray("336699")).toEqual([51, 102, 153, 255]);
    expect(colorToArray("33669980")).toEqual([51, 102, 153, 128]);
  });
  it("parses numeric input as hex", () => {
    expect(colorToArray(0xffffff)).toEqual([255, 255, 255, 255]);
  });
  it("rejects unsupported lengths", () => {
    expect(() => colorToArray("12345")).toThrow("not supported");
    expect(() => colorToArray("123456789")).toThrow("not supported");
  });
});

describe("liedenticon hsl2rgb", () => {
  it("converts hue/saturation/brightness to rgb", () => {
    const [r, g, b] = hsl2rgb(0, 1, 0.5);
    expect(Math.round(r)).toBe(255);
    expect(Math.round(g)).toBe(0);
    expect(Math.round(b)).toBe(0);
  });
});
