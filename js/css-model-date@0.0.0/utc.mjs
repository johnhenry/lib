import wrapString from "../wrap-number-string@0.0.0/index.mjs";
const target = globalThis.document;
export default () => {
  const date = new Date();
  const second = date.getUTCSeconds();
  const minute = date.getUTCMinutes();
  const hour24 = date.getUTCHours();
  const weekday = date.getUTCDay();
  const monthday = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const am = hour24 < 12;
  const hour = hour24 === 0 || hour24 === 12 ? 12 : hour24 % 12;
  target.documentElement.style.setProperty("--date-utc-second", second);
  target.documentElement.style.setProperty("--date-utc-minute", minute);
  target.documentElement.style.setProperty("--date-utc-hour", hour);
  target.documentElement.style.setProperty("--date-utc-hour24", hour24);
  target.documentElement.style.setProperty("--date-utc-weekday", weekday);
  target.documentElement.style.setProperty("--date-utc-monthday", monthday);
  target.documentElement.style.setProperty("--date-utc-month", month);
  target.documentElement.style.setProperty("--date-utc-year", year);
  target.documentElement.style.setProperty(
    "--date-utc-am",
    am ? wrapString("am") : ""
  );
  target.documentElement.style.setProperty(
    "--date-utc-pm",
    !am ? wrapString("pm") : ""
  );

  target.documentElement.style.setProperty(
    "--date-utc-second-str",
    wrapString(second, 2)
  );
  target.documentElement.style.setProperty(
    "--date-utc-minute-str",
    wrapString(minute, 2)
  );
  target.documentElement.style.setProperty(
    "--date-utc-hour-str",
    wrapString(hour, 2)
  );
  target.documentElement.style.setProperty(
    "--date-utc-hour24-str",
    wrapString(hour24, 2)
  );
  target.documentElement.style.setProperty(
    "--date-utc-weekday-str",
    wrapString(weekday, 2)
  );
  target.documentElement.style.setProperty(
    "--date-utc-monthday-str",
    wrapString(monthday, 2)
  );
  target.documentElement.style.setProperty(
    "--date-utc-month-str",
    wrapString(month, 2)
  );
  target.documentElement.style.setProperty(
    "--date-utc-year-str",
    wrapString(year)
  );
};
