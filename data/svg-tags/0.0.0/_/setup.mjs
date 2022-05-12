export const CSV_LABEL = "svg-tag";
import HTML from "../../../html-tags/0.0.0/latest/data.mjs";
import { svgTagNames } from "https://raw.githubusercontent.com/wooorm/svg-tag-names/main/index.js";

export const RAW = svgTagNames.filter((tag) => !HTML.includes(tag));
export const FILE_NAME = "data";
export const DATE = Number(new Date());
