import * as Core from "@dogma-project/core-meta";

import express from "express";
import dotenv from "dotenv";
import path from "node:path";

import apiRouter from "./routers/api";
import { System } from "./core";
import corsMiddleware from "./middlewares/cors";
import Events from "./controllers/events";

dotenv.config();
const app = express();

app.use(corsMiddleware);
app.use(express.json());

//const publicDir = path.resolve(__dirname, "public");
const publicDir = path.join(__dirname, "/public");

console.log(publicDir);

app.use("/api", apiRouter);
app.use("/events", Events);

type ApiOptions = {
  apiport?: number;
  apihost?: string;
  static?: string;
};

const Api = (options: ApiOptions = {}) => {
  const port =
    options.apiport ||
    Number(process.env.VITE_PORT) ||
    Number(process.env.HEADLESS_PORT) ||
    24600;
  const host = options.apihost || process.env.HEADLESS_HOST || "127.0.0.1";

  app.use("/", express.static(options.static || publicDir));

  app.listen(port, host, () => {
    System.logger.info(
      "API",
      `Started Dogma Meta Headless server on [http://${host}:${port}]`
    );
    System.run();
  });
};

export { Core, Api };
