sh script.sh update_template

sh script.sh remove_indicies js
sh script.sh remove_indicies css
sh script.sh remove_indicies html
sh script.sh remove_indicies bash

sh script.sh inject _index.html templates/shell.html index.html
sh script.sh inject _demos.html templates/shell.html demos.html

sh script.sh build_html js
sh script.sh build_html css
sh script.sh build_html html
sh script.sh build_html bash

sh script.sh build_indicies js
sh script.sh build_indicies css
sh script.sh build_indicies html
sh script.sh build_indicies bash

sh script.sh latest_versions js
sh script.sh latest_versions css
sh script.sh latest_versions html
sh script.sh latest_versions bash

sh script.sh run_create_test js