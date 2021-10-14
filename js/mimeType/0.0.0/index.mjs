const types = {};
const textensions = {};
import standard from "./standard.mjs";
import other from "./other.mjs";
const define = function (typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function (t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == "*") {
        continue;
      }

      if (!force && ext in types) {
        throw new Error(
          'Attempt to change mapping for "' +
            ext +
            '" extension from "' +
            types[ext] +
            '" to "' +
            type +
            '". Pass `force=true` to allow this, otherwise remove "' +
            ext +
            '" from the list of extensions for "' +
            type +
            '".'
        );
      }

      types[ext] = type;
    }

    // Use first extension as default
    if (force || !textensions[type]) {
      var ext = extensions[0];
      textensions[type] = ext[0] != "*" ? ext : ext.substr(1);
    }
  }
};

define({ ...standard, ...other });

const getType = (path) => {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, "").toLowerCase();
  var ext = last.replace(/^.*\./, "").toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return ((hasDot || !hasPath) && types[ext]) || null;
};
export default getType;
