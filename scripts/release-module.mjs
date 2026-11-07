#!/usr/bin/env node
// Mechanizes what was, until now, a fully manual "copy the whole version
// directory and hand-edit it" operation (how pop-quiz/async-itertools/
// liedenticon were each bumped to 1.0.1 earlier). Copies an existing
// version's source into a new version directory, updates package.json's
// version (and any URL path segments referencing the old version), and
// leaves the rest to you -- this does not publish or commit anything.
//
// Usage:
//   node scripts/release-module.mjs <section>/<name> <newVersion> [--from <version>]
//
// Example:
//   node scripts/release-module.mjs js/pop-quiz 1.0.2
//   node scripts/release-module.mjs js/pop-quiz 1.0.2 --from 1.0.0
//
// After running: hand-edit whatever actually changed in the new directory,
// then `npm run build && node scripts/verify-contract.mjs` before committing.
// Exits non-zero on any validation failure (bad module path, version already
// exists, no existing versions to copy from).

import { readFile, writeFile, cp, stat, readdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { compareVersions, latestOf, isRealVersion } from "./semver-lite.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Regenerated fresh for the new version by build.mjs; copying stale content
// here would just get overwritten (or worse, committed before the first
// build ran).
const GENERATED_PER_VERSION = new Set(["index.html", "test.html", "index.json"]);

const exists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const args = process.argv.slice(2);
const fromFlagIndex = args.indexOf("--from");
const explicitFrom = fromFlagIndex === -1 ? null : args[fromFlagIndex + 1];
const positional =
  fromFlagIndex === -1
    ? args
    : args.filter((_, i) => i !== fromFlagIndex && i !== fromFlagIndex + 1);
const [moduleArg, newVersion] = positional;

if (!moduleArg || !newVersion) {
  console.error(
    "Usage: node scripts/release-module.mjs <section>/<name> <newVersion> [--from <version>]",
  );
  process.exit(1);
}

const slash = moduleArg.indexOf("/");
if (slash === -1) {
  console.error(`Expected <section>/<name>, got: ${moduleArg}`);
  process.exit(1);
}
const section = moduleArg.slice(0, slash);
const name = moduleArg.slice(slash + 1);
const moduleDir = join(ROOT, section, name);

if (!(await exists(moduleDir))) {
  console.error(`No such module directory: ${section}/${name}`);
  process.exit(1);
}

const entries = await readdir(moduleDir, { withFileTypes: true });
const versions = entries
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter(isRealVersion);

if (!versions.length) {
  console.error(
    `${section}/${name} has no existing version directories to release from.`,
  );
  process.exit(1);
}

const fromVersion = explicitFrom ?? latestOf(versions);
if (!versions.includes(fromVersion)) {
  console.error(
    `${section}/${name} has no version "${fromVersion}". Existing versions: ${versions.join(", ")}`,
  );
  process.exit(1);
}

if (versions.includes(newVersion)) {
  console.error(`${section}/${name}/${newVersion} already exists.`);
  process.exit(1);
}
if (compareVersions(newVersion, fromVersion) <= 0) {
  console.warn(
    `⚠️  ${newVersion} does not sort after ${fromVersion} -- continuing anyway, ` +
      `but double check this is the version you meant.`,
  );
}

const fromDir = join(moduleDir, fromVersion);
const toDir = join(moduleDir, newVersion);

await cp(fromDir, toDir, {
  recursive: true,
  filter: (src) => {
    const base = src.split("/").pop() ?? "";
    return !GENERATED_PER_VERSION.has(base);
  },
});
console.log(`📋 copied ${section}/${name}/${fromVersion} -> ${section}/${name}/${newVersion}`);

const pkgPath = join(toDir, "package.json");
if (await exists(pkgPath)) {
  let text = await readFile(pkgPath, "utf8");
  // Catches "version" fields and any URL path segment referencing the old
  // version (homepage, repository.directory, etc.) in one pass.
  const before = text;
  text = text.split(fromVersion).join(newVersion);
  await writeFile(pkgPath, text);
  const replacements = before.split(fromVersion).length - 1;
  console.log(
    `📝 package.json: replaced ${replacements} occurrence(s) of "${fromVersion}" with "${newVersion}"`,
  );
  console.log(
    `   (this includes the version field and any homepage/repository URLs -- review the diff)`,
  );
} else {
  console.log("ℹ️  no package.json in the copied version -- nothing to update there");
}

console.log(`
Next steps:
  1. Edit ${section}/${name}/${newVersion}/ for whatever actually changed.
  2. npm run build && node scripts/verify-contract.mjs
  3. Review the diff, then commit.
`);
