import { spawn } from "node:child_process";
// main.js
const spawnAsync = function (file) {
  const child = spawn("node", [file]);
  let data = "";
  for await (const chunk of child.stdout) {
    console.log("stdout chunk: " + chunk);
    yield data += chunk;
  }
  let error = "";
  for await (const chunk of child.stderr) {
    console.error("stderr chunk: " + chunk);
    error += chunk;
  }
  const exitCode = await new Promise((resolve, reject) => {
    child.on("close", resolve);
  });

  if (exitCode) {
    throw new Error(`subprocess error exit ${exitCode}, ${error}`);
  }
  return data;
};

export default spawnAsync;
