import local from "./local.mjs";
import utc from "./utc.mjs";
const REFRESH_MILLISECONDS = 500;
setInterval(local, REFRESH_MILLISECONDS);
setInterval(utc, REFRESH_MILLISECONDS);
