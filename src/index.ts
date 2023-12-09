import express from "express";
import dotenv from "dotenv";

import apiRouter from "./routers/api";
import { System } from "./core";
import corsMiddleware from "./middlewares/cors";
import Events from "./controllers/events";

import * as Core from "@dogma-project/core-meta";

dotenv.config();
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use("/", express.static("public"));

app.use("/api", apiRouter);
app.use("/events", Events);

const port = Number(process.env.HEADLESS_PORT) || 24600;
const host = process.env.HEADLESS_HOST || "127.0.0.1";

app.listen(port, host, () => {
  System.logger.info(
    "API",
    `Started Dogma Meta Headless server on [http://${host}:${port}]`
  );
  System.run();
});

export default Core;
