import CSSModel from "../../css-model/0.0.0/index.mjs";

const update = function (model, UTC) {
  const date = new Date();
  const second = date[`get${UTC}Seconds`]();
  const minute = date[`get${UTC}Minutes`]();
  const hour24 = date[`get${UTC}Hours`]();
  const weekday = date[`get${UTC}Day`]();
  const monthday = date[`get${UTC}Date`]();
  const month = date[`get${UTC}Month`]();
  const year = date[`get${UTC}FullYear`]();
  const am = hour24 < 12;
  const hour = hour24 === 0 || hour24 === 12 ? 12 : hour24 % 12;
  model.set("second", second);
  model.set("minute", minute);
  model.set("hour", hour);
  model.set("hour24", hour24);
  model.set("weekday", weekday);
  model.set("monthday", monthday);
  model.set("month", month);
  model.set("year", year);
  model.set("am", am ? "1" : "");
  model.set("pm", !am ? "1" : "");
  model.set("ampm", am ? "am" : "pm");
};

const CSSModelDate = class extends CSSModel {
  #interval;
  constructor(
    target = globalThis.document,
    { utc = false, interval } = {},
    prefix = "date"
  ) {
    super(target, prefix + (utc ? "-utc" : ""));
    const utcString = utc ? "UTC" : "";
    update(this, utcString);
    if (typeof interval === "number") {
      this.#interval = setInterval(update, interval, this, utcString);
    }
  }
  clear() {
    clearInterval(this.#interval);
  }
  detach(...args) {
    this.clear();
    super.detach(...args);
  }
};

export default CSSModelDate;
