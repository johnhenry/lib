export default ({ direction = "", gap = "1" }) =>
  `<div class="flex-box ${direction}" style="gap:${gap}px">
    <span>This</span>
    <span>is</span>
    <span>sparta</span></div>`;
export const title = "Flex Box Demo";
export const style = `
.flex-box{
  gap: 4px;
  display:flex;
}
.flex-box.v{
  flex-direction:column;
}
.flex-box.h{
  flex-direction:row;
}
`;
const gap = {
  type: "range", //slider,number,date, etc
  default: 1,
  min: 1,
  max: 8,
  step: 1,
};
const direction = {
  type: "select", //slider,number,date, etc
  options: ["", "v", "h"],
  default: undefined,
};

export const variations = {
  default: {
    controls: { gap, direction },
    props: { direction: "", gap: 1 },
  },
  horizontal: {
    controls: { gap },

    props: { direction: "h", gap: 1 },
  },
  vertical: {
    controls: { gap },

    props: { direction: "v", gap: 1 },
  },
};
