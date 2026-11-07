// Minimal semver comparison shared by build.mjs and scripts/release-module.mjs.
// Not a full semver parser (no pre-release/build-metadata handling) -- this
// repo's version directories are plain dotted-number strings.

// Replaces `sort -V`: numeric fields compared as numbers, anything
// non-numeric compared lexically as a tiebreaker.
export const compareVersions = (a, b) => {
  const as = a.split(".");
  const bs = b.split(".");
  const length = Math.max(as.length, bs.length);
  for (let i = 0; i < length; i++) {
    const an = Number(as[i] ?? 0);
    const bn = Number(bs[i] ?? 0);
    if (Number.isNaN(an) || Number.isNaN(bn)) {
      const cmp = (as[i] ?? "").localeCompare(bs[i] ?? "");
      if (cmp) return cmp;
    } else if (an !== bn) {
      return an - bn;
    }
  }
  return 0;
};

export const latestOf = (versions) => [...versions].sort(compareVersions).at(-1);

// "latest" is a generated alias directory (see build.mjs's buildLatestAlias),
// not a real version -- every caller that lists a module's version
// directories must exclude it before comparing/sorting.
export const isRealVersion = (dirName) => dirName !== "latest";
