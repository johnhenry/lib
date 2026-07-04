#!/usr/bin/env node
// Finds — and optionally publishes — npm-publishable module versions.
//
// A version directory js/<name>/<version>/ is eligible when its package.json
// has `"publish": true` and its `name` and `version` fields match the
// directory path exactly. Old version directories are frozen published
// bytes; they never carry `publish: true`, so they are never touched.
//
// Usage:
//   node scripts/npm-publish-eligible.mjs            list eligible dirs (one per line)
//   node scripts/npm-publish-eligible.mjs --publish  publish each eligible dir that is
//                                                    not already on the registry
//                                                    (requires NODE_AUTH_TOKEN)
//
// Exits non-zero if --publish is given and any publish attempt fails.

import { readFile, readdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLISH = process.argv.includes("--publish");

const subdirs = async (path) => {
  try {
    return (await readdir(path, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
};

// ---- find eligible version dirs -------------------------------------------

const eligible = [];
for (const name of await subdirs(join(ROOT, "js"))) {
  for (const version of await subdirs(join(ROOT, "js", name))) {
    const dir = join("js", name, version);
    let pkg;
    try {
      pkg = JSON.parse(await readFile(join(ROOT, dir, "package.json"), "utf8"));
    } catch {
      continue; // no package.json (or unparseable): not publishable
    }
    if (pkg.publish !== true) continue;
    if (pkg.name !== name) {
      console.log(`⏭️  skip ${dir}: package name ${pkg.name} != dir name ${name}`);
      continue;
    }
    if (pkg.version !== version) {
      console.log(
        `⏭️  skip ${dir}: package version ${pkg.version} != dir version ${version}`,
      );
      continue;
    }
    eligible.push({ dir, name, version });
  }
}

if (!PUBLISH) {
  for (const { dir } of eligible) {
    console.log(dir);
  }
  process.exit(0);
}

// ---- publish ---------------------------------------------------------------

const npm = (args, options = {}) =>
  spawnSync("npm", args, { cwd: ROOT, encoding: "utf8", ...options });

let failures = 0;
const published = [];
const skipped = [];
for (const { dir, name, version } of eligible) {
  const spec = `${name}@${version}`;
  const view = npm(["view", spec, "version"]);
  if (view.status === 0 && view.stdout.trim() !== "") {
    console.log(`⏭️  skip ${spec}: already published`);
    skipped.push(spec);
    continue;
  }
  console.log(`🚀 publishing ${spec} from ${dir} ...`);
  const publish = npm(["publish", "--provenance", "--access", "public"], {
    cwd: join(ROOT, dir),
    stdio: "inherit",
    encoding: undefined,
  });
  if (publish.status === 0) {
    console.log(`✅ published ${spec}`);
    published.push(spec);
  } else {
    console.error(`❌ failed to publish ${spec} (exit ${publish.status})`);
    failures++;
  }
}

console.log(
  `\nSummary: ${published.length} published [${published.join(", ")}], ` +
    `${skipped.length} skipped [${skipped.join(", ")}], ${failures} failed.`,
);
process.exit(failures ? 1 : 0);
