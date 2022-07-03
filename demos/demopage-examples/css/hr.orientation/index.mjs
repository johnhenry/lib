import LIB_LOCATION from "../../../lib-location.mjs";
import loadLocal from "../../load-local.mjs";
import parseURL from "../../parse-url.mjs";
const { folder } = parseURL(import.meta.url);
export default () => loadLocal(folder, "default.htm");
export const style = `
@import url('${LIB_LOCATION}css/hr.orientation/0.0.0/index.css');
@import url('${LIB_LOCATION}css/flex-orientation/0.0.0/index.css');
@import url('${LIB_LOCATION}css/demo-block/0.0.0/index.css');

.application{
  width: 100%;
  height: 100%;
}
.application > div{
  height: 25%;

  place-items:center;
}
.flex-orientation-match, .flex-orientation-reverse {
  display: flex;
}


`;
export const title = "HR Orientation";

export const variations = {
  Flex: { template: () => loadLocal(folder, "flex.htm") },
};
