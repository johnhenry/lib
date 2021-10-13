import CSSModel from "../css-model@0.0.0/index.mjs";

const update = function (UTC) {
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
  this.set("second", second);
  this.set("minute", minute);
  this.set("hour", hour);
  this.set("hour24", hour24);
  this.set("weekday", weekday);
  this.set("monthday", monthday);
  this.set("month", month);
  this.set("year", year);
  this.set("am",am ? "1" : "");
  this.set("pm",!am ? "1" : "");
  this.set("ampm", am ? "am" : "pm");
};

const CSSModelDate = class extends CSSModel {
  #update;
  #interval;
  constructor(target = globalThis.document,  {utc=false, interval}={}, prefix = "date") {
    super(target, prefix + utc ? "-utc" : "");
    this.#update = update.bind(this, utc ? 'UTC' : '' );
    this.update();
    if(typeof interval === "number"){
      this.#interval = setInterval(this.update, interval);
    }
  }
  clear(){
    clearInterval(this.#interval);
  }
  detach() {
    this.clear();
    delete this.#update;
    return super.detach();
  }
  update() {
    this.#update();
  }
};

export default CSSModelDate;