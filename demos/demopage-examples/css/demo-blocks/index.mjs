import LIB_LOCATION from "../../../lib-location.mjs";
import loadLocal from "../../load-local.mjs";
import parseURL from "../../parse-url.mjs";
const { folder } = parseURL(import.meta.url);
export default () => loadLocal(folder, "default.htm");
export const style = `
@import url('${LIB_LOCATION}css/demo-block/0.0.0/index.css');
.application{
  width: 100%;
  height: 100%;
  font-size:0px;
}
.application * {
  font-size:medium;
}
`;
export const title = "Demo Block Example";
export const variations = {
  More: { template: () => loadLocal(folder, "more.htm") },
};
