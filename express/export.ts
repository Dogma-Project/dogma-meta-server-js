import path from "node:path";
import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { C_Defaults } from "@dogma-project/constants-meta";
import ConnectionController from "./controllers/connection";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io-client";
// import corsMiddleware from "./middlewares/cors";
// import { CLIENT_STATUSES } from "./constants";

dotenv.config();

// app.use(corsMiddleware);
// app.use(express.json());

const InterfaceHost = () => {
  const app = express();
  const publicDir = path.join(__dirname, "/public");
  app.use("/", express.static(publicDir));
  const host = process.env.SERVER_HOST || "127.0.0.1";
  const port = Number(process.env.SERVER_PORT) || C_Defaults.prodManagerPort;
  const server = http.createServer(app);
  const io = new Server(server, {
    path: "/io",
    cors: {
      origin: "*",
    },
  });
  io.on("connection", ConnectionController);
  server.listen(port, host, () => {
    console.info(
      "API",
      `Serving Dogma Meta interface on [http://${host}:${port}]`
    );
  });
};

export default InterfaceHost;
