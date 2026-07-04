import wrapString from "../../wrap-number-string/0.0.0/index.mjs";
const target = globalThis.document;
export default () => {
  const date = new Date();
  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour24 = date.getHours();
  const weekday = date.getDay();
  const monthday = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const am = hour24 < 12;
  const hour = hour24 === 0 || hour24 === 12 ? 12 : hour24 % 12;
  target.documentElement.style.setProperty("--date-second", second);
  target.documentElement.style.setProperty("--date-minute", minute);
  target.documentElement.style.setProperty("--date-hour", hour);
  target.documentElement.style.setProperty("--date-hour24", hour24);
  target.documentElement.style.setProperty("--date-weekday", weekday);
  target.documentElement.style.setProperty("--date-monthday", monthday);
  target.documentElement.style.setProperty("--date-month", month);
  target.documentElement.style.setProperty("--date-year", year);
  target.documentElement.style.setProperty(
    "--date-am",
    am ? wrapString("am") : ""
  );
  target.documentElement.style.setProperty(
    "--date-pm",
    !am ? wrapString("pm") : ""
  );

  target.documentElement.style.setProperty(
    "--date-second-str",
    wrapString(second, 2)
  );
  target.documentElement.style.setProperty(
    "--date-minute-str",
    wrapString(minute, 2)
  );
  target.documentElement.style.setProperty(
    "--date-hour-str",
    wrapString(hour, 2)
  );
  target.documentElement.style.setProperty(
    "--date-hour24-str",
    wrapString(hour24, 2)
  );
  target.documentElement.style.setProperty(
    "--date-weekday-str",
    wrapString(weekday, 2)
  );
  target.documentElement.style.setProperty(
    "--date-monthday-str",
    wrapString(monthday, 2)
  );
  target.documentElement.style.setProperty(
    "--date-month-str",
    wrapString(month, 2)
  );
  target.documentElement.style.setProperty("--date-year-str", wrapString(year));
};
