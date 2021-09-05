const DEFAULT_TIME_RESOLUTION;
export const clear = clearInterval;
const setIntervalAlarm = (func, options, ...args) => {
  let interval;
  let date;
  let time;
  if(options instanceof Date){
    date = options;
    time = DEFAULT_TIME_RESOLUTION;
  }else{
    date = options.date;
    time = options.time ?? DEFAULT_TIME_RESOLUTION;
  }
  if (!(date instanceof Date)) {
    throw new Error("date must be instance of date");
  }
  const go = async () => {
    if (new Date() >= date) {
      clearInterval(interval);
      func(...args);
    }
  };
  interval = setInterval(go, time);
  return interval;
};
export default setIntervalAlarm;
