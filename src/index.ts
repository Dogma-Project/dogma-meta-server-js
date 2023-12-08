import express from "express";
import apiRouter from "./routers/api";
import { System } from "./core";
import dotenv from "dotenv";
import corsMiddleware from "./middlewares/cors";
import Events from "./controllers/events";

dotenv.config();
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use("/", express.static("public"));

app.use("/api", apiRouter);
app.use("/events", Events);

const port = process.env.HEADLESS_PORT || 4321;

app.listen(port, () => {
  System.logger.info("API", "Starting Headless Meta server on port:", port);
  System.run();
});
