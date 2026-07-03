const { log } = console;
const SELF_REF_MARKER = "[!SELF REF!]";
// Print dictionary
const dictionaryPrint = (
  dictionary,
  print = log,
  time = true,
  prefix = "",
  done = new Set([dictionary])
) => {
  time && print(new Date().toString());
  for (const [key, value] of Object.entries(dictionary)) {
    if (typeof value === "object" && value !== null) {
      if (done.has(value)) {
        print(`${prefix}${key}: ${SELF_REF_MARKER}`);
      } else {
        done.add(value);
        dictionaryPrint(value, print, false, `${prefix} `, done);
      }
    } else {
      print(`${prefix}${key}:`, value);
    }
  }
};

export default dictionaryPrint;
