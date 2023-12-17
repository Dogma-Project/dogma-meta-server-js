/* eslint-disable no-undef */
const fs = require("node:fs");
const path = require("node:path");

fs.cpSync(
  path.resolve("node_modules/@dogma-project/interface-meta/dist"),
  path.resolve("dist/public"),
  { recursive: true }
);
