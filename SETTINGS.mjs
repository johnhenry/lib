const defaults = {
  TEMPLATE_URL:
    "https://raw.githubusercontent.com/johnhenry/johnhenry.github.io/dist/template/js/index.html",
};
export default defaults;

export const TEMPLATE_URL = process.env.TEMPLATE_URL || defaults.TEMPLATE_URL;
