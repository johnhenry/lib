// Thin deprecated alias -- this is a strict subset of what simple-element's
// shadowOpen already does. See simple-element/0.0.0/readme.md, "Composing
// content in an open shadow root".
import { shadowOpen } from "../../simple-element/0.0.0/index.mjs";
export default shadowOpen`<slot />`;
