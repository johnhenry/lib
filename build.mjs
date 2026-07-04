#!/usr/bin/env node
// Site generator for johnhenry.github.io/lib.
//
// Node port of build.sh + script.sh (kept in the repo for reference — they
// are published URLs and must not be deleted). Requires Node >= 20 and the
// `marked` package; no pandoc, jq, awk, or envsubst.
//
// Produces exactly the generated-file set the shell build produced, PLUS a
// generated <module>/latest/ alias directory per module (see buildLatestAlias
// below -- new in this version of build.mjs, additive-only). Content of
// generated files may differ from the shell build; paths may not (frozen
// version directories are never modified). Enforced by
// scripts/verify-contract.mjs.
//
// Intentional non-goals, preserved from the shell build's actual behavior:
//   - No TypeScript compilation: the shell's deno-bundle step was commented
//     out; ts/ modules are published as source.
//   - Search stays on the vendored lunr (vendor/js/lunr/2.3.9): _search.html
//     is a frozen published source file that imports it.

import { readFile, writeFile, readdir, stat, rm, cp } from "node:fs/promises";
import { dirname, join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { compareVersions, isRealVersion } from "./scripts/semver-lite.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)));
const SECTIONS = ["js", "css", "html", "bash"];
const INFILE = "_index.html";
const OUTFILE = "index.html";
// Per-version-directory files that buildVersionDocs (re)generates. Excluded
// when mirroring a version's source into latest/, since latest/ gets its
// own fresh copies of these from its own buildVersionDocs call.
const GENERATED_PER_VERSION = new Set(["index.html", "test.html", "index.json"]);

// ---------- helpers ----------

// Rewrite relative *.md links to *.html (what links-to-html.lua was written
// for but the shell build never invoked).
marked.use({
  walkTokens(token) {
    if (
      token.type === "link" &&
      typeof token.href === "string" &&
      !/^[a-z]+:\/\//i.test(token.href) &&
      /\.md(#.*)?$/i.test(token.href)
    ) {
      token.href = token.href.replace(/\.md(#.*)?$/i, ".html$1");
    }
  },
});

// Pandoc gave every heading an id (e.g. <h2 id="usage">); deep links to those
// anchors exist in the wild, so reproduce pandoc's slug algorithm: keep
// [word chars . : -], spaces to hyphens, and de-duplicate with -1, -2, ...
const slugify = (html) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z#0-9]+;/gi, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

let usedSlugs = new Set();
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      const base = slugify(html);
      let id = base;
      for (let n = 1; usedSlugs.has(id); n++) id = `${base}-${n}`;
      usedSlugs.add(id);
      return `<h${depth} id="${id}">${html}</h${depth}>\n`;
    },
  },
});

const renderMarkdown = (md) => {
  usedSlugs = new Set();
  return marked.parse(md);
};

let templateParts = null;
const wrapInTemplate = async (bodyHtml) => {
  if (!templateParts) {
    // templates/start.html is a complete document ending "<body></body></html>";
    // the shell build concatenated content *after* it (malformed HTML). We
    // splice into the body instead. templates/end.html is retained on disk as
    // a published URL but is not needed here.
    const start = await readFile(join(ROOT, "templates/start.html"), "utf8");
    const marker = "<body></body>";
    const at = start.lastIndexOf(marker);
    if (at === -1)
      throw new Error("templates/start.html: no <body></body> to splice into");
    templateParts = [
      start.slice(0, at) + "<body>",
      "</body>" + start.slice(at + marker.length),
    ];
  }
  return templateParts[0] + "\n" + bodyHtml + "\n" + templateParts[1];
};

const stripTags = (html) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isDir = async (path) => {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
};

const exists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const subdirs = async (path) => {
  const entries = await readdir(path, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();
};

const latestOf = (versions) => [...versions].sort(compareVersions).at(-1);

const writeGenerated = async (relPath, content) => {
  await writeFile(join(ROOT, relPath), content);
  console.log(`🏭 ${relPath}`);
};

// ---------- stages (1:1 with the shell functions they replace) ----------

// Ports build_indicies(): a <ul> of child directories, recursively, DEPTH deep.
// With depth 2: section index + one index per module dir. Version dirs (depth 0)
// are handled by buildModule instead.
async function buildIndices(top, depth) {
  if (depth <= 0) return;
  const children = await subdirs(join(ROOT, top));
  const items = children
    .map((child) => `<li><a href="${child}">${child}</a></li>`)
    .join("");
  await writeGenerated(
    join(top, OUTFILE),
    await wrapInTemplate(`<ul>${items}</ul>`),
  );
  for (const child of children) {
    await buildIndices(join(top, child), depth - 1);
  }
}

// Generates the docs page + test harness for ONE version directory.
async function buildVersionDocs(name, versionDir) {
  const absDir = join(ROOT, versionDir);

  // Documentation -> index.html
  if (await exists(join(absDir, INFILE))) {
    const body = await readFile(join(absDir, INFILE), "utf8");
    await writeGenerated(join(versionDir, OUTFILE), await wrapInTemplate(body));
  } else if (await exists(join(absDir, "readme.md"))) {
    const md = await readFile(join(absDir, "readme.md"), "utf8");
    await writeGenerated(
      join(versionDir, OUTFILE),
      await wrapInTemplate(renderMarkdown(md)),
    );
  }

  // Test harness (no current module has tester.test.mjs; kept for parity)
  if (await exists(join(absDir, "tester.test.mjs"))) {
    await writeGenerated(
      join(versionDir, "test.html"),
      `<html><head><script type="module" src="./tester.test.mjs"></script></head>` +
        `<body><h1>Test for ${name}</h1><h2>Open console for logs.</h2></body></html>`,
    );
  }
}

// Ports latest_version(), with one deliberate extension: docs pages are
// generated for EVERY version that has documentation, not just the latest.
// The shell only built the latest version's page, which meant releasing a
// new version silently abandoned the previous version's published
// /index.html URL (caught by verify-contract when 1.0.0 dirs landed beside
// 0.0.x). The search record still comes from the latest version only.
async function buildModule(section, name) {
  const moduleDir = join(section, name);
  // "latest" is itself a generated alias directory (see buildLatestAlias) --
  // exclude it from the set of real version directories being compared.
  const versions = (await subdirs(join(ROOT, moduleDir))).filter(isRealVersion);
  // A module with no version subdirs (the pre-versioning flat layout, e.g.
  // js/symver-compare@latest) is indexed as itself: the shell's empty-VERSION
  // path read the module dir's own index.html (generated by buildIndices) and
  // emitted a record with a trailing-slash url.
  const version = versions.length ? latestOf(versions) : "";
  const versionDir = versions.length
    ? join(moduleDir, version)
    : `${moduleDir}/`;
  const absDir = join(ROOT, versionDir);

  for (const v of versions.length ? versions : [""]) {
    await buildVersionDocs(
      name,
      versions.length ? join(moduleDir, v) : versionDir,
    );
  }

  if (versions.length) {
    await buildLatestAlias(name, moduleDir, absDir);
  }

  // Search record — only when the version dir ended up with an index.html
  // (generated above, or checked in as source).
  if (await exists(join(absDir, OUTFILE))) {
    const html = await readFile(join(absDir, OUTFILE), "utf8");
    return [{ title: name, url: versionDir, content: stripTags(html) }];
  }
  return [];
}

// Mirrors the highest version's source files into <module>/latest/ -- a
// stable, always-current import path. This is what script.sh's
// latest_version() intended (it echoed "Copying latest version..." but the
// actual `cp` was never written) and what the author's own todo.md asked
// for ("auto-generate index pages" implied a stable current-version URL).
// latest/ is regenerated from scratch on every build (wiped and re-copied),
// so it must never be treated as a real, frozen version directory -- see
// isRealVersion. Generated per-version files (index.html/test.html/
// index.json) are excluded from the copy and rebuilt fresh by
// buildVersionDocs so latest/ gets its own working docs page. Deliberately
// NOT added to the search index: it would just duplicate the real version's
// record under a second URL.
async function buildLatestAlias(name, moduleDir, sourceAbsDir) {
  const latestDir = join(moduleDir, "latest");
  const latestAbsDir = join(ROOT, latestDir);
  await rm(latestAbsDir, { recursive: true, force: true });
  await cp(sourceAbsDir, latestAbsDir, {
    recursive: true,
    filter: (src) => !GENERATED_PER_VERSION.has(basename(src)),
  });
  await buildVersionDocs(name, latestDir);
}

// Ports the (commented-out) npm publish check: report eligibility, do not publish.
async function reportPublishable(section, name) {
  const moduleDir = join(ROOT, section, name);
  const versions = (await subdirs(moduleDir)).filter(isRealVersion);
  if (!versions.length) return;
  const version = latestOf(versions);
  const dir = join(moduleDir, version);
  if (!(await exists(join(dir, "readme.md")))) return;
  if (!(await exists(join(dir, "package.json")))) return;
  try {
    const pkg = JSON.parse(await readFile(join(dir, "package.json"), "utf8"));
    if (pkg.publish === true && pkg.name === name && pkg.version === version) {
      console.log(
        `🚀 publishable: ${name}@${version} (${section}/${name}/${version})`,
      );
    }
  } catch {
    /* unparseable package.json: not publishable */
  }
}

// Ports build_search_index(): one root index.json, written directly.
async function buildSearchIndex(records) {
  await writeGenerated("index.json", JSON.stringify(records));
}

// Ports the md_to_html/html_to_html tail of build.sh.
async function buildRootPages() {
  const mdToHtml = async (input, output) =>
    writeGenerated(
      output,
      await wrapInTemplate(
        renderMarkdown(await readFile(join(ROOT, input), "utf8")),
      ),
    );
  await mdToHtml("readme.md", "index.html");
  await mdToHtml("demos/index.md", "demos/index.html");
  await mdToHtml("consistency.md", "consistency.html");
  await writeGenerated(
    "search.html",
    await wrapInTemplate(await readFile(join(ROOT, "_search.html"), "utf8")),
  );
}

// ---------- main ----------

for (const section of SECTIONS) {
  if (!(await isDir(join(ROOT, section)))) {
    throw new Error(`missing section directory: ${section}`);
  }
}

// Runs before buildIndices so that buildModule's latest/ directories exist
// by the time buildIndices lists each module's version directories.
const records = [];
for (const section of SECTIONS) {
  for (const name of await subdirs(join(ROOT, section))) {
    records.push(...(await buildModule(section, name)));
    await reportPublishable(section, name);
  }
}

for (const section of SECTIONS) {
  await buildIndices(section, 2);
}
await buildSearchIndex(records);
await buildRootPages();
console.log(`✅ build complete: ${records.length} search records`);
