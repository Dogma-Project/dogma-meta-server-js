/* eslint-disable */
const fs = require("node:fs/promises");

console.log("Postinstall copying of interface files.");
const from = "./node_modules/@dogma-project/interface-meta/dist/";
const to = "./public";
fs.cp(from, to, { recursive: true }).then(() => {
  console.log("Interface files successfully copied.");
});
