import characterCount from "./index.mjs";
describe("Character Count", () => {
  test("It should count each character", () => {
    expect(characterCount("ABC")).toEqual({
      A: 1,
      B: 1,
      C: 1,
    });
    expect(characterCount("ABBCCC")).toEqual({
      A: 1,
      B: 2,
      C: 3,
    });
    expect(characterCount("ABCABCABC")).toEqual({
      A: 3,
      B: 3,
      C: 3,
    });
  });
  test("It should treat strigns with codepoints differently", () => {
    expect(characterCount("(👪)")).toEqual({
      "(": 1,
      "👪": 1,
      ")": 1,
    });
    expect(characterCount("(👪)", false)).toEqual({
      "(": 1,
      "\ud83d": 1,
      "\udc6a": 1,
      ")": 1,
    });
  });
});
