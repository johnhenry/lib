/**
 * <Module Name>
 *
 */
//  //////////////
//  Dependencies (by location)
//  //////////////
//  Dependencies (external)
import external from "https://...";
//  Dependencies (local)
import local from "./...";
//  Dependencies (derived)
const defaults = () => Object.assign({ thing: external }, { thing: local });
//  //////////////
//  Module Application Programing Interface
//  //////////////
export default ({ thing } = defaults()) => {
  return thing;
};
//  settings
//    generally used to control how application is built (test version, deployment location, etc.talk hea)
//    not used to change the way the applicaton works in meaninful ways
// content:
//    used by module
//  utilities:
//    used by module to transform settings and content into usable components
//  application progamming interface:
//    exported functions and constants representing the module's interface
