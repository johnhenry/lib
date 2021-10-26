# template location
TEMPLATE=templates/shell.html

# creation function
create() {
  cat $TEMPLATE | templated_string_p7Rwrz6=$(cat $1) envsubst > $2
}

## Update template
curl https://johnhenry.github.io/template/shell/index.html > $TEMPLATE

## create indicies
create default.html index.html
create bash/default.html bash/index.html
create demos/default.html demos/index.html
create demos/broadcast-channel/default.html demos/broadcast-channel/index.html
create demos/clock/default.html demos/clock/index.html
create demos/colorwheel/default.html demos/colorwheel/index.html
create demos/liedenticons/default.html demos/liedenticons/index.html
create demos/menu-component/default.html demos/menu-component/index.html
create demos/permutations/default.html demos/permutations/index.html
create demos/tester/default.html demos/tester/index.html