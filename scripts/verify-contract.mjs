#!/usr/bin/env node
// Verifies the published URL contract after a build, before deploy.
//
// The dist branch of this repo is served at https://johnhenry.github.io/lib/
// and external applications hot-link files by URL. A deploy must therefore
// never remove a path that was previously published, and a build must never
// rewrite tracked source files (only create new, untracked output).
//
// Checks:
//   1. Every path in contract/dist-manifest.txt exists as a regular file,
//      unless listed in contract/manifest-exceptions.txt.
//   2. `git diff --name-only` is empty — the build only creates files.
//   3. Root index.json parses as an array of {title, url, content} records
//      and every url resolves to a directory containing index.html.
//
// Usage:
//   node scripts/verify-contract.mjs                 (after build, before the
//                                                     .publishignore -> .gitignore swap)
//   node scripts/verify-contract.mjs --deploy-filter (after the swap: additionally
//                                                     assert no published path is
//                                                     ignored, i.e. would be dropped
//                                                     by the deploy action; skips the
//                                                     tree-clean check since the swap
//                                                     legitimately modifies .gitignore)
// Exits non-zero with a report on any violation.

import { readFile, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEPLOY_FILTER = process.argv.includes("--deploy-filter");

// Paths are taken verbatim (no trimming): at least one published filename
// ends with a space (js/liedenticon/0.0.4/.npmrc\x20).
const readLines = async (path) =>
  (await readFile(join(ROOT, path), "utf8"))
    .split("\n")
    .map((line) => line.replace(/\r$/, ""))
    .filter((line) => line !== "" && !line.startsWith("#"));

const isFile = async (path) => {
  try {
    return (await stat(join(ROOT, path))).isFile();
  } catch {
    return false;
  }
};

const failures = [];

// 1. Presence: published paths must still exist.
const manifest = await readLines("contract/dist-manifest.txt");
const exceptions = new Set(
  (await readLines("contract/manifest-exceptions.txt")).map((line) =>
    line.split("#")[0].trim(),
  ),
);
const missing = [];
for (const path of manifest) {
  if (exceptions.has(path)) continue;
  if (!(await isFile(path))) missing.push(path);
}
if (missing.length) {
  failures.push(
    `${missing.length} published path(s) missing after build:\n` +
      missing.map((p) => `  - ${p}`).join("\n"),
  );
}

// 2a. Source immutability: the build may not modify tracked files.
//     (Skipped under --deploy-filter, where the .gitignore swap has
//     legitimately modified the tree.)
if (!DEPLOY_FILTER) {
  const dirty = execFileSync("git", ["diff", "--name-only"], {
    cwd: ROOT,
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean);
  if (dirty.length) {
    failures.push(
      `build modified ${dirty.length} tracked file(s) (builds may only create untracked output):\n` +
        dirty.map((p) => `  - ${p}`).join("\n"),
    );
  }
}

// 2b. Deploy filtering: no published path may be gitignored, or the deploy
//     action will silently drop it from the served branch. Run after the
//     .publishignore -> .gitignore swap so git's real ignore semantics are
//     checked against exactly what the deploy will see. (This caught
//     templates/*.html being in .publishignore despite being published.)
if (DEPLOY_FILTER) {
  const input = manifest.map((p) => p + "\0").join("");
  let ignoredOut = "";
  try {
    ignoredOut = execFileSync(
      "git",
      ["check-ignore", "-z", "--stdin", "--no-index"],
      { cwd: ROOT, encoding: "utf8", input },
    );
  } catch (error) {
    // check-ignore exits 1 when NO paths are ignored - that is success here.
    if (error.status !== 1) throw error;
    ignoredOut = error.stdout ?? "";
  }
  const ignored = ignoredOut.split("\0").filter(Boolean);
  if (ignored.length) {
    failures.push(
      `${ignored.length} published path(s) would be dropped by deploy (gitignored):\n` +
        ignored.map((p) => `  - ${p}`).join("\n"),
    );
  }
}

// 3. Search index shape and referential integrity.
try {
  const index = JSON.parse(await readFile(join(ROOT, "index.json"), "utf8"));
  if (!Array.isArray(index)) throw new Error("index.json is not an array");
  const badRecords = [];
  const badUrls = [];
  for (const record of index) {
    if (
      typeof record?.title !== "string" ||
      typeof record?.url !== "string" ||
      typeof record?.content !== "string"
    ) {
      badRecords.push(JSON.stringify(record).slice(0, 80));
      continue;
    }
    if (!(await isFile(join(record.url, "index.html")))) {
      badUrls.push(record.url);
    }
  }
  if (badRecords.length) {
    failures.push(
      `index.json has ${badRecords.length} record(s) without string title/url/content:\n` +
        badRecords.map((r) => `  - ${r}`).join("\n"),
    );
  }
  if (badUrls.length) {
    failures.push(
      `index.json has ${badUrls.length} url(s) with no index.html:\n` +
        badUrls.map((u) => `  - ${u}`).join("\n"),
    );
  }
} catch (error) {
  failures.push(`root index.json unreadable or invalid: ${error.message}`);
}

if (failures.length) {
  console.error("URL-contract verification FAILED\n");
  for (const failure of failures) console.error(failure + "\n");
  process.exit(1);
}
console.log(
  DEPLOY_FILTER
    ? `URL-contract verification passed: ${manifest.length} published paths intact and none dropped by deploy filtering.`
    : `URL-contract verification passed: ${manifest.length} published paths intact, working tree clean, index.json valid.`,
);
