// Add custom Javascript directly relevant to your application here.
// TODO: CUSTOM CODE HERE
import textToDOMNodes from "https://johnhenry.github.io/lib/js/text-to-DOM-nodes/0.0.0/index.mjs";
import parseFileURL from "https://johnhenry.github.io/lib/js/parse-file-URL/0.0.0/index.mjs";

const { folder } = parseFileURL(import.meta.url);
const app = globalThis.document.getElementById("app");

app.append(
  ...textToDOMNodes(
    await fetch(`${folder}/../app.htm`).then((res) => res.text())
  )
);
