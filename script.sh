# find . -print0 | while IFS= read -r -d '' file
# https://askubuntu.com/questions/266179/how-to-exclude-ignore-hidden-files-and-directories-in-a-wildcard-embedded-find
TEMPLATE_SRC=https://johnhenry.github.io/template/shell/index.html
TEMPLATE=templates/shell.html
INFILE=_index.html
OUTFILE=index.html

# inject $1 into $2 to create $3
create () {
  cat $2 | templated_string_p7Rwrz6=$(cat $1) envsubst > $3
}

# Update template
# save $1 as $2
update_template () {
  curl $1 > $2
}

# inject $1 into $2 to create $3
inject () {
  cat $2 | templated_string_p7Rwrz6=$(cat $1) envsubst > $3
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
      inject ${FILE} $2 ${TARGET}
    fi
  fi
done
}


# Transform _index.html into index.html
remove_indicies () {
find $1 -type f -name "index.html"  -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ] ; then
    echo ${FILE}
  fi
done
}




run_create_test () {
find $1 -type f -name "*.tester.test.mjs"  -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ]; then
    BASENAME="$(basename ${FILE})";
    DIRNAME="$(dirname ${FILE})";
    echo "<html><head><script type=\"module\" src=\"${BASENAME}\"></script></head><body><h1>Open console for logs.</h1></body></html>" > "${DIRNAME}/test.html"
  fi
done
}

run_tester () {
find $1 -type f -name "*.tester.test.mjs"  -print0 | while IFS= read -r -d '' FILE
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
    echo "<ul>${HTML}</ul>" > "${TOP}/index.html"
  fi
}

# given a list of simversioned directoreies, print the highest
latest_version() {
  TOP=$1
  STR=""
  HTML=""
  for entry in "$TOP"/*
  do
    if [ -d "${entry}" ] ; then
      BASE="$(basename ${entry})"
      STR="${STR}\n${BASE}"
      HTML="${HTML}<li><a href=\"${BASE}\">${BASE}</a></li>"
    fi
  done

# write HTML file

  echo "<ul>${HTML}</ul>" > "${TOP}/index.html"

  VERSION=$(echo $STR | sort -V | tail -1)
  DIR="${TOP}/${VERSION}"
  NAME=$(basename $TOP)
  FULL="${NAME}@${VERSION}"
  echo "The latest version of ${NAME} is ${VERSION} (${DIR})"

# test for documentation
  if [ -f "${DIR}/_index.html" ]; then
    echo "✅ _index.html found!"
    echo "🏭 Building index.html from _index.html"
    cat "${DIR}/_index.md" > "${DIR}/index.html"
    echo "🏭 index.html built from HTML"
  elif [ -f "${DIR}/readme.md" ]; then
    echo "🏭 Building index.html from readme.md"
    pandoc -f markdown "${DIR}/readme.md" > "${DIR}/index.html"
    echo "🏭 index.html built from Markdown"
  fi

# test for typescript conmilation
  if [ -f "${DIR}/index.ts" ]; then
    echo "✅ index.ts found!"
    echo "🏭 Building ${DIR}/index.mjs from index.ts"
#    tsc --outDir "${DIR}" "${DIR}/index.ts"
#    echo "🏭 index.html built from Markdown"
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

DIR="${2:-.}"
DEPTH="${3:-2}"

case "$1" in
  "update_template") update_template $TEMPLATE_SRC $TEMPLATE
  ;;
  "build_html") build_html $DIR $TEMPLATE
  ;;
  "build_indicies") build_indicies $DIR $DEPTH
  ;;
  "latest_versions") latest_versions $DIR
  ;;
  "run_tester") run_tester $DIR
  ;;
  "run_create_test") run_create_test $DIR
  ;;
  "remove_indicies") remove_indicies $DIR
  ;;
esac
