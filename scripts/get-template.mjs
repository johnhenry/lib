import { TEMPLATE_URL } from "../SETTINGS.mjs";
import fetch from "node-fetch";
import { writeFileSync, existsSync, mkdirSync } from "fs";
!existsSync("templates") && mkdirSync("templates");
const createModule = (str) => `export default (templated) => \`${str}\`;`;
const data = await fetch(TEMPLATE_URL).then((res) => res.text());
writeFileSync("templates/html.mjs", createModule(data));
