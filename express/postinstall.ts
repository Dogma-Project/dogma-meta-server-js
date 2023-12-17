import fs from "node:fs";
import path from "node:path";

fs.cpSync(
  path.resolve("node_modules/@dogma-project/interface-meta/dist"),
  path.resolve("dist/public"),
  { recursive: true }
);
