import query from "https://johnhenry.github.io/lib/js/url-params/0.0.0/query.mjs";
import { currentHash } from "../../js/url-params/0.0.0/hash.mjs";
import w3CodeColor from "./w3-code-color.mjs";
const SETTINGS_LOCATION = query.settings
  ? decodeURIComponent(query.settings)
  : "./settings.mjs";

const { sections, preWrap, postWrap, frameStyle } = await import(
  SETTINGS_LOCATION
);
const fullFrameStyle =
  frameStyle ??
  `
html, body {
  display: contents;
  width: 100%;
  height: 100%;
}
`;
const demoList = document.querySelector("#demo-list");
const renderFrame = document.querySelector("#render-frame");
const controls = document.querySelector("#controls");
const sourcePre = document.querySelector("#source-pre");
const sourceMain = document.querySelector("#source-main");
const sourcePost = document.querySelector("#source-post");
const handlers = {};
const environments = {};

const createMenu = async () => {
  let sectionCounter = 0;
  let ele;
  for (const [sectionTitle, urls] of Object.entries(sections)) {
    ele = globalThis.document.createElement("h2");
    ele.innerText = sectionTitle ?? `section:[${sectionCounter}]`;
    demoList.appendChild(ele);
    let demoCounter = 0;
    for (const url of urls) {
      const gid = `${sectionCounter}-${demoCounter}`;
      const {
        title: demoTitle = `demo [${gid}]`,
        controls,
        variations,
        default: template = () => "",
        style = "",
        styles = [],
        script = "",
        scripts = [],
        scriptsPost = [],
      } = await import(url);
      ele = globalThis.document.createElement("h3");
      ele.innerText = demoTitle;
      ele.setAttribute("data-target", gid);
      demoList.appendChild(ele);
      handlers[gid] = {
        template,
        title: demoTitle,
        controls,
        style,
        styles,
        script,
        scripts,
        scriptsPost,
        ...(variations?.default || {}),
      };
      environments[gid] = {};
      if (variations) {
        let variationCounter = 0;
        // if (!variations.default) {
        //   variations.default = {};
        // }
        for (const [variationTitle, variation] of Object.entries(variations)) {
          if (variationTitle === "default") {
            variationCounter += 1;
            continue;
          }
          const vid = `${sectionCounter}-${demoCounter}-${variationCounter}`;
          const finalVariationTitle = `${demoTitle}: ${
            variationTitle ?? `variation: [${vid}]`
          }`;
          ele = globalThis.document.createElement("p");
          ele.innerText = finalVariationTitle;
          ele.setAttribute("data-target", vid);
          demoList.appendChild(ele);
          handlers[vid] = {
            template,
            title: finalVariationTitle,
            style,
            styles,
            script,
            scripts,
            scriptsPost,
            ...variation,
          };
          environments[vid] = {};
          variationCounter += 1;
        }
      }
      demoCounter += 1;
    }
    sectionCounter += 1;
  }
};
const gen = (id, environment = environments[id]) => {
  if (!handlers[id]) {
    return;
  }
  const preMain = [];
  const {
    props = {},
    title = "",
    template = "",
    style = "",
    script = "",
    styles = [],
    scripts = [],
    controls = [],
  } = handlers[id];
  const main =
    typeof template === "function"
      ? async () => template({ ...props, ...environment })
      : async () => template;
  preMain.push(`<!DOCTYPE html>
      <html>
      <head>
      <title>${title}</title>
      <style>
        ${fullFrameStyle}
      </style>
      <style>
        ${style}
      </style>`);
  for (const href of styles) {
    preMain.push(`<link rel="stylesheet" href="${href}" />`);
  }
  preMain.push(`<script type="module" >${script}</script>`);
  for (const src of scripts) {
    preMain.push(`<script type="module" src="${src}" ></script>`);
  }
  preMain.push(`<head><body>`);
  if (preWrap) {
    preMain.push(preWrap);
  }
  const ctrls = [
    `<span>name</span><span>description</span><span>control</span>`,
  ];
  const env = `data-env="${id}"`;
  for (const [name, control] of Object.entries(controls)) {
    const value = environment[name] ?? control.default;
    switch (control.type) {
      case "text-area":
        ctrls.push(
          `<span>${name}</span><span>${
            control.description || ""
          }</span><span><textarea ${env} name="${name}">${value}</textarea></span>`
        );
        break;
      case "select":
        ctrls.push(
          `<span>${name}</span><span>${
            control.description || ""
          }</span><span><select ${env} name="${name}">`
        );
        for (const option of control.options) {
          ctrls.push(
            `<option ${
              option === value ? "selected" : ""
            } value="${option}">${option}</option>`
          );
        }
        ctrls.push(`</select></span></tr>`);
        break;
      default: {
        const attributes = [];
        switch (control.type) {
          case "range":
            if ("min" in control) {
              attributes.push(["min", control.min]);
            }
            if ("max" in control) {
              attributes.push(["max", control.max]);
            }
            if ("step" in control) {
              attributes.push(["step", control.step]);
            }
            break;
          default:
            break;
        }
        const As = attributes
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ");
        ctrls.push(
          `<span>${name}</span><span>${
            control.description || ""
          }</span><span><input ${env} value=${value}  name="${name}" type="${
            control.type
          }" ${As} /></span>`
        );
        break;
      }
    }
  }
  ctrls.push("</table>");
  const postMain = postWrap
    ? [postWrap, `</body>`, `</html>`]
    : [`</body>`, `</html>`];
  return {
    title,
    preMain,
    main,
    postMain,
    controls: ctrls.join("\n"),
  };
};
const writeSource = async (generated) => {
  sourcePre.title = generated.preMain.join("\n");
  sourceMain.title = generated.title;
  sourcePost.title = generated.postMain.join("\n");
  document.getElementById("experiment-title").innerText = generated.title;
  const src = await generated.main();
  if (generated.src !== renderFrame.src) {
    renderFrame.src = `data:text/html;charset=utf-8,${encodeURIComponent(
      [...generated.preMain, src.trim(), generated.postMain].join("\n")
    )}`;
    sourceMain.innerText = src.trim();
    w3CodeColor(sourceMain);
  }
};
const selectDemo = ({ target }) => {
  const id = target.dataset["target"];
  const generated = gen(id);
  if (generated) {
    controls.innerHTML = generated.controls;
    writeSource(generated);
  }
};
const setHash = function ({ target }) {
  const id = target.dataset["target"];
  if (id) {
    globalThis.location.hash = `target=${id}`;
  }
};
const updateControls = ({ target }) => {
  const id = target.dataset.env;
  const environment = environments[id];
  environment[target.name] = target.value.trim();
  const generated = gen(id);
  if (generated) {
    writeSource(generated);
  }
};
const debounce =
  (func, time = 100, timeout) =>
  (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, time, ...args);
  };
const readHash = () => {
  selectDemo({
    target: { dataset: { target: currentHash().target || "0-0" } },
  });
};
demoList.addEventListener("click", setHash);
controls.addEventListener("input", debounce(updateControls));
globalThis.addEventListener("hashchange", readHash);
await createMenu();
readHash();
