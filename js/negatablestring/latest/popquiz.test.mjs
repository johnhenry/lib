// import testing framework
import quiz, { equal, ok, notok } from "../../pop-quiz/0.0.4/index.mjs";

// import library
import "./string-prototype-warn.mjs";
import { negater, scale, concat, equal as strEqual, abs, r } from "./index.mjs";

await quiz("Normal Strings", function* () {
  const SAMPLE_STRING = "sample string";
  yield ok(SAMPLE_STRING[r], "string has rep property");
  yield ok(
    SAMPLE_STRING[r].every(([char, sign]) => !sign),
    'all characters are "positive".'
  );
  yield equal(
    SAMPLE_STRING,
    SAMPLE_STRING[r].map(([char]) => char).join(""),
    'all characters have proper "absolute value".'
  );
});

await quiz(
  "Negative Strings: Create negative string by scaling regular string by -1",
  function* () {
    const DESREVER = "DESREVER";
    const REVERSED = scale(DESREVER, -1);
    yield equal(
      "REVERSED",
      REVERSED.toString().split().reverse().join(""),
      "negative string should be textually reversed"
    );
    yield equal(
      "~R~E~V~E~R~S~E~D",
      REVERSED.toString("~").split().reverse().join(""),
      "negative numbres should be represented by prefix when given passed to toString method"
    );
  }
);

await quiz(
  "Negater: Use specific character to negate characters within string",
  function* () {
    yield ok(strEqual(negater("mississippi"), "mississippi"));
    yield notok(strEqual(negater("m~iss~iss~ipp~i"), "mississippi"));
    yield ok(strEqual(negater("m~iss~iss~ipp~i").toString(), "mississippi"));

    yield ok(strEqual(negater("mis~sis~sip~pi"), "miiii"));
    yield ok(strEqual(negater("mi~ssi~ssi~ppi"), "miiii"));
    yield ok(strEqual(negater("mi~ss~is~si~pp~i"), "m"));
    yield ok(strEqual(negater("1~-1", "-").toString(), "1~1"));
  }
);

await quiz("Concat: Combine negative numbers", function* () {
  const HELLO = "HELLO";
  const GOODBYE = scale("HELLO", -1);
  const COMBO = concat(HELLO, GOODBYE);
  yield equal(HELLO + GOODBYE, concat("HELLO", abs(GOODBYE)).toString());
  yield ok(strEqual(COMBO, ""));
});
