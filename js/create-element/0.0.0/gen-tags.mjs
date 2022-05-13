import HTMLtags from "../../../data/html-tags/0.0.0/latest/data.mjs";
import SVGtags from "../../../data/svg-tags/0.0.0/latest/data.mjs";

const uppercaseList = ["switch", "var"];
const upCaseIfNecessary =
  (...list) =>
  (tag) => {
    if (list.includes(tag)) {
      return tag.charAt(0).toUpperCase() + tag.slice(1);
    }
    return tag;
  };
const upcase = upCaseIfNecessary(...uppercaseList);

Deno.writeTextFileSync("./tags.mjs", `import t from "./index.mjs";` + "\n", {});

for (const tag of HTMLtags.concat(SVGtags)) {
  Deno.writeTextFileSync(
    "./tags.mjs",
    `export const ${upcase(tag).replaceAll(
      "-",
      "_"
    )} = (a, ...c) => t("${tag}", a, ...c);` + "\n",
    { append: true }
  );
}
