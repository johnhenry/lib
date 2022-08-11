var spawn = require("child_process").spawn;

var p = spawn("node", ["-i"]);

p.stdout.on("data", function (data) {
  console.log(data.toString());
});

p.stdin.write("1 + 0\n");
