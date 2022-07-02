import LIB_LOCATION from "../../lib-location.mjs";
const FOLDER = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));
export default () =>
  globalThis.fetch(`${FOLDER}/default.htm`).then((response) => response.text());
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
  More: {
    template: () =>
      globalThis
        .fetch(`${FOLDER}/more.htm`)
        .then((response) => response.text()),
  },
};
