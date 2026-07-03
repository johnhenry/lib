import { RAW, DATE, FILE_NAME, CSV_LABEL } from "./setup.mjs";
import { ensureDirSync } from "https://deno.land/std@0.138.0/fs/mod.ts";
const DIR = `./archived/${DATE}`;
ensureDirSync(DIR);
const STR = JSON.stringify(RAW, null, 2);
// Write RAW
Deno.writeTextFileSync(`${DIR}/${FILE_NAME}`, STR);
// Write JSON
Deno.writeTextFileSync(`${DIR}/${FILE_NAME}.json`, STR);
// Write JS
Deno.writeTextFileSync(`${DIR}/${FILE_NAME}.mjs`, `export default ${STR};`);
// Write HTML
Deno.writeTextFileSync(
  `${DIR}/${FILE_NAME}.html`,
  `<ul>
${RAW.map((tag) => `  <li>${tag}</li>`).join("\n")}
</ul>`
);
// Write CSV
Deno.writeTextFileSync(
  `${DIR}/${FILE_NAME}.csv`,
  CSV_LABEL + "\n" + RAW.join("\n")
);
// Write Date
await Deno.writeTextFile(`./last_refresh`, DATE);
import { copySync } from "https://deno.land/std/fs/mod.ts";

copySync(`${DIR}`, `./latest`, { overwrite: true });
