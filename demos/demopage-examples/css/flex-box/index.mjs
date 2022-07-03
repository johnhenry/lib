export default ({ direction = "", gap = "1" }) =>
  `<div style="display:flex;gap: ${gap}px${
    direction ? `;flex-direction:${direction}` : ""
  }">
    <span>This</span>
    <span>is</span>
    <span>a</span>
    <span>flexbox</span>
</div>`;
export const title = "Flex Box Example";
const gap = {
  type: "range", //slider,number,date, etc
  description: "set gap between items",
  default: 4,
  min: 1,
  max: 64,
  step: 1,
};

export const variations = {
  default: {
    controls: {
      gap,
      direction: {
        type: "select",
        description: "set flex direction",
        options: ["", "column", "row"],
        default: "",
      },
    },
    props: { direction: "", gap: 4 },
  },
  Horizontal: {
    controls: { gap },

    props: { direction: "row", gap: 4 },
  },
  Vertical: {
    controls: { gap },

    props: { direction: "column", gap: 4 },
  },
};
