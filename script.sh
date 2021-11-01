# find . -print0 | while IFS= read -r -d '' file
# https://askubuntu.com/questions/266179/how-to-exclude-ignore-hidden-files-and-directories-in-a-wildcard-embedded-find
TEMPLATE_SRC=https://johnhenry.github.io/template/shell/index.html
TEMPLATE=templates/shell.html
INFILE=_index.html
OUTFILE=index.html
HTML_PREAMBLE="<!DOCTYPE html>\n"

# Update template
# save $1 as $2
update_template () {
  curl $1 > $2
}

# inject $1 into $2 to create $3
# TODO put in /basj
inject () {
  cat $2 | templated_string_p7Rwrz6=$(cat $1) envsubst > $3
}

#https://stackoverflow.com/questions/40993488/convert-markdown-links-to-html-with-pandoc
md_to_html() {
  echo "${HTML_PREAMBLE}" $(cat $TEMPLATE | templated_string_p7Rwrz6=$(cat $1) envsubst | pandoc -f markdown -t html5 ) > $2
  # echo "${HTML_PREAMBLE}" $(cat $TEMPLATE | templated_string_p7Rwrz6=$(cat $1) envsubst | pandoc -f markdown -t html5 --lua-filter=links-to-html.lua ) > $2
}

html_to_html() {
  echo "${HTML_PREAMBLE}" $(cat $TEMPLATE | templated_string_p7Rwrz6=$(cat $1) envsubst ) > $2
  # pandoc -f markdown -t html5 $1 > $2
}

# Transform _index.html into index.html
build_html () {
find $1 -type d \( -path ./node_modules -o -path ./vendor \) -prune -o  -not -path '*/\.*' -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ] ; then
    BASENAME="$(basename ${FILE})";
    if [ $BASENAME = $INFILE ]; then
      # create file
      TARGET="$(dirname "${FILE}")/${OUTFILE}"
      cp $FILE $TARGET
    fi
  fi
done
}

# Transform _index.html into index.html
reset_generated_files () {
find $1 -type f -name "index.html"  -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ] ; then
    rm ${FILE}
  fi
done
find $1 -type f -name "test.html"  -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ] ; then
    rm ${FILE}
  fi
done
find $1 -type f -name "index.json"  -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ] ; then
    rm ${FILE}
  fi
done
}

run_tester () {
find $1 -type f -name "tester.test.mjs"  -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ]; then
    deno run $FILE
  fi
done
}

build_indicies() {
  local TOP=$1
  local DEPTH=$2
  local STR=""
  if [ $DEPTH -gt 0 ]; then
    local HTML=""
    for entry in "$TOP"/*
    do
      if [ -d "${entry}" ]; then
        local BASE="$(basename ${entry})"
        STR="${STR}\n${BASE}"
        HTML="${HTML}<li><a href=\"${BASE}\">${BASE}</a></li>"
        build_indicies $entry $((DEPTH-1))
      fi
    done
    VERSION=$(echo $STR | sort -V | tail -1)
    (echo "$VERSION" | grep -Eq  "(.*)@(\d+\.\d+\.\d+)$") &&\
    HTML="<li><a href=\"${VERSION}\">(latest)</a></li>${HTML}"
    #write HTML file
    HTML="<ul>${HTML}</ul>"
    echo "${HTML_PREAMBLE}" $(cat $TEMPLATE | templated_string_p7Rwrz6=${HTML} envsubst ) > "${TOP}/index.html"
  fi
}

# given a list of simversioned directoreies, print the highes

latest_version() {
  TOP=$1
  rm -rf "${TOP}/latest"
  STR=""
  for entry in "$TOP"/*
  do
    if [ -d "${entry}" ] ; then
      BASE="$(basename ${entry})"
      STR="${STR}\n${BASE}"
    fi
  done
# write HTML file

  VERSION=$(echo $STR | sort -V | tail -1)
  DIR="${TOP}/${VERSION}"
  NAME=$(basename $TOP)
  FULL="${NAME}@${VERSION}"
  echo "The latest version of ${NAME} is ${VERSION} (${DIR})"
  echo "Copying latest versoion of ${NAME}} (${VERSION}) to /latest "

# test for documentation
  if [ -f "${DIR}/${INFILE}" ]; then
    echo "✅ ${INFILE} found!"
    echo "🏭 Building ${OUTFILE} from ${INFILE}"
    html_to_html "${DIR}/${INFILE}" "${DIR}/${OUTFILE}"
    echo "🏭 ${OUTFILE} built from HTML"
  elif [ -f "${DIR}/readme.md" ]; then
    echo "🏭 Building ${OUTFILE} from readme.md"
    md_to_html "${DIR}/readme.md" "${DIR}/${OUTFILE}"
    echo "🏭 ${OUTFILE} built from Markdown"
  fi


# test for test compilation
  if [ -f "${DIR}/tester.test.mjs" ]; then
    echo "✅ tester.test.mjs found!"
    echo "🏭 Creating test.html using tester.test.mjs"
    echo "<html><head><script type=\"module\" src=\"./tester.test.mjs\"></script></head><body><h1>Test for ${NAME}</h1><h2>Open console for logs.</h2></body></html>" > "${DIR}/test.html"
    echo "🏭 tests.html built importing from Javascript"
  fi

# test for typescript copilation
  if [ -f "${DIR}/index.ts" ]; then
    echo "✅ index.ts found!"
    echo "🏭 Building ${DIR}/index.mjs from index.ts"
#    deno bundle "${DIR}/index.ts" "${DIR}/index.mjs"
#    echo "🏭 index.mjs built from Typescript"
  fi

  if [ -f "${DIR}/index.html" ]; then
    echo "✅ index.html found!"
    echo "🏭 Adding ${DIR}/index.json from index."
    echo "{}" > "${DIR}/index.json";
    CONTENT=$(jq ".title = \"${NAME}\"" "${DIR}/index.json")
    echo "${CONTENT}" > "${DIR}/index.json"
    CONTENT=$(jq ".url = \"${DIR}\"" "${DIR}/index.json")
    echo "${CONTENT}" > "${DIR}/index.json"
    CONTENT=$(cat ${DIR}/index.html)
    # HTML=$(echo "${HTML}" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g; s/'"'"'/\&#39;/g' | tr '\n' ' ')
    CONTENT=$(echo "${CONTENT}" | sed 's/<[^>]*>/\n/g' | tr '\n' ' ')
    CONTENT=$(jq ".content = \"${CONTENT}\"" "${DIR}/index.json" )
    echo "${CONTENT}" > "${DIR}/index.json"
  fi

# test for publication
  if [ -f "${DIR}/readme.md" ]; then
      echo "❓ readme found... maybe we can publish? (1 of 5)"
    if [ -f "${DIR}/package.json" ]; then
      echo "❓ package found (2 of 5)"
      PUBLISH=$(cat "${DIR}/package.json" | jq -r '.publish')
      if [ "$PUBLISH" == true ]; then
        echo "❓ package.publsh=true (3 of 5)"
        P_NAME=$(cat "${DIR}/package.json" | jq -r '.name')
        if [ "$P_NAME" == "$NAME" ]; then
          echo "❓ package.name is \"${NAME}\" (4 of 5)"
          P_VERSION=$(cat "${DIR}/package.json" | jq -r '.version')
          if [ "$P_VERSION" == "$VERSION" ]; then
            echo "❓ package.version is "${VERSION}" (5 of 5)"
            echo "✅ we can publish ${FULL}!"
            echo "🚀 Publishing ${FULL}"
            # npm publish "${DIR}"
            # echo "🚀 ${FULL} published!"
          fi
        fi
      fi
    fi
  fi
}


latest_versions() {
  echo $1
  for entry in "$1"/*
  do
    if [ -d "${entry}" ] ; then
      echo "---"
      latest_version "${entry}"
    fi
  done
}



build_search_index (){
  TEXT=$(jq -s . $(find $1/* -type f -name "index.json"  -print))
  rm $(find $1/* -type f -name "index.json"  -print)
  echo $TEXT > index.json
}


DIR="${2:-.}"
DEPTH="${3:-2}"

case "$1" in
  "update_template") update_template $TEMPLATE_SRC $TEMPLATE
  ;;
  "build_indicies") build_indicies $DIR $DEPTH
  ;;
  "latest_versions") latest_versions $DIR
  ;;
  "run_tester") run_tester $DIR
  ;;
  "reset_generated_files") reset_generated_files $DIR
  ;;
  "inject") inject $2 $3 $4
  ;;
  "md_to_html") md_to_html $2 $3
  ;;
  "build_search_index") build_search_index $2
  ;;
esac
