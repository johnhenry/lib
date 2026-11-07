import quiz, {
  ok,
  notok,
  equal,
  notequal,
  deepequal,
  pass,
  fail,
  subtestpass,
  subtestfail,
  throws,
  doesnotthrow,
} from "./index.mjs";
import { run, print } from "./TAPRunner.mjs";
import TestError from "./testerror.mjs";
import { unique } from "./unique/index.mjs";
import { DefaultMessage as DefaultMessageOK } from "./assertions/ok.mjs";
import { DefaultMessage as DefaultMessageEqual } from "./assertions/equal.mjs";

describe("pop-quiz assertions", () => {
  it("passes each assertion when its condition is satisfied", async () => {
    const results = [
      pass("pass should always pass"),
      ok(true, "ok passes on truthy"),
      notok(false, "notok passes on falsy"),
      equal(1, 1, "equal passes on strict equality"),
      notequal(1, 2, "notequal passes on strict inequality"),
      deepequal({ a: 1, b: 0 }, { b: 0, a: 1 }, "deepequal passes on deep equality"),
      await subtestpass(function* () {
        yield pass();
      }, "subtestpass passes when subtest passes"),
      await subtestfail(function* () {
        yield fail();
      }, "subtestfail passes when subtest fails"),
      await throws(() => {
        throw new Error("");
      }, "throws passes when function throws"),
      await doesnotthrow(() => {}, "doesnotthrow passes when function does not throw"),
    ];
    for (const result of results) {
      expect(result).not.toBeInstanceOf(TestError);
      expect(typeof result).toBe("string");
    }
  });

  it("fails each assertion when its condition is violated", async () => {
    const results = [
      fail(),
      ok(false),
      notok(true),
      equal(1, 2),
      notequal(1, 1),
      deepequal({ a: 1, b: 0 }, { a: 1 }),
      await subtestpass(function* () {
        yield fail();
      }),
      await subtestfail(function* () {
        yield pass();
      }),
      await throws(() => {}),
      await doesnotthrow(() => {
        throw new Error("");
      }),
    ];
    for (const result of results) {
      expect(result).toBeInstanceOf(TestError);
    }
  });

  it("uses default messages when none are given", () => {
    expect(ok(1)).toBe(DefaultMessageOK);
    expect(equal(1, 1)).toBe(DefaultMessageEqual);
  });

  it("supports async assertion targets", async () => {
    expect(
      await throws(async () => {
        throw new Error("boom");
      })
    ).not.toBeInstanceOf(TestError);
    expect(await doesnotthrow(async () => 1)).not.toBeInstanceOf(TestError);
  });
});

describe("pop-quiz run", () => {
  it("yields raw results (message strings and TestErrors)", async () => {
    const outputs = [];
    for await (const output of run(function* () {
      yield ok(true, "first");
      yield ok(false, "second");
    })) {
      outputs.push(output);
    }
    expect(outputs).toHaveLength(2);
    expect(outputs[0]).toBe("first");
    expect(outputs[1]).toBeInstanceOf(TestError);
    expect(outputs[1].message).toBe("second");
  });

  it("yields the title first when given", async () => {
    const outputs = [];
    for await (const output of run(function* () {
      yield pass("only");
    }, "my title")) {
      outputs.push(output);
    }
    expect(outputs[0]).toBe("my title");
    expect(outputs[1]).toBe("only");
  });

  it("supports plan() and rejects calling plan twice", async () => {
    const outputs = [];
    for await (const output of run(function* (plan) {
      plan(2);
      yield pass("a");
      yield pass("b");
    })) {
      outputs.push(output);
    }
    expect(outputs).toEqual(["a", "b"]);
    await expect(async () => {
      for await (const output of run(function* (plan) {
        plan(1);
        plan(1);
        yield pass();
      })) {
        void output;
      }
    }).rejects.toThrow("do not call plan more than once");
  });
});

describe("pop-quiz print (default export)", () => {
  it("prints TAP output for passing and failing assertions", async () => {
    const logs = [];
    const errors = [];
    await print(
      function* () {
        yield ok(true, "yes");
        yield ok(false, "no");
      },
      "tap title",
      (line) => logs.push(line),
      (line) => errors.push(line)
    );
    const all = logs.join("\n");
    expect(logs[0]).toBe("TAP version 13");
    expect(all).toContain("tap title");
    expect(all).toContain("ok 1 - yes");
    expect(all).toContain("not ok 2 - no");
    expect(all).toContain("# tests 2");
    expect(all).toContain("# pass  1");
    expect(all).toContain("# fail  1");
  });

  it("quiz(title, test) resolves without throwing", async () => {
    const log = () => {};
    // The default export routes through print(); silence console output.
    const originalLog = console.log;
    const originalError = console.error;
    console.log = log;
    console.error = log;
    try {
      await quiz("quiet quiz", function* () {
        yield pass();
      });
      await quiz(function* () {
        yield pass();
      });
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  });
});

describe("pop-quiz unique", () => {
  it("generates unique values of each kind", () => {
    const numbers = unique();
    expect(numbers.next().value).toBe(0);
    expect(numbers.next().value).toBe(1);
    const strings = unique("string", "id");
    expect(strings.next().value).toBe("id:0");
    expect(strings.next().value).toBe("id:1");
    const bigints = unique("bigint");
    expect(bigints.next().value).toBe(0n);
    const symbols = unique("symbol", "sym");
    expect(symbols.next().value).toBe(Symbol.for("sym:0"));
  });
});
