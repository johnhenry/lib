# Remove all generated files
rm -f demos.html
rm -f index.html
sh script.sh reset_generated_files js
sh script.sh reset_generated_files css
sh script.sh reset_generated_files html
sh script.sh reset_generated_files bash

# Download template from johnhenry.github.io/templates/shell.html
sh script.sh update_template

# Generate Index files
sh script.sh build_indicies js
sh script.sh build_indicies css
sh script.sh build_indicies html
sh script.sh build_indicies bash

# Find lates version and
#   - Generate index.html files from existing
#     _index.html or readme.md files found within projects
#   - Generate test.html files from existing
#     tester.test.mjs files found within projects
#   - Generate index.mjs files from existing
#     index.ts files found within projects
#   - Publish to NPM if appropriate files found within

sh script.sh latest_versions js
sh script.sh latest_versions css
sh script.sh latest_versions html
sh script.sh latest_versions bash

sh script.sh run_create_test js

# Build specific HTML files
sh script.sh inject _index.html templates/shell.html index.html
sh script.sh inject _demos.html templates/shell.html demos.html