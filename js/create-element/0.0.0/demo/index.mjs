import _createElement from 'https://johnhenry.github.io/lib/js/create-element/0.0.0/index.mjs'; 
const App = (props) => /* @__PURE__ */ _createElement("", null, /* @__PURE__ */ _createElement("div", {
  ...props
}, /* @__PURE__ */ _createElement("p", null, "Edit ", /* @__PURE__ */ _createElement("code", null, "index.jsx"), " and save to test!")));
const instance = App({ class: "class-app" });
document.getElementById("app").append(instance);
