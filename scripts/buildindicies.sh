# https://stackoverflow.com/a/18897659/1290781
# https://askubuntu.com/questions/266179/how-to-exclude-ignore-hidden-files-and-directories-in-a-wildcard-embedded-find

# template location
TEMPLATE=templates/shell.html
INFILE=_index.html
OUTFILE=index.html
# creation function
create() {
  cat $TEMPLATE | templated_string_p7Rwrz6=$(cat $1) envsubst > $2
}

## Update template
curl https://johnhenry.github.io/template/shell/index.html > $TEMPLATE
function traverse() {
find $1 -type d \( -path ./node_modules -o -path ./vendor -o -path ./html \) -prune -o  -not -path '*/\.*' -print0 | while IFS= read -r -d '' FILE
do
  if [ ! -d "${FILE}" ] ; then
    BASENAME="$(basename ${FILE})";
    if [ $BASENAME = $INFILE ]; then
      # create file
      TARGET="$(dirname "${FILE}")/${OUTFILE}"
      create ${FILE} ${TARGET}
    fi
  fi
done
}
traverse .