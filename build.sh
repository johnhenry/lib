# Remove all generated files
rm -f demos.html
rm -f index.html
rm -f test.html
rm -f index.json

# Generate Index files
sh script.sh build_indicies js
sh script.sh build_indicies css
sh script.sh build_indicies html
sh script.sh build_indicies bash

# Find lates version and
#   - Generate index.html files from existing
#     _index.html or readme.md files found within projects (working)
#   - Generate test.html files from existing
#     tester.test.mjs files found within projects (working)
#   - Generate index.mjs files from existing
#     index.ts files found within projects (WIP)
#   - Publish to NPM/Deno.land if appropriate files found within (WIP)

sh script.sh latest_versions js
sh script.sh latest_versions css
sh script.sh latest_versions html
sh script.sh latest_versions bash

# Build search index HTML files

sh script.sh build_search_index .

# Build specific HTML files

sh script.sh md_to_html readme.md index.html
sh script.sh md_to_html demos.md demos.html
sh script.sh html_to_html _search.html search.html